import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, Alert } from 'react-native';

interface Transaction {
    id: number;
    amount: number;
    type: 'credit' | 'debit';
    date: string;
}


const WalletScreen: React.FC = () => {
    const [balance, setBalance] = useState<number>(250.00);
    const [transactions, setTransactions] = useState<Transaction[]>([
        { id: 1, amount: 50, type: 'credit', date: '2024-09-25' },
        { id: 2, amount: 30, type: 'debit', date: '2024-09-20' },
        { id: 3, amount: 120, type: 'credit', date: '2024-09-15' },
        { id: 4, amount: 25, type: 'debit', date: '2024-09-10' },
    ]);

    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [isPaymentSuccessVisible, setIsPaymentSuccessVisible] = useState<boolean>(false);
    const [isBackHovered, setIsBackHovered] = useState(false); // Trạng thái hover cho nút Back to Wallet
    const [isBuyHovered, setIsBuyHovered] = useState(false); // Trạng thái hover cho nút Buy more coins

    // Handle adding coins based on user selection
    const addCoins = (amount: number) => {
        setBalance(prevBalance => prevBalance + amount);
        const newTransaction: Transaction = {
            id: transactions.length + 1,
            amount: amount,
            type: 'credit',
            date: new Date().toISOString().slice(0, 10),
        };
        setTransactions(prevTransactions => [newTransaction, ...prevTransactions]);

        // Show payment success modal
        setIsModalVisible(false);
        setIsPaymentSuccessVisible(true);
    };

    // Render transaction item
    const renderTransaction = ({ item }: { item: Transaction }) => (
        
        <View style={styles.transactionItem}>
            <Text>{item.date}</Text>
            <Text style={item.type === 'credit' ? styles.credit : styles.debit}>
                {item.type === 'credit' ? `+ ${item.amount} Coins` : `- ${item.amount} Coins`}
            </Text>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Balance Section */}
            <View style={styles.balanceContainer}>
                <Text style={styles.balanceTitle}>Your Balance</Text>
                <Text style={styles.balanceAmount}>{balance} Coins</Text>
            </View>

            {/* Add Funds Button */}
            <TouchableOpacity style={styles.addFundsButton} onPress={() => setIsModalVisible(true)}>
                <Text style={styles.addFundsText}>Buy more coins</Text>
            </TouchableOpacity>

            {/* Transaction History */}
            <Text style={styles.transactionsTitle}>Transaction History</Text>
            <FlatList
                data={transactions}
                renderItem={renderTransaction}
                keyExtractor={item => item.id.toString()}
                style={styles.transactionsList}
            />

            {/* Modal for purchasing coins */}
            <Modal
                transparent={true}
                visible={isModalVisible}
                animationType="slide"
                onRequestClose={() => setIsModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Select Coin Package</Text>
                        <TouchableOpacity style={styles.coinOption} onPress={() => addCoins(10)}>
                            <Text>10 Coins = 2.99$</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.coinOption} onPress={() => addCoins(50)}>
                            <Text>50 Coins = 5.99$</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.coinOption} onPress={() => addCoins(100)}>
                            <Text>100 Coins = 9.99$</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.coinOption} onPress={() => addCoins(200)}>
                            <Text>200 Coins = 17.99$</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                            <Text style={styles.cancelText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Payment Success Modal */}
            <Modal
    transparent={true}
    visible={isPaymentSuccessVisible}
    animationType="fade"
    onRequestClose={() => setIsPaymentSuccessVisible(false)}
>
    <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
            <Text style={styles.successMessage}>Payment Successful!</Text>

            <View style={styles.paymentOptions}>
                {/* Nút Back to Wallet */}
                <TouchableOpacity
                    style={[styles.buttonOption, isBackHovered && styles.buttonOptionHover]} 
                    onPressIn={() => setIsBackHovered(true)} 
                    onPressOut={() => setIsBackHovered(false)} 
                    onPress={() => setIsPaymentSuccessVisible(false)} 
                >
                    <Text style={styles.optionText}>Back to Wallet</Text>
                </TouchableOpacity>

                {/* Nút Buy more coins */}
                <TouchableOpacity
                    style={[styles.buttonOption, isBuyHovered && styles.buttonOptionHover]} 
                    onPressIn={() => setIsBuyHovered(true)} 
                    onPressOut={() => setIsBuyHovered(false)} 
                    onPress={() => {
                        setIsPaymentSuccessVisible(false);
                        setIsModalVisible(true);
                    }}
                >
                    <Text style={styles.optionText}>Buy more coins</Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
</Modal>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f7f7f7',
        marginTop: 35,
    },
    balanceContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    balanceTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    balanceAmount: {
        fontSize: 32,
        fontWeight: 'bold',
        marginTop: 10,
        color: '#2e7d32',
    },
    addFundsButton: {
        backgroundColor: '#007bff',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginVertical: 20,
    },
    addFundsText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    transactionsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    transactionsList: {
        flex: 1,
    },
    transactionItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 12,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    },
    credit: {
        color: '#2e7d32',
        fontWeight: 'bold',
    },
    debit: {
        color: '#d32f2f',
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        width: 300,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    coinOption: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        width: '100%',
        alignItems: 'center',
    },
    cancelText: {
        marginTop: 15,
        color: '#007bff',
    },
    successMessage: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    paymentOptions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    // optionText: {
    //     marginHorizontal: 10,
    //     fontSize: 16,
    //     color: '#007bff',
    // },
    buttonOption: {
        backgroundColor: '#007bff',
        padding: 12,
        borderRadius: 8,
        marginHorizontal: 10,
        alignItems: 'center',
    },
    buttonOptionHover: {
        backgroundColor: '#0056b3', // Đổi màu khi nhấn giữ
        transform: [{ scale: 1.05 }], // Phóng to nhẹ khi nhấn giữ
    },
    optionText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default WalletScreen;
