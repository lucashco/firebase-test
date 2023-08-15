import React, {useCallback, useEffect, useState} from 'react';

import {LoginScreen} from './src/screens/LoginScreen';
import {DashboardScreen} from './src/screens/DashboardScreen';

import auth from '@react-native-firebase/auth';

export function App() {
  const [user, setUser] = useState(null);

  const onAuthStateChanged = useCallback((user: any) => {
    setUser(user);
  }, []);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, [onAuthStateChanged]);

  return user ? <DashboardScreen /> : <LoginScreen />;
}
