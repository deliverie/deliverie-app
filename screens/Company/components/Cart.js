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
import { colors } from '../../../styles';

const config = {
  damping: 15,
  mass: 1,
  stiffness: 150,
  overshootClamping: false,
  restSpeedThreshold: 0.1,
  restDisplacementThreshold: 0.1,
};

export const Cart = () => {
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
      }}
    >
      <Ionicons name="md-cart" size={24} color="white" />
      <View>
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
      </View>
    </View>
  );
};
