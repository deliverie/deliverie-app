import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Orders from '../../screens/Orders';
import OrderDetail from '../../screens/OrderDetail';

const Stack = createStackNavigator();

export default function OrdersStack() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Orders" component={Orders} />
      <Stack.Screen name="OrderDetail" component={OrderDetail} />
    </Stack.Navigator>
  );
}
