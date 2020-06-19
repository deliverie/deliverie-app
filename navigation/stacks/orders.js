import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Orders from '../../screens/Orders';
import OrderDetail from '../../screens/OrderDetail';

const Stack = createStackNavigator();

export default function OrdersStack({
  navigation,
  route: { params },
}) {
  React.useEffect(() => {
    if (params) {
      const { screen, options } = params;
      if (screen) {
        console.tron.log(`navega`, screen, options);
        navigation.navigate(screen, options);
      }
    }
  }, [params]);

  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Orders" component={Orders} />
      <Stack.Screen name="OrderDetails" component={OrderDetail} />
    </Stack.Navigator>
  );
}
