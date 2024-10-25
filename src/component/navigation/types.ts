// navigation/types.ts
import { CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// Define the param list for your stack navigator
export type AuthStackParamList = {
  Home: undefined;
  Tabs: undefined;
  Login: undefined;
  Register: undefined;
  Setting: undefined;
  Rule: undefined;
  Request: undefined;
  Order: undefined;
};

// Create a type for the stack navigation prop
export type AuthNavigationProp = StackNavigationProp<AuthStackParamList>;

// If you have a nested navigator, for example, a BottomTabNavigator:
// import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
// export type BottomTabParamList = {
//   Tab1: undefined;
//   Tab2: undefined;
// };

// Combine with CompositeNavigationProp if needed
// export type CombinedNavigationProp = CompositeNavigationProp<
//   AuthNavigationProp,
//   BottomTabNavigationProp<BottomTabParamList>
// >;
