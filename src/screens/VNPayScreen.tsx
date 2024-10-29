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

import React, { useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import { RouteProp, useNavigation } from '@react-navigation/native';

interface VnPayScreenProps {
    route: RouteProp<{ params: { paymentUrl: string } }, 'params'>;
}

const VnPayScreen: React.FC<VnPayScreenProps> = ({ route }) => {
    const { paymentUrl } = route.params;
    const navigation = useNavigation();

    const onMessage = (event: any) => {
        const data = JSON.parse(event.nativeEvent.data);
        
        if (data.vnp_ResponseCode === '200') {
            navigation.navigate('PaymentSuccessScreen', {
                responseCode: data.vnp_ResponseCode,
                transactionNo: data.vnp_TxnRef,
            });
        } else {
            Alert.alert('Thông báo', 'Thanh toán thất bại. Vui lòng thử lại.');
        }
    };

    return (
        <View style={styles.container}>
            <WebView 
                source={{ uri: paymentUrl }} 
                onMessage={onMessage}
                javaScriptEnabled={true}
                domStorageEnabled={true}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
});

export default VnPayScreen;

