import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';

import Tab from './Tab';
import AuthTab from './AuthTab';
import Loading from '../screens/Loading';

const Stack = createStackNavigator();

export default Router = ({ isLoadingComplete }) => {
  const login = useSelector((state) => state.login);
  useEffect(() => {
    console.tron.log('teste ', login, isLoadingComplete);
    if (isLoadingComplete) console.tron.log('loading data', login);
  }, []);

  return (
    <Stack.Navigator headerMode="none">
      {!isLoadingComplete ? (
        <Stack.Screen name="Loading" component={Loading} />
      ) : (isLoadingComplete && login.data !== null) || undefined ? (
        <Stack.Screen name="MainTab" component={AuthTab} />
      ) : (
        <Stack.Screen name="Tab" component={Tab} />
      )}
    </Stack.Navigator>
  );
};
