import React, { useState } from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
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
import { setModal } from 'react-native-alert-utils';
import { SimpleLayout } from 'react-native-alert-utils/Layout';
import { LinearGradient } from 'expo-linear-gradient';
import { hpd } from '../utils/scalling';
import { colors } from '../styles';

// import { Container } from './styles';

const CompanyScreen = ({ navigation }) => {
  const IMAGE_HEIGHT = hpd(25);
  const MIN_HEADER_HEIGHT = 80;
  const { width: wWidth } = Dimensions.get('window');
  const [showInfo, setShowInfo] = useState(false);

  const Badge = ({ title, desc }) => (
    <View
      style={{
        backgroundColor: colors.primaryLight,
        width: 100,
        height: 60,
        borderRadius: 10,
      }}
    >
      <View style={{}}>
        <Text
          style={{
            color: 'white',
            fontFamily: 'roboto-light',
            textAlign: 'center',
          }}
        >
          {title}
        </Text>
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
        }}
      >
        <Text
          style={{
            color: 'white',
            fontFamily: 'roboto-bold',
          }}
        >
          {desc}
        </Text>
      </View>
    </View>
  );
  const Tabs = () => {
    const [tab, setTab] = useState(0);
    return (
      <View
        style={{
          backgroundColor: colors.light,
        }}
      >
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
          }}
        >
          {[...Array(6).keys()].map(e => (
            <TouchableOpacity key={e} onPress={() => setTab(e)}>
              <View
                style={{
                  padding: 10,
                  backgroundColor:
                    e === tab ? colors.primary : colors.primaryLight,
                  borderBottomLeftRadius: e === tab ? 5 : 0,
                  borderBottomRightRadius: e === tab ? 5 : 0,
                }}
              >
                <Text
                  style={{
                    color: e === tab ? colors.white : colors.lighter,
                  }}
                >
                  CATEGORIA{' '}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  };

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
    extrapolateRight: Extrapolate.CLAMP,
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
            marginTop: 5,
          }}
        >
          <Text
            style={{
              fontFamily: 'roboto-bold',
              fontSize: 18,
              color: colors.dark,
              marginLeft: 5,
            }}
          >
            PRODUTOS EM DESTAQUE
          </Text>
          <View
            style={{
              paddingBottom: 10,
              borderColor: colors.regular,
              borderBottomWidth: 0.5,
            }}
          >
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              {[...Array(5).keys()].map(e => (
                <View
                  key={e}
                  style={{
                    backgroundColor: colors.primary,
                    borderRadius: 10,
                    padding: 10,
                    alignItems: 'center',
                    marginRight: 5,
                  }}
                >
                  <Image
                    source={{
                      uri:
                        'https://www.itambe.com.br/portal/Images/Produto/110119leiteuhtsemidesnatado1lt_medium.png',
                    }}
                    style={{
                      width: 100,
                      height: 100,
                      borderRadius: 10,
                    }}
                  />
                  <View
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                    }}
                  />
                  <Text
                    style={{
                      fontFamily: 'roboto-light',
                      color: colors.lighter,
                    }}
                  >
                    PRODUTO 1
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'roboto-bold',
                      color: colors.lighter,
                    }}
                  >
                    R$ 10,00
                  </Text>
                </View>
              ))}
            </ScrollView>
          </View>
          <View style={{ marginTop: 10 }}>
            {[...Array(15).keys()].map(e => (
              <TouchableOpacity
                style={{ marginBottom: 5 }}
                key={e}
                onPress={() => {}}
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
                          fontWeight: 'roboto',
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
              EMPRESA DE TESTE
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
    </View>
  );
};

export default CompanyScreen;
