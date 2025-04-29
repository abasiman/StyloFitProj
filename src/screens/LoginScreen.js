// src/screens/LoginScreen.js
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

export default function LoginScreen({ navigation }) {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');

  return (
    <View style={styles.container}>
      <Image source={require('./stylologo.png')} style={styles.logoImage} />

      <Text style={styles.title}>Welcome</Text>
      <Text style={styles.subtitle}>Glad to see you!</Text>

      <TextInput
        style={styles.input}
        placeholder="Username or Email"
        placeholderTextColor={COLORS.primary}
        value={user}
        onChangeText={setUser}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor={COLORS.primary}
        secureTextEntry
        value={pass}
        onChangeText={setPass}
      />

      <TouchableOpacity onPress={() => {/* TODO: reset */}}>
        <Text style={styles.link}>Change Password</Text>
      </TouchableOpacity>

      <Pressable style={styles.button}onPress={() => navigation.navigate('HomePage')}>
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>

      <View style={styles.orRow}>
        <View style={styles.line} />
        <Text style={styles.orText}>Or login with</Text>
        <View style={styles.line} />
      </View>

      <Pressable style={styles.socialButton} onPress={() => {/* TODO: Google login */}}>
        <FontAwesome5 name="google" size={20} style={styles.socialIcon} />
        <Text style={styles.socialText}>Login with Google</Text>
      </Pressable>

      <View style={styles.switchRow}>
        <Text style={styles.switchText}>No account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.switchLink}>Create an Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const COLORS = {
  primary:  '#83715D',
  accent:   '#6B8A81',
  light:    '#EAEAE9',
  white:    '#FFFFFF',
  grey:     '#F5F5F5',
  textDark: '#333333',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    width: 170,
    height: 170,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 32,
    color: COLORS.white,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 18,
    color: COLORS.light,
    marginBottom: 24,
  },
  input: {
    backgroundColor: COLORS.light,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
    fontSize: 16,
    color: COLORS.primary,
    width: '100%',
  },
  link: {
    alignSelf: 'flex-end',
    color: COLORS.accent,
    marginBottom: 20,
  },
  button: {
    backgroundColor: COLORS.accent,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
    width: '100%',
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '600',
  },
  orRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: 16,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.light,
  },
  orText: {
    marginHorizontal: 8,
    color: COLORS.light,
    fontSize: 14,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.grey,
    paddingVertical: 12,
    borderRadius: 6,
    width: '100%',
    justifyContent: 'center',
    marginBottom: 24,
  },
  socialIcon: {
    marginRight: 8,
    color: COLORS.textDark,
  },
  socialText: {
    fontSize: 16,
    color: COLORS.textDark,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  switchText: {
    color: COLORS.light,
  },
  switchLink: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
});
