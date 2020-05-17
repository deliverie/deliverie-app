import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import TabBarIcon from '../components/TabBarIcon';
import Home from '../screens/Home';
import Login from '../screens/Login';
import LinksScreen from '../screens/LinksScreen';
import { useDispatch, useSelector } from 'react-redux';
import AccountStack from './stacks/account';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

const userLogged = false;

export default function AuthTab({ navigation, route }) {
  const login = useSelector((state) => state.login);
  console.tron.log('Auth Tab', login);
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <BottomTab.Navigator
      tabBarOptions={{ activeTintColor: '#FB7944' }}
      initialRouteName={INITIAL_ROUTE_NAME}
    >
      <BottomTab.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Início',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="home" />
          ),
        }}
      />
      <BottomTab.Screen
        name="Packages"
        component={LinksScreen}
        options={{
          title: 'Pedidos',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="package" />
          ),
        }}
      />
      <BottomTab.Screen
        name="Settings"
        component={LinksScreen}
        options={{
          title: 'Configurações',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="settings" />
          ),
        }}
      />
      <BottomTab.Screen
        name="Account"
        component={AccountStack}
        options={{
          title: login.data
            ? login.data.user.name.split(' ').slice(0, -1).join(' ')
            : 'Conta',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="user" />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName =
    route.state?.routes[route.state.index]?.name ??
    INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Home':
      return 'Início';
    case 'Links':
      return 'Links to learn more';
  }
}
