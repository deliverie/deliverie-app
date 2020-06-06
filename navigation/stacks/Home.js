import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

import Home from '../../screens/Home';
import Company from '../../screens/Company';
import Address from '../../screens/Address';
import Zipcode from '../../screens/Address/Zipcode';
import Cart from '../../screens/Cart';

export default function HomeStack() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Company" component={Company} />
      <Stack.Screen name="Address" component={Address} />
      <Stack.Screen name="Zipcode" component={Zipcode} />
      <Stack.Screen name="Cart" component={Cart} />
    </Stack.Navigator>
  );
}
