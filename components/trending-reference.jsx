import React, { useState, useRef, useCallback } from 'react';
import { FlatList, StyleSheet, View, ImageBackground, Image, TouchableOpacity } from 'react-native';

import { themeColors } from '../tailwind.config'
import { icons } from '../constants'

const TrendingItem = ({ activeItem, item }) => {
  const isActive = activeItem === item.$id;

  return (
    <TouchableOpacity style={[styles.videoContainer, isActive && styles.activeVideoContainer]}>
      <ImageBackground
        source={{ uri: item.thumbnail }}
        resizeMode="cover"
        style={[styles.imageBackground, isActive && styles.activeImageBackground]}
      >
        <Image
          source={icons.play}
          style={styles.playIcon}
          resizeMode='contain'
        />
      </ImageBackground>
    </TouchableOpacity>
  );
};

const Trending = ({ posts }) => {
  const [activeItem, setActiveItem] = useState(posts[0].$id);

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
  },
  activeImageBackground: {
    width: 187, // Increase size for active item
    height: 258.5, // Increase size for active item
  },
  playIcon: {
    width: 40,
    height: 40,
    position: 'absolute',
  },
});

/*
import { StyleSheet, Text, Image, FlatList, TouchableOpacity } from 'react-native'
import { useCallback, useRef, useState } from 'react'
import * as Animatable from 'react-native-animatable'
import { View as AnimView } from 'react-native-animatable'

import { themeColors } from '../tailwind.config'
import { ImageBackground } from 'react-native-web'
import { icons } from '../constants'

const zoomIn = {
  0 : {
    scale: 0.8,
  },
  1: {
    scale: 1,
  },
}

const zoomOut = {
  0 : {
    scale: 1,
  },
  1: {
    scale: 0.8,
  },
}

const TrendingItem = ({ activeItem, item }) => {
  const [play, setPlay] = useState(false)
  const isActive = (activeItem === item.$id)

  return (
    <AnimView
      className={"mr-5"}
      animation={activeItem ? zoomIn : zoomOut}
      duration={500}
    >
      {play ? (
        <Text style={{color: themeColors.white}}>Playing...</Text>
      ) : (
        <TouchableOpacity className={"relative justify-center items-center"} activeOpacity={0.7} onPress={() => setPlay(true)} style={styles.videoContainer}>
          <ImageBackground 
            source={{uri: item.thumbnail}} 
            className={"w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40"}
            resizeMode="cover"
            style={[styles.ImageBackground,  styles.activeImageBackground]}
          />
          <Image
            source={icons.play}
            className={"w-12 h-12 absolute"}
            resizeMode='contain'
            style={{width: 40, height: 40, position: 'absolute'}}
          />
        </TouchableOpacity>
      )
      }

    </AnimView>
  )
}

const Trending = ({ posts }) => {
  const [activeItem, setActiveItem] = useState(posts[0])

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].key);
      console.log("Current active item:", activeItem.title)
    }
  }).current;


  return (
    <FlatList 
        data={posts}
        ketExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <TrendingItem activeItem={activeItem} item={item} />
        )}
        horizontal
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={{itemVisiblePercentThreshold: 70}}
        contentOffset={{x:170}}
    />
  )
}

export default Trending

const styles = StyleSheet.create({
  videoContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ImageBackground: {
    width: 170,
    height: 235,
    borderRadius: 35,
    marginVertical: 16.75,
    overflow: 'hidden',
    shadowColor: themeColors.black[100],
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 10,
    transition: {width: {duration: 0.3}, height: {duration: 0.3}},
  },
  activeImageBackground: {
    borderWidth: 2,
    borderColor: 'red',
    width: 187, // Increase size for active item
    height: 258.5, // Increase size for active item
  },
})
*/