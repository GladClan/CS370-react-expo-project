import { StyleSheet, Text, View, Image } from 'react-native'
import { Tabs, Redirect } from 'expo-router'

import { icons } from '../../constants'

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className={"items-center justify-center gap-2"} style={styles.icon}>
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className={`w-6 h-6`}
        style={styles.iconImage}
      />
      <Text className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs`} style={focused ? styles.iconTextFocused : styles.iconText}>
        {name}
      </Text>
    </View>
  )
}

const TabsLayout = () => {
  return (
    <>
      <Tabs
        ScreenOptions={{
          //These settings don't seem to have any effect yet, needs troubleshooting :/
          TabBarShowLabel: false,
          tabBarActiveTintColor: "#FF9C01",
          tabBarInactiveTintColor: "#CDCDE0",
          tabBarStyle: {
            backgroundColor: "#161622",
            borderTopColor: "#1E1E2D",
            borderTopWidth: 1,
            height: 84,
          }
        }}>
        <Tabs.Screen 
          name="home"
          options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({color, focused}) => (
            <TabIcon 
              icon={icons.home} 
              color={color}
              name={"Home"}
              focused={focused}
              />
            )
          }}/>
        <Tabs.Screen 
          name="create"
          options={{
          title: 'Create',
          headerShown: false,
          tabBarIcon: ({color, focused}) => (
            <TabIcon 
              icon={icons.plus} 
              color={color}
              name={"Create"}
              focused={focused}
              />
            )
          }}/>
        <Tabs.Screen 
          name="profile"
          options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({color, focused}) => (
            <TabIcon 
              icon={icons.profile} 
              color={color}
              name={"Profile"}
              focused={focused}
              />
            )
          }}/>
        <Tabs.Screen 
          name="bookmark"
          options={{
          title: 'Bookmark',
          headerShown: false,
          tabBarIcon: ({color, focused}) => (
            <TabIcon 
              icon={icons.bookmark} 
              color={color}
              name={"Bookmark"}
              focused={focused}
              />
            )
          }}/>
      </Tabs>
    </>
  )
}

export default TabsLayout

const styles = StyleSheet.create({
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2
  },
  iconImage: {
    width: 24,
    height: 24
  },
  iconText: {
    fontSize: 12,
    font: 'Poppins-Regular',
    fontWeight: '400',
  },
  iconTextFocused: {
    fontSize: 12,
    font: 'Poppins-SemiBold',
    fontWeight: '600',
  }
})