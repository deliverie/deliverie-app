import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

import Account from '../../screens/Account';
import Profile from '../../screens/Profile';

export default function AccountStack() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Account" component={Account} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
}
