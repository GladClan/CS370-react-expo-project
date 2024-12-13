import React, { useState, useRef, useCallback } from 'react';
import { FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { View as AnimView } from 'react-native-animatable';

import { Video, ResizeMode } from 'expo-av';

import { themeColors } from '../tailwind.config'
import { ImageBackground } from 'react-native-web';
import { icons } from '../constants'

const TrendingItem = ({ activeItem, item }) => {
  const [play, setPlay] = useState(false);
  const isActive = activeItem === item.$id;

  return (
    <AnimView
      className={"mr-5"}
      style={{marginRight: 16}}
    >
      {play ? (
        <Video 
          source={{ uri: item.video}}
          className={"w-52 h-72 rounded-[35px] mt-3 bg-white/10"}
          style={{width: 170, height: 235, borderRadius: 35, marginTop: 10, backgroundColor: themeColors.white}}
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls={true}
          shouldPlay={true}
          onPlaybackStatusUpdate={(status) => {
            if (status.didJustFinish) setPlay(false)}
          }
        />
      ) : (
      <TouchableOpacity style={[styles.videoContainer, isActive && styles.activeVideoContainer]}>
        <ImageBackground
          source={{ uri: item.thumbnail }}
          resizeMode="cover"
          style={[styles.imageBackground, isActive && styles.activeImageBackground]}
        />
        <Image
          source={icons.play}
          style={{width: 40, height: 40, position: 'absolute'}}
          resizeMode='contain'
        />
      </TouchableOpacity>
      )}
    </AnimView>
  );
};

const Trending = ({ posts }) => {
  const [activeItem, setActiveItem] = useState(posts.length > 0 ? posts[0].$id : null);

  const viewableItemsChanged = useCallback(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
    }
  }, []);

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item} />
      )}
      horizontal
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{ itemVisiblePercentThreshold: 70 }}
      contentOffset={{ x: 170 }}
    />
  );
};

export default Trending;

const styles = StyleSheet.create({
  videoContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  activeVideoContainer: {
    transform: [{ scale: 1.1 }],
  },
  imageBackground: {
    width: 170,
    height: 235,
    borderRadius: 35,
    marginVertical: 16.75,
    overflow: 'hidden',
    shadowColor: themeColors.black['DEFAULT'],
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 10, // For Android shadow
    transition: {width: {duration: 0.3}, height: {duration: 0.3}},
  },
  activeImageBackground: {
    width: 187, // Increase size for active item
    height: 258.5, // Increase size for active item
  },
});