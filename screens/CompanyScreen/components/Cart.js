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

const MiniCart = ({ height, opacity }) => {
  return (
    <Animated.View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: colors.primaryDark,
        paddingHorizontal: 20,
        height,
        opacity,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
      }}
    >
      <Ionicons name="ios-cart" size={26} color="white" />
      <Text
        style={{
          color: colors.light,
          fontFamily: 'roboto-light',
          fontSize: 20,
        }}
      >
        CARRINHO
      </Text>
      <Ionicons
        name="ios-arrow-dropup-circle"
        size={26}
        color="white"
      />
    </Animated.View>
  );
};

export const Cart = () => {
  const { height: wHeight } = Dimensions.get('window');
  const MIN_CART_HEIGHT = 40;

  const SNAP_TOP = 0;
  const SNAP_BOTTOM = wHeight - MIN_CART_HEIGHT;

  const translationY = new Value(0);
  const velocityY = new Value(0);
  const state = new Value(State.UNDETERMINED);
  const offset = new Value(SNAP_BOTTOM);

  const gestureHandler = onGestureEvent({
    translationY,
    velocityY,
    state,
  });

  const translateY = withSpring({
    state,
    offset,
    value: translationY,
    velocity: velocityY,
    snapPoints: [SNAP_TOP, SNAP_BOTTOM],
    config,
  });

  const opacity = interpolate(translateY, {
    inputRange: [SNAP_BOTTOM - MIN_CART_HEIGHT, SNAP_BOTTOM],
    outputRange: [0, 1],
  });

  const overlayOpacity = interpolate(translateY, {
    inputRange: [
      SNAP_BOTTOM - MIN_CART_HEIGHT * 2,
      SNAP_BOTTOM - MIN_CART_HEIGHT,
    ],
    outputRange: [0, 1],
  });

  return (
    <PanGestureHandler {...gestureHandler}>
      <Animated.View
        style={{
          ...StyleSheet.absoluteFillObject,
          transform: [
            {
              translateY,
            },
          ],
        }}
      >
        <View style={{ flex: 1, backgroundColor: colors.light }}>
          <Text>CARRINHO</Text>
        </View>
        <Animated.View
          style={{
            ...StyleSheet.absoluteFillObject,
            opacity: overlayOpacity,
            backgroundColor: colors.light,
          }}
          pointerEvents="none"
        />
        <MiniCart opacity={opacity} height={MIN_CART_HEIGHT} />
      </Animated.View>
    </PanGestureHandler>
  );
};
