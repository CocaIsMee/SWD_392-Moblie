import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Tabs from './src/component/navigation/Tabs';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import HomeScreen from './src/screens/HomeScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import PrivacyPolicyScreen from './src/screens/PrivacyPolicyScreen';
import CreateRequestScreen from './src/screens/CreateRequestScreen';
import OrderHistoryScreen from './src/screens/OrderHistoryScreen';
import Toast from 'react-native-toast-message';
import { showToast } from './src/component/notification/Toast';

const Stack = createStackNavigator();

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          options={{ headerShown: false }}
        >
          {() =>
            isAuthenticated ? (
              <Tabs />
            ) : (
              <LoginScreen
                onLoginSuccess={() => {
                  setIsAuthenticated(true);
                  showToast('Login Successful', 'Welcome back!', 'success');
                }}
              />
            )
          }
        </Stack.Screen>
        <Stack.Screen
          name="Register"
          options={{ title: 'Register' }}
        >
          {({ navigation }) => (
            <RegisterScreen
              onRegisterSuccess={() => {
                showToast('Registration Successful', 'Welcome!', 'success');
                navigation.navigate('Login');
              }}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Rule" component={PrivacyPolicyScreen} />
        <Stack.Screen name="Request" component={CreateRequestScreen} />
        <Stack.Screen name="Order" component={OrderHistoryScreen} />
        <Stack.Screen name="Setting" component={SettingsScreen} />
      </Stack.Navigator>
      <Toast />
    </NavigationContainer>
  );
};

export default App;
