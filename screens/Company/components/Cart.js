import React from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import Animated, {
  interpolate,
  Value,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import {
  State,
  PanGestureHandler,
} from 'react-native-gesture-handler';
import { withSpring, onGestureEvent } from 'react-native-redash';
import { useSelector } from 'react-redux';
import { colors } from '../../../styles';
import { monetize } from '../../../utils';

const config = {
  damping: 15,
  mass: 1,
  stiffness: 150,
  overshootClamping: false,
  restSpeedThreshold: 0.1,
  restDisplacementThreshold: 0.1,
};

export const Cart = () => {
  const { cart } = useSelector(state => state.cart);

  const getAllPrice = () => {
    const cartMap = cart.map(e => {
      const findPrice = Object.values(e.selectedAttr).find(
        f => f.prices.price,
      );
      return findPrice.prices.price * e.qty;
    });
    const soma = cartMap.reduce((ac, cv) => ac + cv);
    return monetize(soma);
  };

  return (
    <View
      style={{
        padding: 10,
        backgroundColor: 'rgba(34,60,120,1)',
        marginHorizontal: 10,
        borderRadius: 4,
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
      }}
    >
      <Ionicons name="md-cart" size={24} color="white" />
      <View>
        {cart.length === 0 ? (
          <Text
            style={{
              color: 'white',
              marginLeft: 5,
              fontSize: 17,
              fontWeight: 'bold',
            }}
          >
            Seu carrinho esta vázio :(
          </Text>
        ) : (
          <Text
            style={{
              color: 'white',
              marginLeft: 5,
              fontSize: 16,
              fontWeight: 'roboto-light',
            }}
          >
            {cart.length} itens no valor de {getAllPrice()}
          </Text>
        )}
      </View>
    </View>
  );
};
