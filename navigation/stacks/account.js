import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

import Account from '../../screens/Account';

export default function AccountStack() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="AccountStack" component={Account} />
    </Stack.Navigator>
  );
}
