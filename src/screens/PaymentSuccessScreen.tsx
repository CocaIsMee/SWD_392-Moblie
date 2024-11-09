import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type PaymentSuccessScreenProps = {
  route: RouteProp<RootStackParamList, 'PaymentSuccess'>;
  navigation: StackNavigationProp<RootStackParamList, 'PaymentSuccess'>;
};

const PaymentSuccessScreen: React.FC<PaymentSuccessScreenProps> = ({ route, navigation }) => {
  const { amount, transactionNo, orderInfo, payDate } = route.params;

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  // Format date string from "yyyyMMddHHmmss" to readable format
  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const year = dateStr.substring(0, 4);
    const month = dateStr.substring(4, 6);
    const day = dateStr.substring(6, 8);
    const hour = dateStr.substring(8, 10);
    const minute = dateStr.substring(10, 12);
    return `${day}/${month}/${year} ${hour}:${minute}`;
  };

  // Convert amount from VND cents to VND
  const formatAmount = (amountInCents: string) => {
    const amountInVND = parseInt(amountInCents) / 100;
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amountInVND);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.successIcon}>✓</Text>
      <Text style={styles.title}>Payment Successful!</Text>
      
      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Amount:</Text>
          <Text style={styles.value}>{formatAmount(amount)}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <Text style={styles.label}>Transaction ID:</Text>
          <Text style={styles.value}>{transactionNo}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <Text style={styles.label}>Order Info:</Text>
          <Text style={styles.value}>{orderInfo}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <Text style={styles.label}>Date:</Text>
          <Text style={styles.value}>{formatDate(payDate)}</Text>
        </View>
      </View>

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
  successIcon: {
    fontSize: 50,
    color: '#4CAF50',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: 30,
  },
  detailsContainer: {
    width: '100%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  label: {
    fontSize: 16,
    color: '#666',
    flex: 1,
  },
  value: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
    flex: 2,
    textAlign: 'right',
  },
  redirectText: {
    marginTop: 30,
    color: '#666',
    fontSize: 14,
  },
});

export default PaymentSuccessScreen;