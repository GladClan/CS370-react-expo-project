import { StyleSheet, Text, View } from 'react-native'
import { FlatList, Image } from 'react-native-web';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { themeColors } from '../../tailwind.config';
import useAppwrite from '../../lib/useAppwrite';
import { searchPosts } from '../../lib/appwrite';
import VideoCard from '../../components/VideoCard';
import SearchInput from '../../components/SearchInput';
import EmptyState from '../../components/EmptyState';
import { useEffect } from 'react';

const Search = () => {
  const { query: searchQuery } = useLocalSearchParams();
  const { data: posts, refetch } = useAppwrite(() => {searchPosts(searchQuery)});

  useEffect(() => {
    console.log("refetching...")
    refetch();
  }, [searchQuery]);
  
  return (<SafeAreaView className={"bg-primary h-full"} style={styles.container}>
    <FlatList
      data={posts}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
          <VideoCard video={item}/>
      )}
      ListHeaderComponent={() => (
        <View className={"my-6 px-4"} style={styles.listHeader}>
          <View style={{flexDirection: 'column'}}>
            <Text className={"font-pmedium text-sm text-gray-100"} style={styles.welcomeText}>
              Search results for
            </Text>
            <Text className={"text-2xl font-psemibold text-white"} style={styles.welcomeName}>
              "{searchQuery}"
            </Text>
          </View>

          <View className={"mt-6 mb-8"} style={{marginTop: 20, marginBottom: 26}}>
            <SearchInput
              initialQuery={searchQuery}
              placeholder={"Search for a video topic"}
            />
          </View>
        </View>
      )}
      ListEmptyComponent={() => (
        <EmptyState
          title={"No videos found"}
          subtitle={"Your search did ont return any videos. Try another search term, like 'cats' or 'football'."}
        />
      )}
    />
  </SafeAreaView>
  )
}

export default Search

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