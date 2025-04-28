// src/screens/UserScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function UsersScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is the User Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
