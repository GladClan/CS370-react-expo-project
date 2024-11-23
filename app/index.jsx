import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';
import { link } from 'fs';

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-white" style={styles.container}>
      <StatusBar style="auto" />
      <Text className="text-3xl" style={styles.title}>The app title will go here!</Text>
      <Link href="/profile" style={styles.link}>Go to profile</Link>
    </View>
  );
}

//For some reason tailwind is not working in the app, so I had to use the styles object to style the components.
//I will be in process of troubleshooting the issue, but for now I'm moving on so I can keep getting stuff done.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: '1.875rem',
    lineHeight: '2.25rem',
    fontFamily: 'Poppins-Black, sans-serif',
  },
  link: {
    color: 'blue',
  }
});
