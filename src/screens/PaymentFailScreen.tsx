import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type PaymentFailScreenProps = {
  route: RouteProp<RootStackParamList, 'PaymentFail'>;
  navigation: StackNavigationProp<RootStackParamList, 'PaymentFail'>;
};

const PaymentFailScreen: React.FC<PaymentFailScreenProps> = ({ route, navigation }) => {
  const { message } = route.params;

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.failIcon}>✕</Text>
      <Text style={styles.title}>Payment Failed</Text>
      <Text style={styles.message}>{message}</Text>
      
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        })}
      >
        <Text style={styles.buttonText}>Return to Home</Text>
      </TouchableOpacity>

      <Text style={styles.redirectText}>
        Redirecting to home in 3 seconds...
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  failIcon: {
    fontSize: 50,
    color: '#f44336',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#d32f2f',
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  redirectText: {
    marginTop: 30,
    color: '#666',
    fontSize: 14,
  },
});

export default PaymentFailScreen;