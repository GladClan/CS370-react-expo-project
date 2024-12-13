import { StyleSheet, Text, TextInput, View, Image, TouchableOpacity, Alert } from 'react-native'
import { useState } from 'react'
import { icons } from '../constants'
import { themeColors } from '../tailwind.config'
import { router, usePathname } from 'expo-router'

const SearchInput = ({ value, initialQuery, placeholder, ...props }) => {
    const pathname = usePathname()
    const [searchQuery, setSearchQuery] = useState(initialQuery || '')

    const [isFocused, setIsFocused] = useState(false)

    return (
    <View className="flex-row border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl items-center focus:border-secondary space-x-4" style={[styles.inputContainer, isFocused && styles.inputContainerFocused]}>
        <TextInput
            className="text-base mt-0.5 text-white flex-1 font-pregular"
            value={searchQuery}
            placeholder={placeholder}
            onChangeText={(e) => setSearchQuery(e)}
            placeholderTextColor={'#cdcde0'}
            style={styles.input}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
        />

        <TouchableOpacity
            onPress={() => {
                console.log("Searching for", searchQuery)
                if (!searchQuery) { return Alert.alert('Missing Query', 'Please enter something to search results across database') }
                if (pathname.startsWith('/search')) { router.setParams({ query: searchQuery }) }
                else { router.push(`/search/${searchQuery}`) }
            }}
        >
            <Image
                source={icons.search}
                className={"h-5 w-5"}
                resizeMode='contain'
                style={styles.icon}
            />
        </TouchableOpacity>
    </View>
  )
}

export default SearchInput

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
        gap: 4,
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
        marginTop: 1.625,
        fontFamily: 'Poppins-Regular, sans-serif',
    },
    icon: {
        width: 20,
        height: 20,
    },
})