import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { useState } from 'react'

import { themeColors } from '../tailwind.config'
import { icons } from '../constants'

const VideoCard = ({ video: {title, thumbnail, video, creator: { username, avatar }}}) => {
    const [play , setPlay] = useState(false)
  return (
    <View className={"flex-col items-center px-4 mb-14"} style={styles.container}>
        <View className={"flex-row gap-3 items-start"} style={styles.containerChild}>
            <View className={"justify-center items-center flex-row flex-1"} style={styles.containerList}>
                <View className={"w-[46px] h-[46px] rounded-lg border border-secondary justify-center items-center p-0.5"} style={styles.videoBorder}>
                    <Image 
                        source={{uri: avatar}}
                        className={"w-full h-full rounded-lg"}
                        resizeMode='cover'
                        style={styles.avatar}
                    />
                </View>

                <View className={"justify-center flex-1 ml-3 gap-y-1"} style={styles.userIconWrapper}>
                    <Text className={"text-white font-psemibold text-sm"} style={styles.userIcon} numberOfLines={1}>
                        {title}
                    </Text>
                    <Text className={"text-xs text-gray-100 font-pregular"} style={styles.username} numberOfLines={1}>
                        {username}
                    </Text>
                </View>
            </View>

            <View className={"pt-2"} style={{paddingTop: 6.5}}>
                <Image 
                    source={icons.menu}
                    className={"w-5 h-5"}
                    style={{width: 16, height: 16}}
                    resizeMode='contain'
                />
            </View>
        </View>

        {play ? (<Text style={{color: themeColors.white}}>Playing</Text>) : (
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setPlay(true)}
                className={"w-full h-60 rounded-xl mt-3 relative justify-center items-center"}
                style={styles.videoIcon}
                >
                <Image
                    source={{ uri: thumbnail }}
                    className={"w-full h-full rounded-xl mt-3"}
                    style={styles.videoThumbnail}
                    resizeMode='cover'
                />
                <Image
                    source={icons.play}
                    className={"w-12 h-12 absolute"}
                    style={{width: 40, height: 40, position: 'absolute'}}
                    resizeMode='contain'
                />
            </TouchableOpacity>
        )}
    </View>
  )
}

export default VideoCard

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'left',
        paddingHorizontal: 13,
        marginBottom: 45
    },
    containerChild: {
        flexDirection: 'row',
        gap: 9,
        alignItems: 'flex-start'
    },
    containerList: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        flex: 1
    },
    videoBorder: {
        width: 46,
        height: 46,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: themeColors.secondary['DEFAULT'],
        justifyContent: 'center',
        alignItems: 'center',
        padding: 2
    },
    userIconWrapper: {
        justifyContent: 'center',
        flex: 1,
        marginLeft: 10,
        rowGap: 3.25
    },
    userIcon: {
        color: themeColors.white,
        fontFamily: 'Poppins-SemiBold',
        fontSize: 12,
        lineHeight: 16
    },
    username: {
        color: themeColors.gray[100],
        fontFamily: 'Poppins-Regular',
        fontSize: 10,
        lineHeight: 14
    },
    avatar: {
        width: '100%',
        height: '100%',
        borderRadius: 6.5
    },
    videoIcon: {
        width: '100%',
        height: 195,
        borderRadius: 10,
        marginTop: 10,
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center'
    },
    videoThumbnail: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
        marginTop: 10
    }
})