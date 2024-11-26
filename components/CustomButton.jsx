import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import React from 'react'
import { themeColors } from '../tailwind.config.js'

const CustomButton = ({ title, handlePress, containerStyles, textStyles, isLoading, CSSContainerStyles }) => {
  return (
    <TouchableOpacity
        onPress={handlePress}
        className={`bg-secondary rounded-xl min-h-[62px] justify-center items-center, ${containerStyles} isLoading ? 'opacity-50' : ''`}
        activeOpacity={0.7}
        disabled={isLoading}
        style={[
            CSSContainerStyles,
            styles.button,
            isLoading ? styles.buttonLoading : styles.button
        ]}
        >
    <Text
        className={`text-primary font-psemibold text-lg ${textStyles}`}
        style={styles.buttonText}
        >
            {title}
    </Text>
    </TouchableOpacity>
  )
}

export default CustomButton

const styles = StyleSheet.create({
    button: {
      backgroundColor: themeColors.secondary.DEFAULT,
      borderRadius: 12,
      minHeight: 62,
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonLoading: {
      opacity: 0.5,
    },
    buttonText: {
      color: themeColors.primary,
      fontWeight: '600',
      fontSize: 18,
    },
  });