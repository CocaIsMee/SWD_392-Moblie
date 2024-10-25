// logout.ts
import AsyncStorage from '@react-native-async-storage/async-storage'; // Only if using AsyncStorage
import { useNavigation } from '@react-navigation/native';
import { AuthNavigationProp } from '../navigation/types';

export const useLogout = () => {
    const navigation = useNavigation<AuthNavigationProp>();

    const logout = async () => {
        try {
            // Clear any stored user session or tokens
            await AsyncStorage.removeItem('accessToken');

            // Navigate back to the Login screen
            navigation.navigate('Login');
        } catch (error: unknown) {
            throw new Error(error instanceof Error ? error.message : 'An unknown error occurred');
        }
    };

    return logout;
};
