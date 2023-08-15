import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import auth from '@react-native-firebase/auth';

const buttonLabel = {
  create: 'Create user',
  signin: 'Sign In',
};

export function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState<'create' | 'signin'>('create');

  const buttonTypeCreate = type === 'create';
  const buttonTypeSignin = type === 'signin';

  async function handleLogIn() {
    try {
      if (type === 'create') {
        await auth().createUserWithEmailAndPassword(email, password);
      } else {
        await auth().signInWithEmailAndPassword(email, password);
      }
    } catch (err) {
      console.log('Error', err);
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
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

        <View style={styles.types}>
          <TouchableOpacity
            onPress={() => setType('signin')}
            style={[
              styles.buttonType,
              buttonTypeSignin ? styles.buttonTypeActive : {},
            ]}>
            <Text style={styles.buttonTypeText}>SignIn</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setType('create')}
            style={[
              styles.buttonType,
              buttonTypeCreate ? styles.buttonTypeActive : {},
            ]}>
            <Text style={styles.buttonTypeText}>Create user</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={handleLogIn}
          style={styles.button}
          activeOpacity={0.8}>
          <Text style={styles.buttonText}>{buttonLabel[type]}</Text>
        </TouchableOpacity>
      </ScrollView>
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
  types: {
    flexDirection: 'row',
    borderRadius: 8,
    marginBottom: 20,
    height: 56,
    overflow: 'hidden',
  },
  buttonType: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 12,
  },
  buttonTypeText: {
    fontWeight: 'bold',
    color: '#000',
  },
  buttonTypeActive: {
    backgroundColor: '#9fecec',
  },
});
