import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Sample mock data related to math questions
const mockMathData = [
    {
        id: 1,
        question: "What is the Pythagorean theorem?",
        answer: "In a right triangle, the square of the hypotenuse is equal to the sum of the squares of the other two sides.",
        subject: "Geometry",
    },
    {
        id: 2,
        question: "What is the derivative of x^2?",
        answer: "The derivative of x^2 is 2x.",
        subject: "Calculus",
    },
    {
        id: 3,
        question: "What is the integral of 1/x?",
        answer: "The integral of 1/x is ln|x| + C.",
        subject: "Calculus",
    },
    {
        id: 4,
        question: "What is the quadratic formula?",
        answer: "The quadratic formula is x = (-b ± √(b² - 4ac)) / (2a).",
        subject: "Algebra",
    },
    {
        id: 5,
        question: "What is the area of a circle?",
        answer: "The area of a circle is A = πr².",
        subject: "Geometry",
    },
];

const CreateRequestHistoryScreen = () => {
    const [requestHistory, setRequestHistory] = useState<typeof mockMathData>(mockMathData);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Simulate loading delay
        const fetchRequestHistory = async () => {
            try {
                const historyData = await AsyncStorage.getItem('requestHistory');
                if (historyData) {
                    setRequestHistory(JSON.parse(historyData));
                } else {
                    setRequestHistory(mockMathData); // Load mock data if no history found
                }
            } catch (err) {
                console.error('Failed to fetch request history:', err);
                setError('Failed to load request history.');
            } finally {
                setLoading(false);
            }
        };

        fetchRequestHistory();
    }, []);

    const renderItem = ({ item }: { item: { question: string; answer: string; subject: string } }) => (
        <View style={styles.itemContainer}>
            <Text style={styles.itemText}>Q: {item.question}</Text>
            <Text style={styles.itemText}>A: {item.answer}</Text>
            <Text style={styles.subjectText}>Subject: {item.subject}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#2f95dc" />
            ) : (
                <>
                    <Text style={styles.header}>Request History</Text>
                    {error && <Text style={styles.errorText}>{error}</Text>}
                    <FlatList
                        data={requestHistory}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id.toString()} // Use item id for uniqueness
                        contentContainerStyle={styles.list}
                    />
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#ffffff',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    itemContainer: {
        padding: 15,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        marginBottom: 10,
        backgroundColor: '#f9f9f9',
    },
    itemText: {
        fontSize: 16,
    },
    subjectText: {
        fontSize: 14,
        fontStyle: 'italic',
        color: '#555',
    },
    list: {
        paddingBottom: 20,
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
});

export default CreateRequestHistoryScreen;
