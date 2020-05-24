import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

import Home from '../../screens/Home';
import Company from '../../screens/Company';

export default function HomeStack() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Company" component={Company} />
    </Stack.Navigator>
  );
}
