import { Account, Query, Avatars, Client, Databases, Storage, ID } from 'react-native-appwrite';

export const appwriteConfig = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.jsm.tutorial-application',
    projectId: '6750bc430012b6ceba68',
    databaseId: '6750c308000aacbfe14e',
    userCollectionId: '6750c32f002431b5830a',
    videosCollectionId: '6750c70a002e51fe0d9f',
    storageId: '6750c8d80008acaee2d7',
}

// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)
    .setPlatform(appwriteConfig.platform)
;

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);

export async function createUser(email, password, username) {
    try {
        const newAccount = await account.create(ID.unique(), email, password, username);
        if (!newAccount) {
            throw new Error('Failed to create new account');
        }
        const avatarURL = avatars.getInitials(username);
        await signIn(email, password);
        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email,
                username,
                avatar: avatarURL,
            }
        );
        if (!newUser) {
            throw new Error('Failed to create new user');
        }
        return newUser;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

export async function signIn(email, password) {
    try {
        const sessions = await account.listSessions();
        if (sessions.total > 0) {
            for (const session of sessions.sessions)
                await account.deleteSession(session.$id);
        }

        const session = await account.createEmailPasswordSession(email, password);
        if (!session) {
            throw new Error('Failed to create new session');
        }
        return session;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

export async function getCurrentUser() {
    try {
        const currentAccount = await account.get();
        if (!currentAccount) {
            throw new Error('Failed to get current account');
        }
        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        )
        if (!currentUser) {
            throw new Error('Failed to get current user');
        }
        return currentUser.documents[0];

    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

export async function getAllPosts() {
    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.videosCollectionId
            [Query.orderDesc('$createdAt')]
        );
        return posts.documents;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

export async function getLatestPosts() {
    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.videosCollectionId,
            [Query.orderDesc('$createdAt'), Query.limit(7)]
        );
        return posts.documents;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

export async function searchPosts( query ) {
    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.videosCollectionId,
            [Query.search('title', query)]
        );
        return posts.documents;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

export async function getUsePosts( userId ) {
    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.videosCollectionId,
            [Query.search('creator', userId), Query.orderDesc('$createdAt')]
        );
        return posts.documents;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

export async function signOut() {
    try {
        const session = await account.deleteSession('current');
        return session;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

export async function getFilePreview(fileId, type) {
    let fileURL;

    try {
        if (type === 'video') {
            fileURL = storage.getFileView(appwriteConfig.storageId, fileId);
        } else if (type === 'image') {
            fileURL = storage.getFilePreview(appwriteConfig.storageId, fileId, 2000, 2000, 'top', 100);
        } else {
            throw new Error('Invalid file type');
        }
        if (!fileURL) {
            throw new Error('Failed to get file preview');
        }
        return fileURL;
    } catch (error) {
        throw new Error(error);
    }
}

export async function uploadFile(file, type) {
    if (!file || !type) return;
    const {mimeType, ...rest} = file;
    const asset = {
        name: file.fileName,
        type: file.mimeType,
        size: file.fileSize,
        uri: file.uri,
    };

    try {
        const uploadedFile = await storage.createFile(appwriteConfig.storageId, ID.unique(), asset);
        const fileURL = await getFilePreview(uploadedFile.$id, type);
        return fileURL;
    } catch (error) {
        throw new Error(error);
    }
}

export async function createVideo(form, userId) {
    try {
        const [thumbnailURL, videoURL] = await Promise.all([
            uploadFile(form.thumbnail, 'image'),
            uploadFile(form.video, 'video')
        ]);
        const newPost = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.videosCollectionId,
            ID.unique(),
            {
                title: form.title,
                thumbnail: thumbnailURL,
                video: videoURL,
                prompt: form.prompt,
                creator: userId,
            }
        );
        if (!newPost) {
            throw new Error('Failed to create new video');
        }
        return newPost;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}