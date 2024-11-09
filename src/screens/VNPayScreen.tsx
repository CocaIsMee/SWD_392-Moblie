// import React, { useState, useEffect } from 'react';
// import { WebView } from 'react-native-webview';
// import { View, ActivityIndicator, Alert } from 'react-native';
// import { host_main, API_CREATE_TRANSACTION, API_RETURN_URL } from '../api/api';

// interface VNPayScreenProps {
//   route: {
//     params: {
//       userId: string;
//       amount: number;
//       description: string;
//     };
//   };
// }

// const VNPayScreen: React.FC<VNPayScreenProps> = ({ route }) => {
//   const [url, setUrl] = useState<string>('');

//   useEffect(() => {
//     const fetchPaymentUrl = async () => {
//       const { userId, amount, description } = route.params;
//       try {
//         const response = await fetch(`${host_main}${API_CREATE_TRANSACTION(userId)}`, {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({
//             amount,
//             description,
//             returnUrl: `${host_main}${API_RETURN_URL}`,
//           }),
//         });

//         const data = await response.json();
//         if (response.ok && data.paymentUrl) {
//           setUrl(data.paymentUrl);
//         } else {
//           Alert.alert('Lỗi', 'Không thể lấy được URL thanh toán');
//         }
//       } catch (error) {
//         Alert.alert('Lỗi', 'Đã xảy ra lỗi khi tạo giao dịch');
//       }
//     };

//     fetchPaymentUrl();
//   }, [route.params]);

//   if (!url) {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <ActivityIndicator size="large" color="#0000ff" />
//       </View>
//     );
//   }

//   return (
//     <WebView
//       source={{ uri: url }}
//       onNavigationStateChange={(navState) => {
//         if (navState.url.includes(API_RETURN_URL)) {
//           Alert.alert('Trạng thái thanh toán', 'Giao dịch hoàn tất thành công');
//           // Có thể thêm điều hướng về trang Wallet hoặc trang khác nếu cần thiết
//         }
//       }}
//       style={{ flex: 1 }}
//     />
//   );
// };

// export default VNPayScreen;
// import React from 'react';
// import { WebView } from 'react-native-webview';
// import { View, ActivityIndicator, Alert } from 'react-native';

// interface VNPayScreenProps {
//   route: {
//     params: {
//       paymentUrl: string;
//     };
//   };
// }

// const VNPayScreen: React.FC<VNPayScreenProps> = ({ route }) => {
//   const { paymentUrl } = route.params;

//   if (!paymentUrl) {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <ActivityIndicator size="large" color="#0000ff" />
//       </View>
//     );
//   }

//   return (
//     <WebView
//       source={{ uri: paymentUrl }}
//       onNavigationStateChange={(navState) => {
//         if (navState.url.includes('ReturnUrl')) {
//           Alert.alert('Payment Status', 'Transaction completed successfully');
//         }
//       }}
//     />
//   );
// };

// export default VNPayScreen;

// import React from 'react';
// import { View, StyleSheet } from 'react-native';
// import { WebView } from 'react-native-webview';
// import { RouteProp } from '@react-navigation/native';

// interface VnPayScreenProps {
//     route: RouteProp<{ params: { paymentUrl: string } }, 'params'>;
// }

// const VnPayScreen: React.FC<VnPayScreenProps> = ({ route }) => {
//     const { paymentUrl } = route.params;

//     return (
//         <View style={styles.container}>
//             <WebView source={{ uri: paymentUrl }} />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: { flex: 1 },
// });

// export default VnPayScreen;

// import React, { useEffect } from 'react';
// import { View, StyleSheet, Alert } from 'react-native';
// import { WebView } from 'react-native-webview';
// import { RouteProp } from '@react-navigation/native';
// import { StackNavigationProp } from '@react-navigation/stack';

// type RootStackParamList = {
//     PaymentSuccessScreen: { responseCode: string; transactionNo: string };
//     VNPay: { paymentUrl: string };
// };

// interface VnPayScreenProps {
//     route: RouteProp<RootStackParamList, 'VNPay'>;
//     navigation: StackNavigationProp<RootStackParamList, 'VNPay'>;
// }

// const VnPayScreen: React.FC<VnPayScreenProps> = ({ route, navigation }) => {
//     const { paymentUrl } = route.params;
  
//     const handleNavigationStateChange = (navState: WebViewNavigation) => {
//       // Check if the URL starts with your deep link scheme
//       if (navState.url.startsWith('mindmathapp://')) {
//         const url = new URL(navState.url);
        
//         if (url.pathname.includes('payment-success')) {
//           const params = new URLSearchParams(url.search);
//           navigation.replace('PaymentSuccess', {
//             transactionId: params.get('transactionId'),
//             amount: params.get('amount'),
//           });
//         } else if (url.pathname.includes('payment-failed')) {
//           navigation.replace('PaymentFail');
//         }
//       }
//     };
  
//     return (
//       <View style={styles.container}>
//         <WebView
//           source={{ uri: paymentUrl }}
//           onNavigationStateChange={handleNavigationStateChange}
//           javaScriptEnabled={true}
//           domStorageEnabled={true}
//         />
//       </View>
//     );
//   };
// const styles = StyleSheet.create({
//     container: { flex: 1 },
// });

// export default VnPayScreen;

import React from 'react';
import { View, StyleSheet, BackHandler } from 'react-native';
import { WebView, WebViewNavigation } from 'react-native-webview';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App'; // Update this import path based on your file structure

type VNPayScreenNavigationProp = StackNavigationProp<RootStackParamList, 'VNPay'>;
type VNPayScreenRouteProp = RouteProp<RootStackParamList, 'VNPay'>;

interface VNPayScreenProps {
  navigation: VNPayScreenNavigationProp;
  route: VNPayScreenRouteProp;
}

const VNPayScreen: React.FC<VNPayScreenProps> = ({ navigation, route }) => {
  const { paymentUrl } = route.params;

  React.useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true
    );
    return () => backHandler.remove();
  }, []);

  const getErrorMessage = (responseCode: string | null): string => {
    switch (responseCode) {
      case '24':
        return 'Payment cancelled by user';
      case '09':
        return 'Transaction timeout';
      case '10':
        return 'Insufficient funds';
      case '11':
        return 'Invalid card';
      case '12':
        return 'Invalid transaction';
      case '13':
        return 'Invalid amount';
      case '51':
        return 'Insufficient balance';
      case '65':
        return 'Transaction limit exceeded';
      default:
        return 'Payment failed';
    }
  };

  const handleNavigationStateChange = (navState: WebViewNavigation) => {
    // Extract URL parameters when VNPay redirects back
    if (navState.url.includes('vnp_ResponseCode')) {
      try {
        const urlParams = new URLSearchParams(
          navState.url.slice(navState.url.indexOf('?') + 1)
        );

        const responseCode = urlParams.get('vnp_ResponseCode');
        const transactionStatus = urlParams.get('vnp_TransactionStatus');

        if (responseCode === '00' && transactionStatus === '00') {
          // Payment successful
          navigation.replace('PaymentSuccess', {
            amount: urlParams.get('vnp_Amount') || '0',
            transactionNo: urlParams.get('vnp_TransactionNo') || '',
            orderInfo: urlParams.get('vnp_OrderInfo') || '',
            payDate: urlParams.get('vnp_PayDate') || ''
          });
        } else {
          // Payment failed
          const message = getErrorMessage(responseCode);
          navigation.replace('PaymentFail', { message });
        }
      } catch (error) {
        console.error('Error processing payment response:', error);
        navigation.replace('PaymentFail', { 
          message: 'An error occurred while processing the payment response' 
        });
      }
    }
  };

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: paymentUrl }}
        onNavigationStateChange={handleNavigationStateChange}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        incognito={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default VNPayScreen;