import React, { useState } from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { onScrollEvent, useValue } from 'react-native-redash';
import { Card } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';

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

const Company = ({ navigation, route: { params } }) => {
  navigation.setOptions({ tabBarVisible: false });

  const { item } = params;
  console.tron.log(item);
  if (!item) {
    return null;
  }

  const [cart, setCart] = useState(false);
  const IMAGE_HEIGHT = hpd(32);
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
      {item?.photo ? (
        <Animated.View
          style={{
            position: 'absolute',
            width: wWidth,
            resizeMode: 'cover',
            left: 0,
            height,
            top,
            zIndex: 9998,
          }}
        >
          <SafeAreaView
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              margin: 20,
              width: Dimensions.get('window').width - 40,
              zIndex: 9999999,
              position: 'absolute',
              borderWidht: 1,
              flex: 1,
              alignSelf: 'stretch',
            }}
          >
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons
                name="md-arrow-back"
                size={23}
                color="white"
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="md-share" size={23} color="white" />
            </TouchableOpacity>
          </SafeAreaView>

          <ImageBackground
            // source={{ uri: `http://206.189.219.178/${item.photo}` }}
            source={{ uri: `https://picsum.photos/536/354` }}
            style={{
              flex: 1,
              width: null,
              height: null,
              justifyContent: 'flex-end',
              padding: 20,
            }}
          >
            <View style={{ zIndex: 9999999999 }}>
              <View
                style={{
                  width: 90,
                  height: 90,
                  backgroundColor: 'white',
                  marginBottom: 10,
                  borderRadius: 5,
                }}
              >
                <Image
                  source={{
                    uri:
                      'https://static-images.ifood.com.br/image/upload/f_auto,t_thumbnail/logosgde/202004151324_d24644a5-066b-4292-8384-5cf79c9e355f.jpg',
                  }}
                  style={{ width: 90, height: 90, borderRadius: 5 }}
                  resizeMode="contain"
                />
              </View>

              <Text
                style={{
                  color: 'white',
                  fontSize: 17,
                  fontWeight: 'bold',
                  textShadowColor: 'rgba(0, 0, 0, 0.75)',
                  textShadowOffset: { width: 0, height: 0 },
                  textShadowRadius: 2,
                }}
              >
                {item?.fantasy_name}
              </Text>
              <Text
                style={{
                  color: 'white',
                  fontSize: 16,

                  textShadowColor: 'rgba(0, 0, 0, 0.75)',
                  textShadowOffset: { width: 0, height: 0 },
                  textShadowRadius: 2,
                }}
              >
                Rua Arlindo Cardoso Vieira, 116, Itaí/SP
              </Text>
              <View
                style={{
                  flex: 1,
                  padding: 3,
                  borderRadius: 4,
                  marginTop: 8,
                  height: 30,
                  flexDirection: 'row',
                  width: wWidth - 40,
                  justifyContent: 'space-between',
                }}
              >
                <View
                  style={{
                    backgroundColor: '#8bc34a',
                    borderRadius: 4,
                    padding: 4,
                  }}
                >
                  <Text style={{ fontSize: 12 }}>Aberto</Text>
                </View>
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

            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.8)']}
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                ...StyleSheet.absoluteFill,
                zIndex: 9999,
              }}
            />
          </ImageBackground>
        </Animated.View>
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
        <SafeAreaView>
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
        </SafeAreaView>
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

export default Company;
