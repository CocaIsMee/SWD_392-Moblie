import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';

type PaymentSuccessScreenNavigationProp = StackNavigationProp<RootStackParamList, 'PaymentSuccess'>;

type PaymentSuccessScreenProps = {
  navigation: PaymentSuccessScreenNavigationProp;
};

const PaymentSuccessScreen: React.FC<PaymentSuccessScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>Payment Successful!</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  message: {
    fontSize: 20,
    marginBottom: 20,
  },
});

export default PaymentSuccessScreen;
