import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';

import { SplashScreen, WelcomeScreen, LoginScreen, SignUpScreen, SetPasswordScreen } from '../screens/AuthScreens';
import { HomeScreen } from '../screens/HomeScreen';
import { DoctorsScreen, DoctorProfileScreen, BookingScreen } from '../screens/DoctorScreens';
import { AppointmentsScreen, PaymentScreen } from '../screens/AppointmentScreens';
import { ProfileScreen, EditProfileScreen, NotificationsScreen, ChatScreen } from '../screens/ProfileScreens';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#2864F5',
        tabBarInactiveTintColor: '#888',
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{ tabBarLabel: 'Home', tabBarIcon: () => <Text>🏠</Text> }}
      />
      <Tab.Screen
        name="DoctorsTab"
        component={DoctorsScreen}
        options={{ tabBarLabel: 'Doctors', tabBarIcon: () => <Text>👨‍⚕️</Text> }}
      />
      <Tab.Screen
        name="AppointmentsTab"
        component={AppointmentsScreen}
        options={{ tabBarLabel: 'Appointments', tabBarIcon: () => <Text>📅</Text> }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{ tabBarLabel: 'Profile', tabBarIcon: () => <Text>👤</Text> }}
      />
    </Tab.Navigator>
  );
}

export function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Splash">
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="SetPassword" component={SetPasswordScreen} />
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen name="DoctorProfile" component={DoctorProfileScreen} />
      <Stack.Screen name="Booking" component={BookingScreen} />
      <Stack.Screen name="Payment" component={PaymentScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
    </Stack.Navigator>
  );
}