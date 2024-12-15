import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { FlatList, Image } from 'react-native-web';
// import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import { themeColors } from '../../tailwind.config';
import useAppwrite from '../../lib/useAppwrite';
import { getUserPosts, signOut } from '../../lib/appwrite';
import VideoCard from '../../components/VideoCard';
import EmptyState from '../../components/EmptyState';
import { icons } from '../../constants';

import { useGlobalContext } from '../../context/GlobalProvider';
import InfoBox from '../../components/InfoBox';

// import { Client, Databases, Query } from 'react-native-appwrite';
// import { appwriteConfig } from '../../lib/appwrite';

const profile = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();
  const { data: posts } = useAppwrite(() => {getUserPosts(user.$id)});
  /*
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, [])

  useEffect(() => {
    if (isMounted && !user) {
      router.replace('sign-in');
    }
  }, [user, isMounted]);
  */
  /*
  useEffect(() => {
    const client = new Client();
    client.setEndpoint(appwriteConfig.endpoint).setProject(appwriteConfig.projectId).setPlatform(appwriteConfig.platform);
    const databases = new Databases(client);
    if (!user) {
      setUser(databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        [Query.equal('accountId', '67523db4001b71747693')]
    )[0])
    }
  })
  */

  const logout = async () => {
    console.log('logging you out...');
    await signOut();
    setUser(null);
    setIsLoggedIn(false);

    router.replace('sign-in');
  }

  return (
  <SafeAreaView className={"bg-primary h-full"} style={styles.container}>
    <FlatList
      data={posts}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
          <VideoCard video={item}/>
      )}
      ListHeaderComponent={() => (
        <View className={"w-full justify-center items-center mt-6 mb-12 px-4"} style={styles.headerContainer}>
          <TouchableOpacity className={"w-full items-end mb-10"} onPress={logout} style={{width: '100%', alignItems: 'flex-end', marginBottom: 32.5}}>
            <Image
              source={icons.logout}
              resizeMode={"contain"}
              className={"w-6 h-6"}
              style={{width: 20, height: 20}}
            />
          </TouchableOpacity>
          <View className={"w-16 h-16 border border-secondary rounded-lg justify-center items-center"} style={styles.avatarContainer} >
            <Image
              source={{ uri:user?.avatar }}
              className={"w-[90%] h-[90%] rounded-lg"}
              resizeMode={"cover"}
              style={styles.avatar}
            />
          </View>
          <InfoBox
            title={user?.username}
            containerStyles={"mt-5"}
            CSScontainerStyles={{marginTop: 16}}
            titleStyles={"text-lg"}
            CSStitleStyles={{fontSize: 14, lineHeight: 23}}
          />
          <View className={"mt-5 flex-row"} style={{marginTop: 16, flexDirection: 'row'}}>
            <InfoBox
            title={posts.length || 0}
            subtitle={"Posts"}
            containerStyles={"mr-10"}
            CSScontainerStyles={{marginRight: 32}}
            titleStyles={"text-xl"}
            CSStitleStyles={{fontSize: 16, lineHeight: 23}}
            />
            <InfoBox
              title={"1.2k"}
              subtitle={"Followers"}
              titleStyles={"text-xl"}
              CSStitleStyles={{fontSize: 16, lineHeight: 23}}
            />
          </View>
        </View>
      )}
      ListEmptyComponent={() => (
        <EmptyState
          title={"No videos found"}
          subtitle={"You haven't uploaded any videos yet, how come??"}
        />
      )}
    />
  </SafeAreaView>
  )
}

export default profile


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColors.primary,
    justifyContent: 'center',
    height: '100%',
  },
  headerContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 39,
    paddingHorizontal: 13,
  },
  textItems: {
    color: themeColors.white,
    fontSize: 24,
    lineHeight: 30,
  },
  logoSmall: {
    width: 30,
    height: 32,
  },
  videoContainer: {
    width: '100%',
    flex: 1,
    paddingTop: 16,
    paddingBottom: 26,
  },
  videoHeaderText: {
    color: themeColors.gray[100],
    fontSize: 15,
    lineHeight: 22,
    fontFamily: 'Poppins-Regular',
    marginBottom: 10,
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderColor: themeColors.secondary,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: '90%',
    height: '90%',
    borderRadius: 7,
  }
})