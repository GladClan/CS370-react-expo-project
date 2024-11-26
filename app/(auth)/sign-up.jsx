import { useState } from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-web'
import { Link } from 'expo-router'
import { themeColors } from '../../tailwind.config'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'

import { images } from '../../constants'

const SignUp = () => {
  const [form, setForm] = useState({
    userName: '',
    email: '',
    password: '',
  })
  const [submitting, setSubmitting] = useState(false)

  return (
    <SafeAreaView className="bg-primary h-full" style={styles.safeAreaView}>
      <ScrollView>
        <View className="w-full min-h-[85vh] justify-center px-6 my-6" style={styles.contentView}>
          <Image source={images.logo} resizeMode='contain' className="w-[115px] h-[35px]" style={styles.logo} />

          <Text className="text-2xl text-white text-semibold mt-10 font-semibold" style={styles.title}>Sign up for this app!</Text>

          <FormField 
            title='Username'
            value={form.userName}
            handleChangeText={(value) => setForm({ ...form, userName: value })}
            otherStyles="mt-10"
            CSSStyles={{marginTop: 10}}
          />
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
            title='Sign Up'
            handlePress={() => console.log('Sign up')}
            otherStyles="mt-7" 
            isLoading={submitting}
          />

          <View className="flex-row justify-center pt-5 gap-2" style={styles.signinContainer}>
            <Text className="text-lg text-gray-100 font-pregular" style={styles.signinText}>
              Already have an account?
            </Text>
            <Link href="/sign-in" className="text-lg font-psemibold text-secondary" style={styles.signinLink}>
              Sign in
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp

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
  signinContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 5,
    gap: 2,
  },
  signinText: {
    fontSize: 14,
    lineHeight: 22,
    color: themeColors.gray[100],
    fontFamily: 'Poppins-Regular, sans-serif',
  },
  signinLink: {
    fontSize: 14,
    lineHeight: 22,
    color: themeColors.secondary.DEFAULT,
    fontFamily: 'Poppins-SemiBold, sans-serif',
  },
})