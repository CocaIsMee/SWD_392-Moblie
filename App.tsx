import React, { useState } from 'react';
import { NavigationContainer, LinkingOptions } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import Tabs from './src/component/navigation/Tabs';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import PrivacyPolicyScreen from './src/screens/PrivacyPolicyScreen';
import CreateRequestScreen from './src/screens/CreateRequestScreen';
import OrderHistoryScreen from './src/screens/OrderHistoryScreen';
import WalletScreen from './src/screens/WalletScreen';
import ChatScreen from './src/screens/ChatScreen';
import Toast from 'react-native-toast-message';
import BaseScreen from './src/screens/BaseScreen';
import PaymentSuccessScreen from './src/screens/PaymentSuccessScreen';
import PaymentFailScreen from './src/screens/PaymentFailScreen';
import { showToast } from './src/component/notification/Toast';
import VNPayScreen from './src/screens/VNPayScreen';

// Define type for navigation params for each screen
export type RootStackParamList = {
  Base: undefined;
  Login: undefined;
  Register: undefined;
  Rule: undefined;
  Request: undefined;
  Order: undefined;
  Chat: undefined;
  Setting: undefined;
  Wallet: undefined;
  VNPay: { 
    paymentUrl: string;
  };
  PaymentSuccess: {
    amount: string;
    transactionNo: string;
    orderInfo: string;
    payDate: string;
  };
  PaymentFail: {
    message: string;
  };
  Home: undefined;
};

// Define props type for VNPayScreen with navigation and route
type VnPayScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'VNPay'>;
  route: RouteProp<RootStackParamList, 'VNPay'>;
};

// Create a linking configuration for deep linking
const linking: LinkingOptions<RootStackParamList> = {
  prefixes: ['mindmathapp://'],
  config: {
    screens: {
      Login: 'login',
      Register: 'register',
      Rule: 'rule',
      Request: 'request',
      Order: 'order-history',
      Setting: 'settings',
      Wallet: 'wallet',
      VNPay: 'vnpay/:paymentUrl',
      PaymentSuccess: 'payment-success',
      PaymentFail: 'payment-fail',
    },
  },
};

// Create a stack navigator
const Stack = createStackNavigator<RootStackParamList>();

// Main App component
const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator>
        <Stack.Screen name="Base" options={{ headerShown: false }} component={BaseScreen} />
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
          options={{ title: 'Register', headerShown: false }}
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
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="Request" component={CreateRequestScreen} />
        <Stack.Screen name="Order" component={OrderHistoryScreen} />
        <Stack.Screen name="Setting" component={SettingsScreen} />
        <Stack.Screen name="Wallet" component={WalletScreen} />
        <Stack.Screen
          name="VNPay"
          component={VNPayScreen}
          options={{ title: 'VNPay Payment' }}
        />
        <Stack.Screen
          name="PaymentSuccess"
          component={PaymentSuccessScreen}
          options={{ title: 'Payment Success' }}
        />
        <Stack.Screen
          name="PaymentFail"
          component={PaymentFailScreen}
          options={{ title: 'Payment Failed' }}
        />

      </Stack.Navigator>
      <Toast />
    </NavigationContainer>
  );
};

export default App;
