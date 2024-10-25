import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { AuthNavigationProp } from '../component/navigation/types';

interface Profile {
    fullname: string;
    email: string;
    phoneNumber: string;
    avatarUrl: string | null;
}

const ProfileScreen: React.FC = () => {
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const navigation = useNavigation<AuthNavigationProp>();

    const fetchProfile = async () => {
        setLoading(true); // Set loading to true when fetching
        try {
            const id = await AsyncStorage.getItem('userId');
            const token = await AsyncStorage.getItem('accessToken');

            if (!id) {
                console.log('User ID not found in AsyncStorage');
                return;
            }

            const response = await fetch(`https://mindmath.azurewebsites.net/api/users/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setProfile({
                fullname: data.fullname,
                email: data.email,
                phoneNumber: data.phoneNumber,
                avatarUrl: data.avatar || null,
            });
        } catch (error) {
            console.error("Failed to fetch user data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Fetch the profile data when the component mounts
        fetchProfile();

        // Set up a listener to fetch the profile again when the screen comes into focus
        const unsubscribe = navigation.addListener('focus', fetchProfile);

        return unsubscribe; // Clean up the listener on unmount
    }, [navigation]);

    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="blue" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <LinearGradient colors={['#08C2FF', '#BCF2F6']} style={styles.header}>
                <Image
                    source={{ uri: profile?.avatarUrl || 'https://i.pinimg.com/564x/cd/4b/d9/cd4bd9b0ea2807611ba3a67c331bff0b.jpg' }}
                    style={styles.avatar}
                />
                <Text style={styles.profileName}>{profile?.fullname}</Text>
                <Text style={styles.profileEmail}>{profile?.phoneNumber}</Text>
                <Text style={styles.profileEmail}>{profile?.email}</Text>
            </LinearGradient>
            <View style={styles.optionsContainer}>
                <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Order')}>
                    <MaterialIcons name="history" size={20} color="blue" />
                    <Text style={styles.optionText}>Order History</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Request')}>
                    <MaterialIcons name="request-page" size={20} color="blue" />
                    <Text style={styles.optionText}>Create Request</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Rule')}>
                    <MaterialIcons name="privacy-tip" size={20} color="blue" />
                    <Text style={styles.optionText}>Privacy Policy</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Setting')}>
                    <MaterialIcons name="person" size={20} color="blue" />
                    <Text style={styles.optionText}>Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.option}>
                    <MaterialIcons name="logout" size={20} color="blue" />
                    <Text style={styles.optionText}>Log out</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // Your styles here
    },
    header: {
        alignItems: 'center',
        backgroundColor: '#BCF2F6',
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        elevation: 10,
        paddingBottom: 10,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginTop: 40,
        marginBottom: 10,
        borderWidth: 3,
        borderColor: '#006BFF',
    },
    profileName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    profileEmail: {
        fontSize: 16,
        color: '#999',
        marginVertical: 5,
    },
    optionsContainer: {
        width: '100%',
        marginTop: 30,
        padding: 20,
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    optionText: {
        fontSize: 18,
        color: '#333',
        marginLeft: 15,
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ProfileScreen;
