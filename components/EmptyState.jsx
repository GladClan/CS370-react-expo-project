import { StyleSheet, Text, View, Image } from 'react-native'
import { router } from 'expo-router'

import CustumButton from './CustomButton'
import { themeColors } from '../tailwind.config'
import { images } from '../constants'

const EmptyState = ({ title, subtitle }) => {
  return (
    <View className={"justify-center items-center px-4"}>
      <Image 
        source={images.empty}
        className={"w-[270px] h-[215px]"}
        resizeMode="contain"
        style={styles.image}
      />

      <Text className={"text-xl text-center font-psemibold text-white mt-2"} style={styles.title}>
        {title}
      </Text>
      <Text className={"font-pmedium text-sm text-gray-100"} style={styles.subtitle}>
        {subtitle}
      </Text>
      <CustumButton
        title={"Create a video"}
        onPress={() => router.push('/create')}
        containerStyles={"w-full my-5"}
        CSScontainerStyles={{width: '100%', marginVertical: 16}}
      />
    </View>
  )
}

export default EmptyState

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 13,
    },
    image: {
        width: 270,
        height: 215,
        alignSelf: 'center',
    },
    title: {
        marginTop: 6.5,
        textAlign: 'center',
        fontFamily: 'Poppins-SemiBold',
        fontSize: 16,
        fontHeight: 23,
        color: themeColors.white,
    },
    subtitle: {
        textAlign: 'center',
        fontFamily: 'Poppins-Medium',
        fontSize: 11,
        color: themeColors.gray[100],
    },
})