import { Account, Client, ID } from 'react-native-appwrite';

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

export const createUser = () => {
account.create(ID.unique(), 'me@example.com', 'password', 'Jane Doe')
    .then(function (response) {
        console.log(response);
    }, function (error) {
        console.log(error);
    });
}