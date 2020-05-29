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
  FlatList,
  ActivityIndicator,
} from 'react-native';
import SvgUri from 'react-native-svg-uri';
import RBSheet from 'react-native-raw-bottom-sheet';

import {
  Ionicons,
  Feather,
  Entypo,
  MaterialCommunityIcons,
} from '@expo/vector-icons';

import { LinearGradient } from 'expo-linear-gradient';

import SkeletonContent from 'react-native-skeleton-content';
import { useDispatch, useSelector } from 'react-redux';
import { getStatusBarHeight } from 'react-native-status-bar-height';

import { onScrollEvent, useValue } from 'react-native-redash';
import Animated, {
  event,
  Value,
  interpolate,
  timing,
  Easing,
} from 'react-native-reanimated';
import { monetize, handleWorkHours } from '../../utils';
import { colors } from '../../styles';

import CategorieSheet from '../../components/CategorieSheet';
import { hpd } from '../../utils/scalling';

import { Badge } from './components/Badge';

import { Cart } from './components/Cart';
import { Tabs } from './components/Tabs';
import { baseURL } from '../../services/api';
import company, {
  Creators as CompanyActions,
} from '../../store/ducks/company';
import { Creators as CartActions } from '../../store/ducks/cart';
import CartSheet from '../../components/CartSheet';

import styles from './styles';
import { showToast } from '../../utils/toast';

const { width, height } = Dimensions.get('window');

export default function Company({ navigation, route: { params } }) {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products);
  const { loading, company: data } = useSelector(
    state => state.company,
  );
  const { company_id } = useSelector(state => state.cart);

  const [currentProduct, setCurrentProduct] = useState(null);
  const [cartItems, setCartItens] = useState([]);

  const productSheetRef = useRef();
  const categorieSheetRef = useRef();
  const cartSheetRef = useRef();

  const { item } = params;

  if (!item) {
    return null;
  }

  const [cart, setCart] = useState(true);
  const [qtd, setQtd] = useState(1);
  const [attr, setAttr] = useState({});

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
  }, []);

  function handleAddCartItem(item) {
    const newCartItems = cartItems;
    let product = null;
    if (item.attribute) {
      product = {
        product: currentProduct.id,
        name: currentProduct.name,
        attribute: [],
      };
    }

    newCartItems.push(item);
    setCartItens(newCartItems);
  }

  const toAddress = () => {
    if (data?.address) {
      const { street, number, district, city, state } = data.address;
      return `${street}, ${number}, ${district}, ${city}/${state}`;
    }
    return '';
  };

  function handleProductOpen(item) {
    setCurrentProduct(item);
    setAttr({});
    productSheetRef.current.open();
  }

  function handleProductClose() {
    setCurrentProduct(null);
    return productSheetRef.current.close();
  }

  function addToCart() {
    if (company_id && company_id !== currentProduct.company_id) {
      showToast(
        'Erro',
        'Você possui itens adicionados no carrinho de outra loja, deseja limpar?',
        'danger',
      );
      return;
    }
    const product = { ...currentProduct };

    product.qty = qtd || 1;
    product.selectedAttr = attr;

    dispatch(CartActions.addCart(product));
    productSheetRef.current.close();
  }

  function priceAll() {
    if (Object.keys(attr).length) {
      const prices = Object.values(attr).map(e => e.prices.price);
      const reduce = prices.reduce((ac, v) => ac + v);

      if (reduce) {
        return monetize(reduce * qtd);
      }
    }
    return monetize(currentProduct?.price * qtd);
  }

  function isSelected(opcoes) {
    return Object.values(attr).find(e => e.id === opcoes.id)
      ? colors.darker
      : '#f1f1f1';
  }

  function renderCurrentProduct() {
    return (
      <View style={{ paddingTop: getStatusBarHeight(), flex: 1 }}>
        <ScrollView
          containerStyle={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={{
              flex: 1,
              justifyContent: 'space-between',
              flexDirection: 'row',
              paddingVertical: 5,
              alignContent: 'center',
              alignItems: 'center',
            }}
          >
            <Ionicons
              style={{ paddingHorizontal: 20 }}
              name="ios-arrow-back"
              size={33}
              color={colors.dark}
              onPress={() => handleProductClose()}
            />
            <Ionicons
              style={{ paddingHorizontal: 20 }}
              name="md-share"
              size={28}
              color={colors.dark}
            />
          </View>
          {currentProduct.image && (
            <ImageBackground
              style={{
                height: 220,
                borderRadius: 10,
                marginHorizontal: 20,
                justifyContent: 'flex-end',
              }}
              imageStyle={{ borderRadius: 10 }}
              source={{
                uri: `${baseURL}/${currentProduct.image.path}`,
              }}
              resizeMode="cover"
            >
              <LinearGradient
                colors={[
                  'transparent',
                  'rgba(0,0,0,0.3)',

                  'rgba(0,0,0,0.3)',
                  'rgba(0,0,0,0.7)',
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
              <View
                style={{
                  padding: 3,
                  borderRadius: 4,
                  marginTop: 8,
                  flexDirection: 'row',
                  width: wWidth - 40,
                  justifyContent: 'space-between',
                  height: 30,
                  zIndex: 99999,
                }}
              >
                <View
                  style={{
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
                    color={colors.white}
                  />
                  <Text
                    style={{
                      fontSize: 12,
                      color: colors.white,
                      marginLeft: 5,
                    }}
                  >
                    ({data?.phone_ddd}) {data?.phone_num}
                  </Text>
                </View>
                <View
                  style={{
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
                    color={colors.white}
                  />
                  <Text
                    style={{
                      fontSize: 12,
                      color: colors.white,
                      marginLeft: 5,
                    }}
                  >
                    Aberto
                  </Text>
                </View>
                <View
                  style={{
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
                    color={colors.white}
                  />

                  <Text
                    style={{
                      fontSize: 12,
                      color: colors.white,
                      marginLeft: 5,
                    }}
                  >
                    {data?.min_delivery_time}-
                    {data?.max_delivery_time} min
                  </Text>
                </View>
              </View>
            </ImageBackground>
          )}

          <View
            style={{
              marginHorizontal: 20,
              marginBottom: 10,
              paddingVertical: 12,
              borderBottomWidth: 1,
              borderColor: 'rgba(0,0,0,0.1)',
            }}
          >
            <Text
              style={{
                fontSize: 23,
                fontWeight: '300',
                color: colors.darker,
              }}
            >
              {currentProduct.name}
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '300',
                color: colors.dark,
              }}
            >
              {currentProduct.desc}
            </Text>
          </View>
          <View
            style={{
              marginHorizontal: 20,
              paddingBottom: 10,
              orderWidth: 1,
              flex: 1,
            }}
          >
            {currentProduct.attributes.length > 0 && (
              <View>
                {currentProduct.attributes.map(attribute => {
                  return (
                    <View style={{ marginTop: 15 }}>
                      <Text
                        style={{
                          fontSize: 17,
                          fontWeight: '400',
                          color: colors.darker,
                        }}
                      >
                        {attribute.name}
                      </Text>
                      {attribute.values.map((opcoes, index) => {
                        return (
                          <View
                            style={{
                              borderBottomWidth:
                                index === attribute.values.length - 1
                                  ? 1
                                  : 0,
                              paddingBottom:
                                index === attribute.values.length - 1
                                  ? 5
                                  : 0,
                              borderColor: 'rgba(0,0,0,0.1)',
                            }}
                          >
                            <View
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginTop: index === 0 ? 22 : 0,
                                paddingTop: 5,
                                paddingBottom: 5,
                                alignContent: 'center',
                                alignItems: 'center',
                              }}
                              onPress={() =>
                                handleAddCartItem(opcoes)
                              }
                            >
                              <View
                                style={{
                                  flex: 1,
                                  flexDirection: 'row',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                }}
                              >
                                <TouchableOpacity
                                  onPress={() => {
                                    const newAttr = { ...attr };
                                    newAttr[attribute.id] = opcoes;
                                    setAttr(newAttr);
                                  }}
                                >
                                  <View
                                    style={{
                                      flexDirection: 'row',
                                      alignItems: 'center',
                                    }}
                                  >
                                    <View
                                      style={{
                                        width: 26,
                                        height: 26,
                                        borderRadius: 20,
                                        backgroundColor: '#f1f1f1',
                                        marginRight: 10,
                                        padding: 5,
                                      }}
                                    >
                                      <View
                                        style={{
                                          width: 16,
                                          height: 16,
                                          borderRadius: 20,
                                          backgroundColor: isSelected(
                                            opcoes,
                                          ),
                                          marginRight: 10,
                                        }}
                                      />
                                    </View>
                                    <Text
                                      style={{
                                        color: colors.darker,
                                        fontWeight: '200',
                                      }}
                                    >
                                      {opcoes.name}
                                    </Text>
                                  </View>
                                </TouchableOpacity>
                                <Text
                                  style={{
                                    fontWeight: '500',
                                    color: '#8bc34a',
                                    fontSize: 16,
                                  }}
                                >
                                  {monetize(opcoes?.prices.price)}
                                </Text>
                              </View>
                            </View>
                          </View>
                        );
                      })}
                    </View>
                  );
                })}
              </View>
            )}

            {currentProduct.attributes.length === 0 && (
              <View
                style={{
                  borderColor: 'rgba(0,0,0,0.1)',
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',

                    paddingBottom: 5,
                    alignContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => {}}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: '500',
                        color: '#8bc34a',
                        fontSize: 23,
                      }}
                    >
                      {monetize(currentProduct.price)}
                    </Text>
                  </View>
                </View>
              </View>
            )}
          </View>
        </ScrollView>

        <View
          style={{
            flexDirection: 'row',
            backgroundColor: 'white',
            padding: 20,
            justifyContent: 'space-between',
            shadowColor: '#f1f1f1',
            borderTopWidth: 1,
            borderTopColor: '#f1f1f1',
            shadowOffset: {
              width: 0,
              height: -10,
            },
            shadowOpacity: 0.5,
            shadowRadius: 3,

            elevation: 3,
          }}
        >
          <View
            style={{ flexDirection: 'row', alignItems: 'center' }}
          >
            <TouchableOpacity
              style={{
                width: 30,
                height: 30,
                borderColor: '#f1f1f1',
                borderWidth: 1,
                borderRadius: 100,
                alignItems: 'center',
                justifyContent: 'center',
                alignContent: 'center',
                marginRight: 5,
              }}
              onPress={() => qtd > 1 && setQtd(qtd - 1)}
            >
              <Feather
                name="minus-circle"
                size={24}
                color="#f44336"
              />
            </TouchableOpacity>
            <View
              style={{
                width: 30,
                height: 30,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text
                style={{
                  color: 'rgba(34,60,120,1)',
                  fontWeight: '500',
                }}
              >
                {qtd}
              </Text>
            </View>
            <TouchableOpacity
              style={{
                width: 30,
                height: 30,
                borderColor: '#f1f1f1',
                borderWidth: 1,
                borderRadius: 100,
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: 5,
              }}
              onPress={() => setQtd(qtd + 1)}
            >
              <Feather name="plus-circle" size={24} color="#8bc34a" />
            </TouchableOpacity>
          </View>
          {currentProduct.attributes.length &&
            Object.keys(attr).length > 0 && (
              <TouchableOpacity
                style={{
                  borderWidth: 1,
                  borderColor: '#4caf50',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  marginLeft: 20,
                  paddingHorizontal: 20,
                  borderRadius: 3,
                  paddingVertical: 10,
                  backgroundColor: '#8bc34a',
                  alignItems: 'center',
                }}
                onPress={() => addToCart()}
              >
                <Ionicons name="md-cart" size={22} color="white" />
                <Text
                  style={{
                    fontSize: 19,
                    fontWeight: '500',
                    color: colors.white,
                    marginLeft: 40,
                  }}
                >
                  {priceAll()}
                </Text>
              </TouchableOpacity>
            )}
        </View>
      </View>
    );
  }

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

  function renderProducts() {
    if (products.products.length === 0) {
      return (
        <View
          style={{
            flex: 1,
            marginTop: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Entypo name="emoji-sad" size={24} color={colors.darker} />
          <Text style={{ color: colors.darker }}>
            Não existem produtos para essa categoria, ainda!
          </Text>
        </View>
      );
    }
    return (
      <FlatList
        data={products.products}
        renderItem={({ item }) => {
          if (item.is_active === 1) {
            return (
              <TouchableOpacity
                onPress={() => {
                  handleProductOpen(item);
                }}
                style={styles.card}
              >
                {/* <View style={styles.image} /> */}
                {item.image ? (
                  <Image
                    style={styles.image}
                    source={{
                      uri: `${baseURL}/${item.image.path}`,
                    }}
                  />
                ) : (
                  <View style={styles.image} />
                )}

                <View
                  style={{
                    flexDirection: 'row',
                    flex: 1,
                    alignContent: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                    }}
                  >
                    <Text style={styles.title}>{item.name}</Text>
                    <Text style={styles.description}>
                      {item.desc}
                    </Text>
                    <Text>{monetize(item.price)}</Text>
                  </View>
                  <Feather
                    name="plus-circle"
                    size={24}
                    color="#8bc34a"
                  />
                </View>
              </TouchableOpacity>
            );
          }
        }}
        keyExtractor={item => String(item.id)}
      />
    );
  }

  return (
    <>
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View
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
        </View>
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
              <Text style={{ color: 'white' }}>
                {JSON.stringify(handleWorkHours(data?.workhours))}
              </Text>
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
        {products.loading ? <ActivityIndicator /> : renderProducts()}
      </ScrollView>
      {cart && (
        <SafeAreaView
          containerStyle={{ backgroundColor: 'transparent' }}
        >
          <TouchableOpacity
            onPress={() => cartSheetRef.current.open()}
          >
            <Cart />
          </TouchableOpacity>
        </SafeAreaView>
      )}
      <RBSheet
        ref={productSheetRef}
        height={height}
        onClose={() => setCurrentProduct(null)}
        closeOnPressMask
        closeOnDragDown={false}
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(0,0,0,0.3)',
          },
          draggableIcon: {
            backgroundColor: '#ccc',
          },
          container: {
            borderTopLeftRadius: 5,
            borderTopRightRadius: 5,
          },
        }}
      >
        {currentProduct ? renderCurrentProduct() : null}
      </RBSheet>
      <CategorieSheet ref={categorieSheetRef} />
      <CartSheet ref={cartSheetRef} />
    </>
  );
}
