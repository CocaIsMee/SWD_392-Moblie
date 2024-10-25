import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthNavigationProp } from '../component/navigation/types';
import { host_main, API_REGISTER } from '../api/api';

interface Props {
    onRegisterSuccess: () => void;
}

const RegisterScreen: React.FC<Props> = ({ onRegisterSuccess }) => {
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [userName, setUserName] = useState('');
    const [loading, setLoading] = useState(false);

    const [fullnameError, setFullnameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [phoneNumberError, setPhoneNumberError] = useState('');
    const [userNameError, setUserNameError] = useState('');

    const navigation = useNavigation<AuthNavigationProp>();

    const validateFullname = () => {
        if (fullname.trim() === '') {
            setFullnameError('Full name is required');
            return false;
        }
        setFullnameError('');
        return true;
    };

    const validateEmail = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email.trim() === '') {
            setEmailError('Email is required');
            return false;
        } else if (!emailRegex.test(email)) {
            setEmailError('Please enter a valid email address');
            return false;
        }
        setEmailError('');
        return true;
    };

    const validatePassword = () => {
        if (password.length < 6) {
            setPasswordError('Password must be at least 6 characters');
            return false;
        }
        setPasswordError('');
        return true;
    };

    const validatePhoneNumber = () => {
        const phoneRegex = /^[0-9]{10,15}$/;
        if (!phoneRegex.test(phoneNumber)) {
            setPhoneNumberError('Please enter a valid phone number');
            return false;
        }
        setPhoneNumberError('');
        return true;
    };

    const validateUserName = () => {
        if (userName.trim() === '') {
            setUserNameError('Username is required');
            return false;
        }
        setUserNameError('');
        return true;
    };

    const handleRegister = async () => {
        const isFullnameValid = validateFullname();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        const isPhoneNumberValid = validatePhoneNumber();
        const isUserNameValid = validateUserName();

        if (!isFullnameValid || !isEmailValid || !isPasswordValid || !isPhoneNumberValid || !isUserNameValid) {
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`${host_main}${API_REGISTER}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fullname,
                    email,
                    password,
                    phoneNumber,
                    userName,
                }),
            });

            if (response.status === 201) {
                onRegisterSuccess();
                navigation.navigate('Login');
            } else {
                throw new Error(`Registration failed with status ${response.status}`);
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                Alert.alert('Registration Failed', error.message || 'An error occurred');
            } else {
                Alert.alert('Registration Failed', 'An unknown error occurred');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            <View style={styles.container}>
                <Text style={styles.title}>Create an Account</Text>
                <Text style={styles.subtitle}>Register to get started</Text>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Full Name"
                        value={fullname}
                        onChangeText={setFullname}
                        onBlur={validateFullname}
                        placeholderTextColor="#888"
                    />
                    {fullnameError ? <Text style={styles.errorText}>{fullnameError}</Text> : null}
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Username"
                        value={userName}
                        onChangeText={setUserName}
                        onBlur={validateUserName}
                        placeholderTextColor="#888"
                    />
                    {userNameError ? <Text style={styles.errorText}>{userNameError}</Text> : null}
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                        onBlur={validateEmail}
                        placeholderTextColor="#888"
                        keyboardType="email-address"
                    />
                    {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        onBlur={validatePassword}
                        secureTextEntry
                        placeholderTextColor="#888"
                    />
                    {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Phone Number"
                        value={phoneNumber}
                        onChangeText={setPhoneNumber}
                        onBlur={validatePhoneNumber}
                        placeholderTextColor="#888"
                        keyboardType="phone-pad"
                    />
                    {phoneNumberError ? <Text style={styles.errorText}>{phoneNumberError}</Text> : null}
                </View>


                <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
                    <Text style={styles.buttonText}>{loading ? 'Registering...' : 'Register'}</Text>
                </TouchableOpacity>

                <Text style={styles.footerText}>
                    Already have an account?{' '}
                    <Text
                        style={styles.loginText}
                        onPress={() => navigation.navigate('Login')}
                    >
                        Log In
                    </Text>
                </Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollViewContainer: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: '600',
        color: '#333',
        marginBottom: 10,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 30,
        textAlign: 'center',
    },
    inputContainer: {
        width: '100%',
        marginBottom: 15,
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        backgroundColor: '#fff',
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: 5,
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: '#28a745',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '500',
    },
    footerText: {
        fontSize: 14,
        color: '#666',
        marginTop: 20,
    },
    loginText: {
        color: '#007BFF',
        fontWeight: '500',
    },
});

export default RegisterScreen;
