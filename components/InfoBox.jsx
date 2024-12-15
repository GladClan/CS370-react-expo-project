import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import { themeColors } from '../tailwind.config'

const InfoBox = ({ title, subtitle, containerStyles, CSScontainerStyles, titleStyles, CSStitleStyles}) => {
  return (
    <View className={containerStyles} style={CSScontainerStyles}>
        <Text
            className={`text-white text-center font-psemibold ${titleStyles}`}
            style={[{color: themeColors.white, textAlign: 'center', fontFamily: 'Poppins-Semibold, sans-serif'}, CSStitleStyles]}
        >
            {title}
        </Text>
        <Text
            className={`text-sm text-gray-100 text-center font-pregular`}
            style={{fontSize: 12, fontSpacing: 16, color: themeColors.gray[100], textAlign: 'center', fontFamily: 'Poppins-Regular, sans-serif'}}
        >
            {subtitle}
        </Text>
    </View>
  )
}

export default InfoBox

const styles = StyleSheet.create({})