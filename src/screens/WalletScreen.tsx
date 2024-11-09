// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, ActivityIndicator } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { fetchWalletData, fetchTransactions } from '../api/api'; // Import các hàm từ walletApi.ts

// interface Transaction {
//     id: number;
//     amount: number;
//     type: 'credit' | 'debit';
//     date: string;
// }

// const WalletScreen: React.FC = () => {
//     const [balance, setBalance] = useState<number>(0);
//     const [transactions, setTransactions] = useState<Transaction[]>([]);
//     const [loading, setLoading] = useState<boolean>(true);
//     const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
//     const [isPaymentSuccessVisible, setIsPaymentSuccessVisible] = useState<boolean>(false);
//     const [isBackHovered, setIsBackHovered] = useState(false); // Trạng thái hover cho nút Back to Wallet
//     const [isBuyHovered, setIsBuyHovered] = useState(false); // Trạng thái hover cho nút Buy more coins

//     useEffect(() => {
//         const fetchWalletDataFromAPI = async () => {
//             try {
//                 const userId = await AsyncStorage.getItem('userId');
//                 const token = await AsyncStorage.getItem('accessToken');

//                 if (!userId || !token) {
//                     console.log('User ID or access token is missing.');
//                     return;
//                 }

//                 // Fetch wallet data
//                 const walletData = await fetchWalletData(userId, token);
//                 setBalance(walletData.balance);

//                 // Fetch transactions
//                 const transactionsData = await fetchTransactions(userId, token);
//                 setTransactions(transactionsData);
//             } catch (error) {
//                 console.error('Failed to fetch wallet data:', error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchWalletDataFromAPI();
//     }, []);

//     // Handle adding coins based on user selection
//     const addCoins = (amount: number) => {
//         setBalance(prevBalance => prevBalance + amount);
//         const newTransaction: Transaction = {
//             id: transactions.length + 1,
//             amount: amount,
//             type: 'credit',
//             date: new Date().toISOString().slice(0, 10),
//         };
//         setTransactions(prevTransactions => [newTransaction, ...prevTransactions]);

//         // Show payment success modal
//         setIsModalVisible(false);
//         setIsPaymentSuccessVisible(true);
//     };

//     // Render transaction item
//     const renderTransaction = ({ item }: { item: Transaction }) => (
//         <View style={styles.transactionItem}>
//             <Text>{item.date}</Text>
//             <Text style={item.type === 'credit' ? styles.credit : styles.debit}>
//                 {item.type === 'credit' ? `+ ${item.amount} Coins` : `- ${item.amount} Coins`}
//             </Text>
//         </View>
//     );

//     if (loading) {
//         return <ActivityIndicator size="large" color="blue" />;
//     }

//     return (
//         <View style={styles.container}>
//             {/* Balance Section */}
//             <View style={styles.balanceContainer}>
//                 <Text style={styles.balanceTitle}>Your Balance</Text>
//                 <Text style={styles.balanceAmount}>{balance} Coins</Text>
//             </View>

//             {/* Add Funds Button */}
//             <TouchableOpacity style={styles.addFundsButton} onPress={() => setIsModalVisible(true)}>
//                 <Text style={styles.addFundsText}>Buy more coins</Text>
//             </TouchableOpacity>

//             {/* Transaction History */}
//             <Text style={styles.transactionsTitle}>Transaction History</Text>
//             <FlatList
//                 data={transactions}
//                 renderItem={renderTransaction}
//                 keyExtractor={item => item.id.toString()}
//                 style={styles.transactionsList}
//             />

//             {/* Modal for purchasing coins */}
//             <Modal
//                 transparent={true}
//                 visible={isModalVisible}
//                 animationType="slide"
//                 onRequestClose={() => setIsModalVisible(false)}
//             >
//                 <View style={styles.modalContainer}>
//                     <View style={styles.modalContent}>
//                         <Text style={styles.modalTitle}>Select Coin Package</Text>
//                         <TouchableOpacity style={styles.coinOption} onPress={() => addCoins(10)}>
//                             <Text>10 Coins = 2.99$</Text>
//                         </TouchableOpacity>
//                         <TouchableOpacity style={styles.coinOption} onPress={() => addCoins(50)}>
//                             <Text>50 Coins = 5.99$</Text>
//                         </TouchableOpacity>
//                         <TouchableOpacity style={styles.coinOption} onPress={() => addCoins(100)}>
//                             <Text>100 Coins = 9.99$</Text>
//                         </TouchableOpacity>
//                         <TouchableOpacity style={styles.coinOption} onPress={() => addCoins(200)}>
//                             <Text>200 Coins = 17.99$</Text>
//                         </TouchableOpacity>
//                         <TouchableOpacity onPress={() => setIsModalVisible(false)}>
//                             <Text style={styles.cancelText}>Cancel</Text>
//                         </TouchableOpacity>
//                     </View>
//                 </View>
//             </Modal>

//             {/* Payment Success Modal */}
//             <Modal
//                 transparent={true}
//                 visible={isPaymentSuccessVisible}
//                 animationType="fade"
//                 onRequestClose={() => setIsPaymentSuccessVisible(false)}
//             >
//                 <View style={styles.modalContainer}>
//                     <View style={styles.modalContent}>
//                         <Text style={styles.successMessage}>Payment Successful!</Text>

//                         <View style={styles.paymentOptions}>
//                             {/* Nút Back to Wallet */}
//                             <TouchableOpacity
//                                 style={[styles.buttonOption, isBackHovered && styles.buttonOptionHover]} // Thêm hiệu ứng hover
//                                 onPressIn={() => setIsBackHovered(true)} // Khi nhấn giữ
//                                 onPressOut={() => setIsBackHovered(false)} // Khi thả ra
//                                 onPress={() => setIsPaymentSuccessVisible(false)} // Hành động nhấn
//                             >
//                                 <Text style={styles.optionText}>Back to Wallet</Text>
//                             </TouchableOpacity>

//                             {/* Nút Buy more coins */}
//                             <TouchableOpacity
//                                 style={[styles.buttonOption, isBuyHovered && styles.buttonOptionHover]} // Thêm hiệu ứng hover
//                                 onPressIn={() => setIsBuyHovered(true)} // Khi nhấn giữ
//                                 onPressOut={() => setIsBuyHovered(false)} // Khi thả ra
//                                 onPress={() => {
//                                     setIsPaymentSuccessVisible(false);
//                                     setIsModalVisible(true);
//                                 }}
//                             >
//                                 <Text style={styles.optionText}>Buy more coins</Text>
//                             </TouchableOpacity>
//                         </View>
//                     </View>
//                 </View>
//             </Modal>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 20,
//         backgroundColor: '#f7f7f7',
//         marginTop: 35,
//     },
//     balanceContainer: {
//         alignItems: 'center',
//         marginBottom: 20,
//     },
//     balanceTitle: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         color: '#333',
//     },
//     balanceAmount: {
//         fontSize: 32,
//         fontWeight: 'bold',
//         marginTop: 10,
//         color: '#2e7d32',
//     },
//     addFundsButton: {
//         backgroundColor: '#007bff',
//         padding: 12,
//         borderRadius: 8,
//         alignItems: 'center',
//         marginVertical: 20,
//     },
//     addFundsText: {
//         color: '#fff',
//         fontSize: 18,
//         fontWeight: 'bold',
//     },
//     transactionsTitle: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         marginBottom: 10,
//         color: '#333',
//     },
//     transactionsList: {
//         flex: 1,
//     },
//     transactionItem: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         padding: 12,
//         borderBottomColor: '#ccc',
//         borderBottomWidth: 1,
//     },
//     credit: {
//         color: '#2e7d32',
//         fontWeight: 'bold',
//     },
//     debit: {
//         color: '#d32f2f',
//         fontWeight: 'bold',
//     },
//     modalContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     },
//     modalContent: {
//         backgroundColor: '#fff',
//         padding: 20,
//         borderRadius: 10,
//         width: 300,
//         alignItems: 'center',
//     },
//     modalTitle: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         marginBottom: 20,
//     },
//     coinOption: {
//         padding: 15,
//         borderBottomWidth: 1,
//         borderBottomColor: '#ccc',
//         width: '100%',
//         alignItems: 'center',
//     },
//     cancelText: {
//         marginTop: 15,
//         color: '#007bff',
//     },
//     successMessage: {
//         fontSize: 20,
//         fontWeight: 'bold',
//         marginBottom: 20,
//         textAlign: 'center',
//     },
//     paymentOptions: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         width: '100%',
//     },
//     buttonOption: {
//         padding: 10,
//         backgroundColor: '#007bff',
//         borderRadius: 5,
//         marginTop: 10,
//         flex: 1,
//         marginHorizontal: 5,
//     },
//     buttonOptionHover: {
//         backgroundColor: '#0056b3', // Màu khi hover
//     },
//     optionText: {
//         color: '#fff',
//         textAlign: 'center',
//         fontWeight: 'bold',
//     },
// });

// export default WalletScreen;


import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchWalletData } from '../api/walletApi';
import { useNavigation } from '@react-navigation/native';

interface Transaction {
    id: string;
    amount: number;
    description: string;
    type: 'Deposit' | 'Withdrawal';
    createAt: string;
    status: 'Pending' | 'Success' | 'Failed';
}

const WalletScreen: React.FC = () => {
    const [balance, setBalance] = useState<number>(0);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchWalletDataFromAPI = async () => {
            try {
                const userId = await AsyncStorage.getItem('userId');
                const token = await AsyncStorage.getItem('accessToken');
                if (!userId || !token) {
                    console.log('User ID or access token is missing.');
                    return;
                }

                // Fetch balance data
                const walletData = await fetchWalletData(userId, token);
                setBalance(walletData.balance);

                // Fetch transaction history
                const response = await fetch(`https://mindmath.azurewebsites.net/api/transactions/${userId}?PageNumber=1&PageSize=10`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const transactionData: Transaction[] = await response.json();
                setTransactions(transactionData);
            } catch (error) {
                console.error('Failed to fetch wallet data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchWalletDataFromAPI();
    }, []);

    const handleTopUp = async (amount: number) => {
        try {
            const userId = await AsyncStorage.getItem('userId');
            const token = await AsyncStorage.getItem('accessToken');
            
            if (!userId || !token) {
                console.error('User credentials missing');
                return;
            }
    
            // Sửa lại URL để truyền userId qua query parameter
            const response = await fetch(`https://mindmath.azurewebsites.net/api/transactions/mobile/create?userId=${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ 
                    amount: amount,
                    description: 'Top-up'
                })
            });
    
            const data = await response.json();
            
            if (response.ok && data.paymentUrl) {
                setIsModalVisible(false);
                navigation.navigate('VNPay', { 
                    paymentUrl: data.paymentUrl 
                });
            } else {
                throw new Error(data.message || 'Failed to create payment');
            }
        } catch (error) {
            console.error('Payment creation failed:', error);
            // Có thể thêm Toast hoặc Alert để hiển thị lỗi cho người dùng
        }
    };

    const getStatusText = (status: 'Pending' | 'Success' | 'Failed') => {
        switch (status) {
            case 'Success':
                return 'Payment successful';
            case 'Failed':
                return 'Payment failed';
            case 'Pending':
                return 'Payment is being processed';
            default:
                return '';
        }
    };

    const getStatusStyles = (status: 'Pending' | 'Success' | 'Failed') => {
        switch (status) {
            case 'Success':
                return { backgroundColor: '#d4edda', color: 'green' }; // Màu nền xanh nhạt cho thành công
            case 'Failed':
                return { backgroundColor: '#f8d7da', color: 'red' }; // Màu nền đỏ nhạt cho thất bại
            case 'Pending':
                return { backgroundColor: '#fff3cd', color: 'orange' }; // Màu nền vàng nhạt cho đang chờ
            default:
                return { backgroundColor: 'transparent', color: 'black' };
        }
    };

    const renderTransaction = ({ item }: { item: Transaction }) => {
        const statusStyles = getStatusStyles(item.status);
        return (
            <View style={[styles.transactionItem, { backgroundColor: statusStyles.backgroundColor }]}>
                <Text>{new Date(item.createAt).toLocaleDateString()}</Text>
                {/* <Text>{item.description}</Text> */}
                <Text style={{ color: statusStyles.color }}>{item.amount} VND</Text>
                <Text style={{ color: statusStyles.color }}>Status: {getStatusText(item.status)}</Text>
            </View>
        );
    };

    if (loading) return <ActivityIndicator size="large" color="blue" />;

    return (
        <View style={styles.container}>
            <View style={styles.balanceContainer}>
                <Text style={styles.balanceTitle}>Your Balance</Text>
                <Text style={styles.balanceAmount}>{balance} VND</Text>
            </View>

            <TouchableOpacity style={styles.addFundsButton} onPress={() => setIsModalVisible(true)}>
                <Text style={styles.addFundsText}>Purchase Now</Text>
            </TouchableOpacity>

            <Text style={styles.transactionsTitle}>Transaction History</Text>
            <FlatList
                data={transactions}
                renderItem={renderTransaction}
                keyExtractor={(item) => item.id}
                style={styles.transactionsList}
            />

            <Modal transparent={true} visible={isModalVisible} animationType="slide" onRequestClose={() => setIsModalVisible(false)}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Select Amount</Text>
                        {[10000, 50000, 100000, 500000].map((amount) => (
                            <TouchableOpacity key={amount} style={styles.coinOption} onPress={() => handleTopUp(amount)}>
                                <Text>{amount} VND</Text>
                            </TouchableOpacity>
                        ))}
                        <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                            <Text style={styles.cancelText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#f7f7f7', marginTop: 35 },
    balanceContainer: { alignItems: 'center', marginBottom: 20 },
    balanceTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
    balanceAmount: { fontSize: 32, fontWeight: 'bold', marginTop: 10, color: '#2e7d32' },
    addFundsButton: { backgroundColor: '#007bff', padding: 12, borderRadius: 8, alignItems: 'center', marginVertical: 20 },
    addFundsText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
    transactionsTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: '#333' },
    transactionsList: { flex: 1 },
    transactionItem: { flexDirection: 'column', padding: 12, borderBottomColor: '#ccc', borderBottomWidth: 1 },
    modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' },
    modalContent: { backgroundColor: '#fff', padding: 20, borderRadius: 10, width: 300, alignItems: 'center' },
    modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 20 },
    coinOption: { padding: 15, borderBottomWidth: 1, borderBottomColor: '#ccc', width: '100%', alignItems: 'center' },
    cancelText: { marginTop: 15, color: '#007bff' },
});

export default WalletScreen;


