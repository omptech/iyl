import { View, Text, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useAuth } from './hooks/useAuth';

const THEME = {
  primary: '#6C63FF',
  secondary: '#FF6B6B',
  accent: '#4ECDC4',
  background: '#F7F7FF',
  text: '#2D3436',
};

export default function SignUpScreen() {
  const router = useRouter();
  const { signUp, loading, error } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long');
      return;
    }

    try {
      await signUp(email, password);
      // TODO: Save user's name to Firestore
      router.push('/(tabs)');
    } catch (err) {
      Alert.alert('Sign Up Error', error || 'Failed to create account');
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <StatusBar style="dark" />
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <FontAwesome5 name="arrow-left" size={20} color={THEME.text} />
          </TouchableOpacity>
          <Text style={styles.logo}>IYL</Text>
          <Text style={styles.subtitle}>Create Account</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <FontAwesome5 name="user" size={18} color="#94A3B8" style={styles.inputIcon} />
            <TextInput
              placeholder="Full Name"
              style={styles.input}
              placeholderTextColor="#94A3B8"
              autoCapitalize="words"
              value={name}
              onChangeText={setName}
            />
          </View>

          <View style={styles.inputContainer}>
            <FontAwesome5 name="envelope" size={18} color="#94A3B8" style={styles.inputIcon} />
            <TextInput
              placeholder="Email"
              style={styles.input}
              placeholderTextColor="#94A3B8"
              autoCapitalize="none"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.inputContainer}>
            <FontAwesome5 name="lock" size={18} color="#94A3B8" style={styles.inputIcon} />
            <TextInput
              placeholder="Password"
              style={styles.input}
              placeholderTextColor="#94A3B8"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>

          <View style={styles.inputContainer}>
            <FontAwesome5 name="lock" size={18} color="#94A3B8" style={styles.inputIcon} />
            <TextInput
              placeholder="Confirm Password"
              style={styles.input}
              placeholderTextColor="#94A3B8"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
          </View>

          <TouchableOpacity 
            style={[styles.signUpButton, loading && styles.disabledButton]} 
            onPress={handleSignUp}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.signUpButtonText}>Create Account</Text>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.signInText}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  backButton: {
    position: 'absolute',
    left: 0,
    top: 0,
    padding: 8,
  },
  logo: {
    fontSize: 48,
    fontWeight: 'bold',
    color: THEME.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 24,
    color: THEME.text,
    fontWeight: '600',
  },
  form: {
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    marginBottom: 16,
    paddingHorizontal: 20,
    height: 60,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: THEME.text,
  },
  signUpButton: {
    backgroundColor: THEME.primary,
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: THEME.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
    marginTop: 16,
  },
  signUpButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto',
    paddingTop: 20,
  },
  footerText: {
    color: '#64748B',
    fontSize: 14,
  },
  signInText: {
    color: THEME.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  disabledButton: {
    opacity: 0.7,
  },
}); 