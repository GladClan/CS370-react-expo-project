import { StyleSheet, Text, TextInput, View, Image, TouchableOpacity } from 'react-native'
import { useState } from 'react'
import { icons } from '../constants'
import { themeColors } from '../tailwind.config'

const FormField = ({ title, value, placeholder, handleChangeText, otherStyles, CSSStyles }) => {
    const [isFocused, setIsFocused] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
  return (
    <View className={`space-y-2 ${otherStyles}`} style={[styles.container, CSSStyles]}>
      <Text className="text-base text-gray-100 font-pmedium" style={styles.title}>
        {title}
      </Text>
      <View className="flex-row border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl items-center focus:border-secondary" style={[styles.inputContainer, isFocused && styles.inputContainerFocused]}>
        <TextInput
            className="flex-1 text-white text-base font-psemibold"
            value={value}
            placeholder={placeholder}
            onChangeText={handleChangeText}
            placeholderTextColor={'#7b7b8b'}
            secureTextEntry={title === 'Password' && !showPassword}
            style={styles.input}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
        />

        {title === 'Password' && (
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Image source={showPassword ? icons.eye : icons.eyeHide} className="w-6 h-6" resizeMode='contain' style={styles.eyeIcon} />
            </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default FormField

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
    },
    title: {
        fontSize: 13,
        lineHeight: 20,
        color: themeColors.gray[100],
        fontFamily: 'Poppins-Medium, sans-serif',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 50,
        paddingHorizontal: 20,
        backgroundColor: themeColors.black[100],
        borderWidth: 2,
        borderColor: themeColors.black[200],
        borderRadius: 13,
    },
    inputContainerFocused:{
        borderColor: themeColors.secondary,
    },
    input: {
        flex: 1,
        color: themeColors.white,
        fontSize: 13,
        lineHeight: 20,
        fontFamily: 'Poppins-SemiBold, sans-serif',
    },
    eyeIcon: {
        width: 20,
        height: 20,
    },
})