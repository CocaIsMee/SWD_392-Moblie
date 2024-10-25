import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const PrivacyPolicyScreen = () => {
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Privacy Policy</Text>
            <Text style={styles.paragraph}>
                At MindMath, we are committed to protecting your privacy. This Privacy Policy outlines the types of information we collect and how we use, share, and protect that information.
            </Text>
            <Text style={styles.header}>Information We Collect</Text>
            <Text style={styles.paragraph}>
                We may collect personal information, including your name, email address, phone number, and any other information you provide when using our services.
            </Text>
            <Text style={styles.header}>How We Use Your Information</Text>
            <Text style={styles.paragraph}>
                We use your information to provide and improve our services, communicate with you, and personalize your experience. We may also use your information for marketing purposes, but you can opt-out at any time.
            </Text>
            <Text style={styles.header}>Information Sharing</Text>
            <Text style={styles.paragraph}>
                We do not sell or rent your personal information to third parties. We may share your information with trusted partners who assist us in operating our services, as long as those parties agree to keep your information confidential.
            </Text>
            <Text style={styles.header}>Security of Your Information</Text>
            <Text style={styles.paragraph}>
                We take the security of your personal information seriously and implement appropriate security measures to protect against unauthorized access, alteration, disclosure, or destruction.
            </Text>
            <Text style={styles.header}>Changes to This Privacy Policy</Text>
            <Text style={styles.paragraph}>
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
            </Text>
            <Text style={styles.header}>Contact Us</Text>
            <Text style={styles.paragraph}>
                If you have any questions about this Privacy Policy, please contact us at support@mindmath.com.
            </Text>
        </ScrollView>
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
        marginVertical: 10,
    },
    paragraph: {
        fontSize: 16,
        marginVertical: 5,
        lineHeight: 24,
    },
});

export default PrivacyPolicyScreen;
