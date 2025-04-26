// src/screens/SignupScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  TouchableOpacity,
  Image,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

export default function SignupScreen({ navigation }) {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [pass2, setPass2] = useState('');

  return (
    <View style={styles.container}>
      <Image source={require('./stylologo.png')} style={styles.logo} />

      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>To get started now!</Text>

      <TextInput
        style={styles.input}
        placeholder="Username or Email"
        placeholderTextColor={COLORS.inputText}
        value={user}
        onChangeText={setUser}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor={COLORS.inputText}
        secureTextEntry
        value={pass}
        onChangeText={setPass}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        placeholderTextColor={COLORS.inputText}
        secureTextEntry
        value={pass2}
        onChangeText={setPass2}
      />

      <Pressable style={styles.signupButton} onPress={() => {/* TODO: signup */}}>
        <Text style={styles.signupButtonText}>Sign Up</Text>
      </Pressable>

      <View style={styles.orRow}>
        <View style={styles.line} />
        <Text style={styles.orText}>Or sign up with</Text>
        <View style={styles.line} />
      </View>

      <Pressable style={styles.googleButton} onPress={() => {/* TODO: Google signup */}}>
        <FontAwesome5 name="google" size={18} style={styles.googleIcon} />
        <Text style={styles.googleText}>Sign Up with Google</Text>
      </Pressable>

      <View style={styles.switchRow}>
        <Text style={styles.switchText}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.switchLink}>Login Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const COLORS = {
  background: '#83715D',
  inputBg:    '#EAEAE9',
  inputText:  '#83715D',
  white:      '#FFFFFF',
  accent:     '#6B8A81',
  grey:       '#F5F5F5',
  light:      '#EAEAE9',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 16,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 26,
    color: COLORS.white,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.light,
    marginBottom: 24,
  },
  input: {
    width: '100%',
    backgroundColor: COLORS.inputBg,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
    color: COLORS.inputText,
  },
  signupButton: {
    width: '100%',
    paddingVertical: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.white,
    alignItems: 'center',
    marginTop: 8,
  },
  signupButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '500',
  },
  orRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.light,
  },
  orText: {
    marginHorizontal: 8,
    color: COLORS.light,
    fontSize: 12,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: COLORS.grey,
    paddingVertical: 10,
    borderRadius: 6,
    justifyContent: 'center',
  },
  googleIcon: {
    marginRight: 8,
    color: COLORS.inputText,
  },
  googleText: {
    color: COLORS.inputText,
    fontSize: 14,
  },
  switchRow: {
    flexDirection: 'row',
    marginTop: 24,
  },
  switchText: {
    color: COLORS.light,
    fontSize: 12,
  },
  switchLink: {
    color: COLORS.white,
    fontWeight: '600',
    fontSize: 12,
  },
});
