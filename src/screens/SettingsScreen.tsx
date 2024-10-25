import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, ActivityIndicator, Image, Alert } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

type TabParamList = {
    EditProfile: undefined;
    ChangePassword: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const ICONS: { [key in keyof TabParamList]: keyof typeof MaterialIcons.glyphMap } = {
    EditProfile: 'person',
    ChangePassword: 'password',
};

// Edit Profile Component
const EditProfile = () => {
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [image, setImage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (permissionResult.status !== 'granted') {
                Alert.alert("Permission to access camera roll is required!");
            }
        })();
    }, []);

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const updateUserProfile = async () => {
        setLoading(true);
        setError(null);

        try {
            const id = await AsyncStorage.getItem('userId');
            const token = await AsyncStorage.getItem('accessToken');

            if (!id || !token) {
                console.log('User ID or Access Token not found in AsyncStorage');
                setError('User ID or access token not found. Please log in again.');
                return;
            }

            // Check if input values are provided
            if (!fullname || !email || !phoneNumber) {
                console.log('Input values are not set');
                setError('Please fill in all fields before submitting.');
                return;
            }

            // Create FormData to send the image and other fields
            const formData = new FormData();

            // Check if an image is selected
            if (image) {
                formData.append('File', {
                    uri: image, // Ensure this is the correct URI from the image picker
                    type: 'image/jpeg', // Adjust based on your actual image type
                    name: 'profile.jpg', // Name for the file
                } as unknown as Blob); // Type assertion to ensure TypeScript recognizes this
            }

            // Append other fields
            formData.append('Email', email);
            formData.append('Fullname', fullname);
            formData.append('PhoneNumber', phoneNumber);

            const response = await fetch(`https://mindmath.azurewebsites.net/api/users/${id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });

            // Check if response is ok
            if (!response.ok) {
                const errorText = await response.text();
                console.error('Failed to update profile. Response:', errorText);
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            console.log("Profile updated successfully.");
            alert('Profile updated successfully!');
        } catch (error) {
            console.error("Failed to update profile:", error);
            setError('Failed to update profile. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Button title="Pick an image from camera roll" onPress={pickImage} />
            {image && <Image source={{ uri: image }} style={styles.image} />}
            <TextInput
                style={styles.input}
                placeholder="Full Name"
                value={fullname}
                onChangeText={setFullname}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Phone Number"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
            />
            {loading ? (
                <ActivityIndicator size="large" color="#2f95dc" />
            ) : (
                <Button title="Save Profile" onPress={updateUserProfile} disabled={loading} />
            )}
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};

// Change Password Component
const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const changePassword = async () => {
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const id = await AsyncStorage.getItem('userId');
            const token = await AsyncStorage.getItem('accessToken');

            if (!id || !token) {
                console.log('User ID or Access Token not found in AsyncStorage');
                setError('User ID or access token not found. Please log in again.');
                return;
            }

            if (!oldPassword || !newPassword) {
                console.log('Input values are not set');
                setError('Please fill in all fields before submitting.');
                return;
            }

            const response = await fetch(`https://mindmath.azurewebsites.net/api/users/${id}/password`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    oldPassword,
                    newPassword,
                }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Failed to change password. Response:', errorText);
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            console.log("Password changed successfully.");
            setSuccess('Password changed successfully!');
            setOldPassword('');
            setNewPassword('');
        } catch (error) {
            console.error("Failed to change password:", error);
            setError('Failed to change password. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Old Password"
                value={oldPassword}
                onChangeText={setOldPassword}
                secureTextEntry={true}
            />
            <TextInput
                style={styles.input}
                placeholder="New Password"
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry={true}
            />
            {loading ? (
                <ActivityIndicator size="large" color="#2f95dc" />
            ) : (
                <Button title="Change Password" onPress={changePassword} disabled={loading} />
            )}
            {error && <Text style={styles.errorText}>{error}</Text>}
            {success && <Text style={styles.successText}>{success}</Text>}
        </View>
    );
};

const SettingsScreen = () => {
    return (
        <Tab.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
                const iconName = ICONS[route.name];
                return <MaterialIcons name={iconName} color={color} size={size} />;
            },
            tabBarActiveTintColor: '#2f95dc',
            tabBarInactiveTintColor: '#8e8e93',
            tabBarStyle: styles.tabBar,
            headerShown: false,
        })}>
            <Tab.Screen name="EditProfile" component={EditProfile} options={{ title: 'Edit Profile' }} />
            <Tab.Screen name="ChangePassword" component={ChangePassword} options={{ title: 'Change Password' }} />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    tabBar: {
        paddingBottom: 5,
        height: 50,
    },
    input: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        paddingHorizontal: 10,
        marginVertical: 10,
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 10,
        marginVertical: 10,
    },
    errorText: {
        color: 'red',
        marginTop: 10,
    },
    successText: {
        color: 'green',
        marginTop: 10,
    },
});

export default SettingsScreen;
