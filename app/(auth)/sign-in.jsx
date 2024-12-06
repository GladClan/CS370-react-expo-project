import { useState } from 'react'
import { StyleSheet, View, Text, Image, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-web'
import { Link, router } from 'expo-router'
import { themeColors } from '../../tailwind.config'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { useGlobalContext } from '../../context/GlobalProvider'

import { images } from '../../constants'
import { getCurrentUser, signIn } from '../../lib/appwrite'

const SignIn = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  })
  const [submitting, setSubmitting] = useState(false)

const { setUser, setIsLoggedIn } = useGlobalContext();

  const handleSignIn = async () => {
    console.log('Submit button clicked')
    if (!form.email || !form.password) {
      Alert.alert('error', 'Please fill all fields')
      return
    }
      setSubmitting(true)

      try {
        console.log('Signing in user...')
        await signIn(form.email, form.password)
        console.log('User signed in')

        const result = await getCurrentUser()
        setUser(result)
        setIsLoggedIn(true)

        // Set the user to global state...

        router.replace('/home')
      } catch (error) {
        Alert.alert('error', error.message)
        console.log(error)
      } finally {
        setSubmitting(false)
    }
  }

  return (
    <SafeAreaView className="bg-primary h-full" style={styles.safeAreaView}>
      <ScrollView>
        <View className="w-full min-h-[85vh] justify-center px-6 my-6" style={styles.contentView}>
          <Image source={images.logo} resizeMode='contain' className="w-[115px] h-[35px]" style={styles.logo} />

          <Text className="text-2xl text-white text-semibold mt-10 font-semibold" style={styles.title}>Log in to this app!</Text>

          <FormField 
            title='Email'
            value={form.email}
            handleChangeText={(value) => setForm({ ...form, email: value })}
            otherStyles="mt-7"
            CSSStyles={{marginTop: 7}}
          />
          <FormField 
            title='Password'
            value={form.password}
            handleChangeText={(value) => setForm({ ...form, password: value })}
            otherStyles="mt-7"
            keyboardType='password'
            CSSStyles={{marginTop: 7}}
          />

          <CustomButton
            title='Sign In'
            handlePress={handleSignIn}
            otherStyles="mt-7" 
            isLoading={submitting}
          />

          <View className="flex-row justify-center pt-5 gap-2" style={styles.signupContainer}>
            <Text className="text-lg text-gray-100 font-pregular" style={styles.signupText}>
              Don't have an account?
            </Text>
            <Link href="/sign-up" className="text-lg font-psemibold text-secondary" style={styles.signupLink}>
              Sign up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: themeColors.primary,
    height: '100%',
  },
  contentView: {
    width: '100%',
    minHeight: '85vh',
    justifyContent: 'center',
    paddingHorizontal: 6,
    marginTop: 6,
  },
  logo: {
    width: 115,
    height: 35,
  },
  title: {
    fontSize: 2,
    color: themeColors.white,
    fontWeight: 'bold',
    marginTop: 10,
  }, 
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 5,
    gap: 2,
  },
  signupText: {
    fontSize: 14,
    lineHeight: 22,
    color: themeColors.gray[100],
    fontFamily: 'Poppins-Regular, sans-serif',
  },
  signupLink: {
    fontSize: 14,
    lineHeight: 22,
    color: themeColors.secondary.DEFAULT,
    fontFamily: 'Poppins-SemiBold, sans-serif',
  },
})