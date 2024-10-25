import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';

// Updated mock order data
const mockOrderData = [
    {
        id: 1,
        title: "Algebra Workbook",
        description: "A comprehensive workbook filled with exercises to master algebra concepts.",
        image: "https://i.pinimg.com/564x/0f/0f/72/0f0f725ad5985516a180f1b6e02b36e0.jpg", // Replace with a real image URL
        price: "$15.99",
    },
    {
        id: 2,
        title: "Geometry Set",
        description: "A complete geometry set with protractor, compass, and ruler for accurate measurements.",
        image: "https://i.pinimg.com/564x/0f/0f/72/0f0f725ad5985516a180f1b6e02b36e0.jpg", // Replace with a real image URL
        price: "$12.99",
    },
    {
        id: 3,
        title: "Calculus Textbook",
        description: "An in-depth textbook covering calculus fundamentals and advanced topics.",
        image: "https://i.pinimg.com/564x/0f/0f/72/0f0f725ad5985516a180f1b6e02b36e0.jpg", // Replace with a real image URL
        price: "$29.99",
    },
    {
        id: 4,
        title: "Statistics Reference Guide",
        description: "A handy reference guide that explains key statistical concepts and formulas.",
        image: "https://i.pinimg.com/564x/0f/0f/72/0f0f725ad5985516a180f1b6e02b36e0.jpg", // Replace with a real image URL
        price: "$18.99",
    },
    {
        id: 5,
        title: "Math Puzzles Book",
        description: "A fun collection of math puzzles that challenge and enhance problem-solving skills.",
        image: "https://i.pinimg.com/564x/0f/0f/72/0f0f725ad5985516a180f1b6e02b36e0.jpg", // Replace with a real image URL
        price: "$9.99",
    },
    {
        id: 6,
        title: "Graphing Calculator",
        description: "A powerful graphing calculator that simplifies complex equations and functions.",
        image: "https://i.pinimg.com/564x/0f/0f/72/0f0f725ad5985516a180f1b6e02b36e0.jpg", // Replace with a real image URL
        price: "$89.99",
    },
    {
        id: 7,
        title: "Math Flashcards",
        description: "A set of flashcards covering essential math concepts for quick learning and revision.",
        image: "https://i.pinimg.com/564x/0f/0f/72/0f0f725ad5985516a180f1b6e02b36e0.jpg", // Replace with a real image URL
        price: "$7.99",
    },
    {
        id: 8,
        title: "Trigonometry Handbook",
        description: "A comprehensive handbook for mastering trigonometric identities and equations.",
        image: "https://i.pinimg.com/564x/0f/0f/72/0f0f725ad5985516a180f1b6e02b36e0.jpg", // Replace with a real image URL
        price: "$22.99",
    },
];

const OrderHistoryScreen = () => {
    const renderItem = ({ item }: { item: { title: string; description: string; image: string; price: string } }) => (
        <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.cardContent}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
                <Text style={styles.price}>{item.price}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Order History</Text>
            <FlatList
                data={mockOrderData}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.list}
            />
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
    card: {
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    image: {
        width: '100%',
        height: 150,
        borderRadius: 10,
        marginBottom: 10,
    },
    cardContent: {
        paddingVertical: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 14,
        color: '#555',
    },
    price: {
        fontSize: 16,
        color: '#2f95dc',
        fontWeight: 'bold',
        marginTop: 5,
    },
    list: {
        paddingBottom: 20,
    },
});

export default OrderHistoryScreen;
