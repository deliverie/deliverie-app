import React, { useState } from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { onScrollEvent, useValue } from 'react-native-redash';
import { Card } from 'react-native-paper';
import Animated, {
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import { hpd } from '../../utils/scalling';
import { colors } from '../../styles';

import { Badge } from './components/Badge';
import { FeaturedProducts } from './components/FeaturedProducts';
import { Cart } from './components/Cart';
import { Tabs } from './components/Tabs';
import { API_URL } from '../../store/crud';

const CompanyScreen = ({ navigation, route: { params } }) => {
  const { item } = params;
  if (!item) {
    return null;
  }

  const [cart, setCart] = useState(false);
  const IMAGE_HEIGHT = hpd(25);
  const MIN_HEADER_HEIGHT = 80;
  const { width: wWidth } = Dimensions.get('window');
  const [showInfo, setShowInfo] = useState(false);

  const y = useValue(0);

  const height = interpolate(y, {
    inputRange: [-100, 0],
    outputRange: [IMAGE_HEIGHT + 100, IMAGE_HEIGHT],
    extrapolateRight: Extrapolate.CLAMP,
  });

  const top = interpolate(y, {
    inputRange: [0, 100],
    outputRange: [0, -100],
    extrapolateLeft: Extrapolate.CLAMP,
  });

  const translateY = interpolate(y, {
    inputRange: [0, IMAGE_HEIGHT],
    outputRange: [IMAGE_HEIGHT, 0],
    extrapolateRight: Extrapolate.CLAMP,
  });

  const translateX = interpolate(y, {
    inputRange: [0, IMAGE_HEIGHT],
    outputRange: [0, 40],
    extrapolate: Extrapolate.CLAMP,
  });

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 1,
          paddingVertical: 5,
          paddingHorizontal: 15,
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="ios-arrow-round-back"
            size={40}
            color="white"
          />
        </TouchableOpacity>
      </View>
      {item?.photo ? (
        <Animated.Image
          source={{ uri: `${API_URL}${item.photo}` }}
          style={{
            position: 'absolute',
            width: wWidth,
            resizeMode: 'cover',
            left: 0,
            height,
            top,
          }}
        />
      ) : (
        <Animated.Image
          source={{ uri: 'https://picsum.photos/536/354' }}
          style={{
            position: 'absolute',
            width: wWidth,
            resizeMode: 'cover',
            left: 0,
            height,
            top,
          }}
        />
      )}
      <Animated.ScrollView
        style={StyleSheet.absoluteFill}
        scrollEventThrottle={1}
        onScroll={onScrollEvent({ y })}
      >
        <View
          style={{
            height: IMAGE_HEIGHT,
            marginBottom: MIN_HEADER_HEIGHT,
          }}
        />
        <View
          style={{
            paddingBottom: 20,
            paddingHorizontal: 5,
            marginTop: 20,
          }}
        >
          <FeaturedProducts />
          <View style={{ marginTop: 10 }}>
            {[...Array(15).keys()].map(e => (
              <TouchableOpacity
                style={{ marginBottom: 5 }}
                key={e}
                onPress={() => setCart(true)}
              >
                <Card>
                  <View
                    style={{
                      flexDirection: 'row',
                      padding: 15,
                    }}
                  >
                    <Image
                      source={{
                        uri:
                          'https://www.itambe.com.br/portal/Images/Produto/110119leiteuhtsemidesnatado1lt_medium.png',
                      }}
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 10,
                      }}
                    />
                    <View style={{ paddingLeft: 10 }}>
                      <Text
                        style={{
                          fontFamily: 'roboto',
                          color: colors.primary,
                        }}
                      >
                        PRODUTO {e}
                      </Text>
                      <Text style={{ fontFamily: 'roboto-light' }}>
                        descrição do produto
                      </Text>
                    </View>
                    <View style={{ flex: 1 }} />
                    <View
                      style={{
                        padding: 10,
                        borderRadius: 10,
                      }}
                    >
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                          flex: 1,
                        }}
                      >
                        <Text
                          style={{
                            color: colors.primary,
                            fontFamily: 'roboto-bold',
                          }}
                        >
                          R$ 10,00
                        </Text>
                      </View>
                    </View>
                  </View>
                </Card>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Animated.ScrollView>
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          transform: [{ translateY }],
        }}
      >
        <Animated.View
          style={{
            backgroundColor: colors.primary,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              padding: 10,
            }}
          >
            <Animated.Text
              style={{
                flex: 9,
                fontSize: 20,
                color: colors.white,
                transform: [{ translateX }],
              }}
            >
              {item?.fantasy_name}
            </Animated.Text>
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                onPress={() => setShowInfo(!showInfo)}
              >
                <Ionicons
                  name="ios-arrow-dropdown-circle"
                  size={24}
                  color="white"
                />
              </TouchableOpacity>
            </View>
          </View>
          {showInfo && (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                paddingHorizontal: 10,
                paddingBottom: 15,
              }}
            >
              <Badge title="VALOR MINIMO" desc="R$ 10,00" />
              <Badge title="TEMPO DE ENTREGA" desc="40-60min" />
              <Badge title="TEMPO DE ENTREGA" desc="40-60min" />
            </View>
          )}
          <Tabs />
        </Animated.View>
      </Animated.View>
      {cart && <Cart />}
    </View>
  );
};

export default CompanyScreen;
