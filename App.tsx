import React, {useEffect, useState} from 'react';

import {LoginScreen} from './src/screens/LoginScreen';
import {DashboardScreen} from './src/screens/DashboardScreen';

export function App() {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    console.log('oi');
  }, []);

  return isLogged ? <DashboardScreen /> : <LoginScreen />;
}
