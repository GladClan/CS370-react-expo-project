import { StyleSheet, ScrollView, TouchableOpacity, View, Text, Image, Alert } from 'react-native'
import { useState } from 'react'
import {SafeAreaView } from 'react-native-safe-area-context'
import { Video, ResizeMode } from 'expo-av'
import * as ImagePicker from 'expo-image-picker'
import getDocumentAsync from 'expo-document-picker'

import { themeColors } from '../../tailwind.config'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { icons } from '../../constants'
import { router } from 'expo-router'
import { createVideo } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/GlobalProvider'

const Create = () => {
  const { user } = useGlobalContext();
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    title: '',
    video: null,
    thumbnail: null,
    prompt: ''
  })

  const openPicker = async (type) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: type === 'image' ? ImagePicker.MediaTypeOptions.Images : ImagePicker.MediaTypeOptions.Videos,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      if(type === 'image') {
        setForm({...form, thumbnail: result.assets[0]})
      }
      if(type === 'video') {
        setForm({...form, video: result.assets[0]})
      }
    }
  }

  const submit = async () => {
    if (!form.title || !form.video || !form.thumbnail || !form.prompt) {
      Alert.alert('All fields are required')
      return
    }
    setLoading(true)
    try {
      await createVideo(...form, user.$id)

      Alert.alert('Success!', 'Video uploaded successfully')
      router.push('/home')
    } catch (error) {
      Alert.alert('An error occurred', error.message)
    } finally {
      setForm({
        title: '',
        video: null,
        thumbnail: null,
        prompt: ''
      })
      setLoading(false)
    }
  }

  return (
    <SafeAreaView className={"bg-primary h-full"} style={{backgroundColor: themeColors.primary, height: '100%'}}>
      <ScrollView className={"px-4 my-6"} style={{paddingHorizontal: 13, marginHorizontal: 20}}>
        <Text className={"text-xl text-white font-psemibold"}>
          Upload Video
        </Text>
        <FormField 
          title={"Video Title"}
          value={form.title}
          placeholder={"Give your video a catchy title..."}
          handleChangeText={(text) => setForm({...form, title: text})}
          otherStyles={"mt-10"}
          CSSStyles={{marginTop: 32.5}}
        />

        <View className={"mt-7 space-y-2"} style={styles.textContainer}>
          <Text className={"text-base text-gray-100 font-pmedium"} style={styles.text}>
            Upload Video
          </Text>

          <TouchableOpacity onPress={() => openPicker('video')}>
            {form.video ? (
              <Video
                source={{uri: form.video.uri}}
                className={"w-full h-64 rounded-2xl"}
                style={styles.video}
                resizeMode={ResizeMode.COVER}
              />
            ) : (
              <View className={"h-40 w-full px-4 bg-black-100 rounded-2xl justify-center items-center"} style={styles.videoBox}>
                <View className={"w-14 h-14 border border-dashed border-secondary-100 justify-center items-center"} style={styles.videoPlaceholder}>
                  <Image 
                    source={icons.upload}
                    resizeMode='contain'
                    className={"w-1/2 h-1/2"}
                    style={{width: '50%', height: '50%'}}
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View className={"mt-7 space-y-2"} style={styles.textContainer}>
          <Text className={"text-base text-gray-100 font-pmedium"} style={styles.text}>
            Thumbnail Image
          </Text>
          <TouchableOpacity onPress={() => openPicker('image')}>
            {form.thumbnail ? (
              <Image
                source={{uri: form.thumbnail.uri}}
                className={"w-full h-64 rounded-2xl"}
                style={styles.video}
                resizeMode={'cover'}
              />
            ) : (
              <View className={"h-40 w-full px-4 bg-black-100 rounded-2xl justify-center items-center" + "border-2 border-black-200 flex-row space-x-2"} style={[styles.videoBox, styles.thumbnailBox]}>
                  <Image 
                    source={icons.upload}
                    resizeMode='contain'
                    className={"w-5 h-5"}
                    style={{width: 16, height: 16}}
                  />
                  <Text className={"text-sm text-gray-100 font-pmedium"} style={styles.text}>
                    Choose a file
                  </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <FormField 
          title={"AI Prompt"}
          value={form.prompt}
          placeholder={"What prompt did you use to generate this video?"}
          handleChangeText={(text) => setForm({...form, prompt: text})}
          otherStyles={"mt-7"}
          CSSStyles={{marginTop: 20}}
        />

        <CustomButton
          title={"Submit & Publish"}
          handlePress={submit}
          containerStyles={"mt-7"}
          CSSContainerStyles={{marginTop: 20}}
          isLoading={loading}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

export default Create

const styles = StyleSheet.create({
  container: {
    backgroundColor: themeColors.primary,
    height: '100%'
  },
  view: {
    paddingHorizontal: 13,
    marginHorizontal: 20
  },
  title: {
    fontSize: 16,
    lineHeight: 23,
    color: themeColors.white,
    fontFamily: 'Poppins-SemiBold, sans-serif'
  },
  text: {
    fontSize: 13,
    lineHeight: 20,
    color: themeColors.gray[100],
    fontFamily: 'Poppins-Medium, sans-serif'
  },
  textContainer: {
    marginTop: 25,
    marginBottom: 8
  },
  video: {
    height: 210,
    width: '100%',
    borderRadius: 13
  },
  videoBox: {
    height: 130,
    width: '100%',
    paddingHorizontal: 13,
    backgroundColor: themeColors.black[100],
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center'
  },
  thumbnailBox: {
    borderWidth: 2,
    borderColor: themeColors.black[200],
    flexDirection: 'row',
    marginHorizontal: 8,
  },
  videoPlaceholder: {
    height: 45,
    width: 45,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: themeColors.secondary[100],
    justifyContent: 'center',
    alignItems: 'center'
  }
})