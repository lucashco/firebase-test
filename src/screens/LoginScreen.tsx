import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import auth from '@react-native-firebase/auth';

export function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogIn() {
    try {
      await auth().createUserWithEmailAndPassword(email, password);
    } catch (err) {
      console.log('Error', err);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hi!</Text>
      <Text style={styles.subtitle}>
        Enter your email and password to login!
      </Text>

      <TextInput
        style={styles.input}
        keyboardType="email-address"
        placeholder="Enter your email address"
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        secureTextEntry
        placeholder="Enter your password"
        onChangeText={setPassword}
      />

      <TouchableOpacity
        onPress={handleLogIn}
        style={styles.button}
        activeOpacity={0.8}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f2f2f4',
  },
  title: {
    fontSize: 32,
    color: '#000',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#000',
    marginBottom: 40,
  },
  input: {
    backgroundColor: '#fff',
    fontSize: 16,
    paddingHorizontal: 12,
    paddingVertical: 16,
    width: '100%',
    borderRadius: 8,
    marginBottom: 16,
  },
  button: {
    height: 56,
    backgroundColor: '#074C4E',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  },
});
