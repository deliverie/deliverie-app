import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Account from '../../screens/Account';
import Profile from '../../screens/Profile';
import Address from '../../screens/Address';

const Stack = createStackNavigator();

export default function AccountStack() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Account" component={Account} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Address" component={Address} />
    </Stack.Navigator>
  );
}
