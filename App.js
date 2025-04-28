import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';

import TopBar from './src/components/TopBar';
import WelcomeScreen from './src/screens/WelcomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import HomePage from './src/screens/HomePage';
import UsersScreen from './src/screens/UsersScreen';
// You can add more screens like SearchScreen, UploadScreen if needed

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// TopBar options
const screenOptions = ({ navigation }) => ({
  header: () => <TopBar navigation={navigation} />,
});

// Bottom Tab Navigator
function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Search') {
            iconName = 'search';
          } else if (route.name === 'Upload') {
            iconName = 'plus-circle';
          } else if (route.name === 'Map') {
            iconName = 'map-marker'
          } else if (route.name === 'User') {
            iconName = 'user';
          }

          return <FontAwesome name={iconName} size={size} color={focused ? 'black' : 'grey'} />;
        },
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'grey',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomePage} />
      {/* If you have these screens, otherwise create empty ones */}
      <Tab.Screen name="Search" component={PlaceholderScreen} />
      <Tab.Screen name="Upload" component={PlaceholderScreen} />
      <Tab.Screen name="Map" component={PlaceholderScreen} />
      <Tab.Screen name="User" component={UsersScreen} />
    </Tab.Navigator>
  );
}

// Placeholder screen if Search/Upload screens are not yet created
function PlaceholderScreen() {
  return (
    <></> // just an empty screen for now
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Welcome"
          screenOptions={screenOptions}
        >
          <Stack.Screen
            name="Welcome"
            component={WelcomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="HomePage" component={BottomTabs} options={{ headerShown: false }} />
          {/* User page inside Tabs now, optional if needed separately */}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
