import { StatusBar } from 'expo-status-bar';
import { Redirect, router } from 'expo-router'
import { StyleSheet, Text, View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-web';

import { themeColors } from '../tailwind.config';
import { images } from '../constants';
import CustomButton from '../components/CustomButton';

export default function App() {
  return (
    <SafeAreaView className="bg-primary h-full" style={styles.safeAreaView}>
      <ScrollView contentContainerStyle={{height: '100%'}} style={styles.scrollViewContent}>
        <View className="w-full min-h-[85vh] justify-center items-center px-4" style={styles.container}>
          <Image source={images.logo} className="w-[130] h-[84]" resizeMode="contain" style={styles.logoImage} />
          <Image source={images.cards} calssName="max-w-[380px] w-full h-[300px]" resizeMode="contain" style={styles.cardsImage} />
          <View className="realtive mt-5" style={styles.relativeView} >
            <Text className="text-3xl text-white font-bold text-center" style={styles.mainText} >Discover endless possibilities with {' '}
              <Text className="text-secondary-200" style={styles.secondaryText} >This App!!!</Text>
            </Text>
            <Image source={images.path} className="w-[136px] h-[15px] absolute -bottom-2 -right-2" resizeMode="contain" style={styles.pathImage} />
          </View>
          <Text className="text-sm font-pregular text-gray-100 mt-7 text-center" style={styles.descriptionText} >Where creativity meets innovation: 
            Embark on a journey of limitless exploration with this incredible app.
          </Text>
          <CustomButton title={"Continue with email"} handlePress={() => router.push('/sign-in')} containerStyles="w-full mt-7" CSSContainerStyles={styles.buttonContainer} />
        </View>
      </ScrollView>

      <StatusBar backgroundColor={themeColors.primary} style='light' />
    </SafeAreaView>
  );
}

//For some reason tailwind is not working in the app, so I had to use the styles object to style the components.
//I will be in process of troubleshooting the issue, but for now I'm moving on so I can keep getting stuff done.
const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: themeColors.primary,
    height: '100%',
  },
  scrollViewContent: {
    height: '100%',
  },
  container: {
    width: '100%',
    minHeight: '85vh',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  logoImage: {
    width: 130,
    height: 84,
  },
  cardsImage: {
    maxWidth: 380,
    width: '100%',
    height: 300,
  },
  relativeView: {
    position: 'relative',
    marginTop: 20,
  },
  mainText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  secondaryText: {
    color: themeColors.secondary[200],
  },
  pathImage: {
    width: 136,
    height: 15,
    position: 'absolute',
    bottom: -8,
    right: -8,
  },
  descriptionText: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: themeColors.gray[100],
    marginTop: 28,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    marginTop: 28,
  }
});
