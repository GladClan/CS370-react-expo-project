import { StyleSheet, Text, FlatList, Image, Alert } from 'react-native'
import { useEffect, useState }from 'react'
import { RefreshControl, SafeAreaView, View } from 'react-native-web'

import { themeColors } from '../../tailwind.config'
import { images } from '../../constants'
import SearchInput from '../../components/serachInput'
import Trending from '../../components/Trending'
import EmptyState from '../../components/EmptyState'
import { getAllPosts } from '../../lib/appwrite'
import useAppwrite from '../../lib/useAppwrite'
import VideoCard from '../../components/VideoCard'

const Home = () => {
  const { data: posts, refetch } = useAppwrite(getAllPosts);

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
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
          <View className={"my-6 px-4 space-y-6"} style={styles.listHeader}>
            <View className={"justify-between items-start flex-row mb-6"} style={styles.listHeaderText}>
              <View style={{flexDirection: 'column'}}>
                <Text className={"font-pmedium text-sm text-gray-100"} style={styles.welcomeText}>
                  Welcome back
                </Text>
                <Text className={"text-2xl font-psemibold text-white"} style={styles.welcomeName}>
                  {"you cutie"}
                </Text>
              </View>

              <View className={"mt-1.5"}>
                <Image 
                  source={images.logoSmall}
                  className={"w-9 h-10"}
                  style={styles.logoSmall}
                  resizeMode="contain"
                />
              </View>
            </View>

            <SearchInput
              placeholder={"Search for a video topic"}
            />

            <View className={"w-full flex-1 pt-5 pb-8"} style={styles.videoContainer}>
              <Text className={"text-gray-100 text-lg font-pregular mb-3"} style={styles.videoHeaderText}>
                Latest Videos
              </Text>

              <Trending posts={[{id:1}, {id:2}, {id:3}]}/>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title={"No videos found"}
            subtitle={"Be the first one to create a video"}
          />
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      />
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColors.primary,
    justifyContent: 'center',
    height: '100%',
  },
  textItems: {
    color: themeColors.white,
    fontSize: 24,
    lineHeight: 30,
  },
  listHeader: {
    marginVertical: 20,
    paddingHorizontal: 13,
  },
  listHeaderText: {
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexDirection: 'row',
    marginBottom: 20,
  },
  welcomeText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    lineHeight: 16,
    color: themeColors.gray[100],
  },
  welcomeName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    lineHeight: 26,
    color: themeColors.white,
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
  }
})