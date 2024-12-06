import { StyleSheet, Text, FlatList } from 'react-native'
import React from 'react'

import { themeColors } from '../tailwind.config'

const Trending = ({ posts }) => {
  return (
    <FlatList 
        data={posts}
        ketExtractor={(item) => item.$id}
        renderItem={({ item }) => (
            <Text key={item.id} className={"text-3xl text-white"} style={styles.textItems}>{item.id}</Text>
        )}
        horizontal
    />
  )
}

export default Trending

const styles = StyleSheet.create({
  textItems: {
    color: themeColors.white,
    fontSize: 24,
    lineHeight: 30,
  },
})