import React, {useCallback, useEffect, useState} from 'react';
import {LoginScreen} from './src/screens/LoginScreen';
import {DashboardScreen} from './src/screens/DashboardScreen';

import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

export function App() {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  const onAuthStateChanged = useCallback(
    (userInfo: FirebaseAuthTypes.User | null) => {
      setUser(userInfo);
    },
    [],
  );

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, [onAuthStateChanged]);

  return user ? <DashboardScreen /> : <LoginScreen />;
}
