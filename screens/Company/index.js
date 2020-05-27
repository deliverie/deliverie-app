import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  ScrollView,
  Share,
  Alert,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import SvgUri from 'react-native-svg-uri';
import { PanGestureHandler } from 'react-native-gesture-handler';

import { onScrollEvent, useValue } from 'react-native-redash';
import { Card } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  event,
  Value,
  interpolate,
  timing,
  Easing,
} from 'react-native-reanimated';
import SkeletonContent from 'react-native-skeleton-content';
import { useDispatch, useSelector } from 'react-redux';
import CategorieSheet from '../../components/CategorieSheet';
import { hpd } from '../../utils/scalling';
import { colors } from '../../styles';

import { Badge } from './components/Badge';
import { FeaturedProducts } from './components/FeaturedProducts';
import { Cart } from './components/Cart';
import { Tabs } from './components/Tabs';
import { baseURL } from '../../services/api';
import { Creators as CompanyActions } from '../../store/ducks/company';
import CartSheet from '../../components/CartSheet';

export default function Company({ navigation, route: { params } }) {
  const categorieSheetRef = useRef();
  const cartSheetRef = useRef();

  const { item } = params;

  if (!item) {
    return null;
  }
  const dispatch = useDispatch();
  const { loading, company: data } = useSelector(
    state => state.company,
  );
  const [cart, setCart] = useState(true);
  const IMAGE_HEIGHT = hpd(35);
  const MIN_HEADER_HEIGHT = 80;
  const { width: wWidth } = Dimensions.get('window');
  const [showInfo, setShowInfo] = useState(false);

  const translationX = new Value(100);
  const config = {
    duration: 1000,
    toValue: -100,
    easing: Easing.inOut(Easing.ease),
  };

  useEffect(() => {
    dispatch(CompanyActions.getCompanyById(item));
    cartSheetRef.current.open();
  }, []);

  useEffect(() => {
    console.tron.log('testing company', data);
  }, [data]);

  const y = useValue(0);

  const toAddress = () => {
    if (data?.address) {
      const { street, number, district, city, state } = data.address;
      return `${street}, ${number}, ${district}, ${city}/${state}`;
    }
    return '';
  };

  async function shareCompany() {
    try {
      const result = await Share.share({
        message: `Compre agora na ${data.fantasy_name}! Ligue para (${data.phone_ddd})${data.phone_num}`,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <>
      <ScrollView style={{ flex: 1 }}>
        <Animated.View
          style={{
            zIndex: 9998,
          }}
        >
          <ImageBackground
            source={{ uri: `${baseURL}/${data?.banner}` }}
            style={{
              flex: 1,
              width: null,
              height: null,
              padding: 20,
              paddingTop: 50,
            }}
          >
            <View
              style={{
                zIndex: 9999999999,
                flex: 1,
              }}
            >
              <SafeAreaView
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  zIndex: 9999999,
                  borderWidht: 1,
                  flex: 1,
                  marginBottom: 10,
                }}
              >
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Ionicons
                    name="md-arrow-back"
                    size={23}
                    color="white"
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => shareCompany()}>
                  <Ionicons name="md-share" size={23} color="white" />
                </TouchableOpacity>
              </SafeAreaView>
              {loading ? (
                <SkeletonContent
                  isLoading
                  containerStyle={{}}
                  layout={[
                    { width: 90, height: 90, marginBottom: 5 },
                  ]}
                />
              ) : (
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
                      uri: `${baseURL}/${data?.photo}`,
                    }}
                    style={{ width: 90, height: 90, borderRadius: 5 }}
                    resizeMode="cover"
                  />
                </View>
              )}
              {loading ? (
                <SkeletonContent
                  containerStyle={{}}
                  isLoading
                  layout={[
                    { width: 80, height: 20, marginBottom: 5 },
                    { width: 140, height: 20 },
                  ]}
                />
              ) : (
                <>
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
                    {data?.fantasy_name}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                  >
                    <MaterialCommunityIcons
                      name="map-marker-outline"
                      size={24}
                      color="white"
                    />
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 14,

                        textShadowColor: 'rgba(0, 0, 0, 0.75)',
                        textShadowOffset: { width: 0, height: 0 },
                        textShadowRadius: 2,
                      }}
                    >
                      {toAddress()}
                    </Text>
                  </View>
                </>
              )}
              {!loading && (
                <View
                  style={{
                    flex: 1,
                    padding: 3,
                    borderRadius: 4,
                    marginTop: 8,
                    flexDirection: 'row',
                    width: wWidth - 40,
                    justifyContent: 'space-between',
                  }}
                >
                  <View
                    style={{
                      backgroundColor: '#8bc34a',
                      borderRadius: 4,
                      paddingHorizontal: 10,
                      justifyContent: 'center',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                  >
                    <Ionicons
                      name="ios-call"
                      size={15}
                      color={colors.darker}
                    />
                    <Text
                      style={{
                        fontSize: 12,
                        color: colors.lighdarker,
                        marginLeft: 5,
                      }}
                    >
                      ({data?.phone_ddd}) {data?.phone_num}
                    </Text>
                  </View>
                  <View
                    style={{
                      backgroundColor: '#8bc34a',
                      borderRadius: 4,
                      paddingHorizontal: 10,
                      justifyContent: 'center',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                  >
                    <Ionicons
                      name="md-time"
                      size={15}
                      color={colors.darker}
                    />
                    <Text
                      style={{
                        fontSize: 12,
                        color: colors.lighdarker,
                        marginLeft: 5,
                      }}
                    >
                      Aberto
                    </Text>
                  </View>
                  <View
                    style={{
                      backgroundColor: '#8bc34a',
                      borderRadius: 4,
                      paddingHorizontal: 10,
                      justifyContent: 'center',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                  >
                    <SvgUri
                      width="16"
                      height="16"
                      source={require('../../assets/images/delivery.svg')}
                    />

                    <Text
                      style={{
                        fontSize: 12,
                        color: colors.lighdarker,
                        marginLeft: 5,
                      }}
                    >
                      {data?.min_delivery_time}-
                      {data?.max_delivery_time} min
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => setShowInfo(!showInfo)}
                  >
                    <Ionicons
                      name={
                        showInfo
                          ? 'ios-arrow-dropup-circle'
                          : 'ios-arrow-dropdown-circle'
                      }
                      size={24}
                      color="white"
                    />
                  </TouchableOpacity>
                </View>
              )}
            </View>

            <LinearGradient
              colors={[
                'transparent',
                'rgba(34,60,120,0.3)',

                'rgba(34,60,120,0.3)',
                'rgba(34,60,120,1)',
              ]}
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
        {showInfo && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              paddingHorizontal: 10,
              paddingBottom: 15,
              backgroundColor: 'rgba(34,60,120,1)',
            }}
          >
            <View>
              <Text>Como chegar</Text>
            </View>
          </View>
        )}

        {loading ? (
          <SkeletonContent
            containerStyle={{}}
            layout={[{ width: wWidth, height: 40 }]}
            isLoading
          />
        ) : (
          <Tabs categories={data?.categories || []} />
        )}
        {[...Array(1).keys()].map(e => (
          <PanGestureHandler key={e}>
            <Animated.View
              style={{
                flex: 1,
                flexDirection: 'row',
                transform: [{ translateX: translationX }],
              }}
            >
              <View>
                <Image
                  source={{
                    uri:
                      'https://www.itambe.com.br/portal/Images/Produto/110119leiteuhtsemidesnatado1lt_medium.png',
                  }}
                  style={{ width: 50, height: 50 }}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontFamily: 'roboto', fontSize: 18 }}>
                  Produto 1
                </Text>
                <Text
                  style={{ fontFamily: 'roboto-light', fontSize: 16 }}
                >
                  Descrição do produto
                </Text>
                <Text>+ bacon</Text>
                <Text>+ molho</Text>
                <Text>+ coquinha geladinha hmmmm</Text>
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text style={{ color: colors.primary }}>
                  R$ 10,00
                </Text>
                <Text style={{ fontSize: 16 }}>1 un.</Text>
              </View>
            </Animated.View>
          </PanGestureHandler>
        ))}
      </ScrollView>
      {cart && (
        <SafeAreaView>
          <Cart />
        </SafeAreaView>
      )}
      <CategorieSheet ref={categorieSheetRef} />
      <CartSheet ref={cartSheetRef} />
    </>
  );
}
