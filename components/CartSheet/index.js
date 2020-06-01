import FlashMessage from 'react-native-flash-message';
import React, { useState, useEffect } from 'react';
import {
  Ionicons,
  Feather,
  MaterialCommunityIcons,
} from '@expo/vector-icons';

import {
  Image,
  View,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import AlertProvider, {
  setModal,
  popModal,
} from 'react-native-alert-utils';
import { getStatusBarHeight } from 'react-native-status-bar-height';

import { useDispatch, useSelector } from 'react-redux';
import { SwipeListView } from 'react-native-swipe-list-view';
import Animated, {
  interpolate,
  Value,
  timing,
  Easing,
} from 'react-native-reanimated';

import { SimpleLayout } from 'react-native-alert-utils/Layout';
import SimpleHeader from '../SimpleHeader';

import Button from '../ButtonFill';
import moto from '../../assets/images/motorcycle.png';
import { baseURL } from '../../services/api';
import product from '../../assets/images/product.png';
import info from '../../assets/images/info.png';
import { colors, metrics } from '../../styles';
import { Creators as CartActions } from '../../store/ducks/cart';
import { wpd } from '../../utils/scalling';
import { monetize } from '../../utils';
/** REDUX END */

const CartSheet = React.forwardRef((props, ref) => {
  const { cart } = useSelector(state => state.cart);
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    console.tron.log(cart);
  }, [cart]);

  function closeCart() {
    setTimeout(() => {
      return ref.current.close();
    }, 100);
  }

  const cartNotEmpty = cart?.length > 0;

  const calcPrice = () => {
    const prices = cart.map(item => {
      const selectedAttr = Object.values(item?.selectedAttr);
      const pricesFilter = selectedAttr
        .filter(e => e?.prices?.price)
        .map(e => e?.prices?.price * item.qty);
      return pricesFilter.reduce((ac, v) => ac + v);
    });
    return prices?.length ? prices.reduce((ac, v) => ac + v) : 0;
  };

  const Products = () => {
    const dispatch = useDispatch();

    const renderHidden = ({ item }) => (
      <View
        style={{
          flex: 1,
          backgroundColor: 'red',
          width: 75,
          alignSelf: 'flex-end',
        }}
      >
        <TouchableOpacity
          style={{
            borderTopLeftRadius: 5,
            borderTopRightRadius: 5,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: `orange`,
            flex: 1,
          }}
          onPress={() => {}}
        >
          <Feather name="edit" size={20} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            borderBottomLeftRadius: 5,
            borderBottomRightRadius: 5,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'red',
            flex: 1,
          }}
          onPress={() =>
            setModal(
              <SimpleLayout container={{ height: 250 }}>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: 'roboto-light',
                      fontSize: 18,
                    }}
                  >
                    Deseja remover este item do carrinho?
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      paddingHorizontal: 20,
                    }}
                  >
                    <Button
                      fontColor={colors.white}
                      onPress={() => {
                        popModal();
                        dispatch(
                          CartActions.removeCart(item.cart_id),
                        );
                      }}
                      color={colors.success}
                      style={{
                        flex: 1,
                        marginRight: metrics.baseMargin,
                      }}
                      title="SIM"
                    />
                    <Button
                      fontColor={colors.white}
                      onPress={() => popModal()}
                      color={colors.danger}
                      style={{ flex: 1 }}
                      title="NÃO"
                    />
                  </View>
                </View>
              </SimpleLayout>,
            )
          }
        >
          <Ionicons name="md-trash" size={23} color="white" />
        </TouchableOpacity>
      </View>
    );

    function renderContent(productItem) {
      const { item } = productItem;
      const selectedAttr = Object.values(item?.selectedAttr);
      const pricesFilter = selectedAttr
        .filter(e => e?.prices?.price)
        .map(e => e?.prices?.price);
      const price = pricesFilter?.length
        ? pricesFilter.reduce((ac, v) => ac + v) * item.qty
        : 0;
      return (
        <View
          style={{
            flexDirection: 'row',

            marginBottom: 5,
            backgroundColor: 'white',

            shadowColor: 'rgba(0,0,0,0.4)',
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5,
            padding: 10,
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
            }}
          >
            <View style={{ flexDirection: 'row', flex: 1 }}>
              <View
                style={{
                  flexDirection: 'row',

                  alignContent: 'center',
                  alignItems: 'center',
                }}
              >
                <MaterialCommunityIcons
                  name="trash-can-outline"
                  size={24}
                  color="red"
                />
                <Image
                  source={{
                    uri: `${baseURL}/${item?.image?.path}`,
                  }}
                  style={{
                    width: 75,
                    height: 75,

                    marginRight: 10,
                    borderRadius: 5,
                  }}
                />
              </View>
              <View
                style={{
                  flex: 1,

                  justifyContent: 'center',
                }}
              >
                <Text
                  style={{
                    fontFamily: 'roboto',
                    fontSize: 15,
                    fontWeight: '500',
                  }}
                >
                  {item.name}
                </Text>
                <Text
                  style={{ fontFamily: 'roboto-light', fontSize: 13 }}
                >
                  {item.desc}
                </Text>
                {selectedAttr.length > 0 && (
                  <View>
                    {selectedAttr.map(attr => {
                      return (
                        <Text
                          style={{
                            fontFamily: 'roboto-light',
                            fontSize: 13,
                          }}
                        >
                          {attr.name}
                          {attr?.prices?.price
                            ? ` (${monetize(attr.prices.price)})`
                            : ''}
                        </Text>
                      );
                    })}
                  </View>
                )}

                <TouchableOpacity
                  style={{ flexDirection: 'row', marginTop: 4 }}
                >
                  <Text
                    style={{
                      color: colors.primary,
                      marginRight: 5,
                    }}
                  >
                    Ver adicionais
                  </Text>
                  <Ionicons
                    name="ios-arrow-down"
                    size={19}
                    color={colors.primary}
                  />
                </TouchableOpacity>
                {/* <View style={{ flexDirection: 'row', marginTop: 3 }}>
                <View
                  style={{
                    backgroundColor: colors.dark,
                    paddingVertical: 3,
                    paddingHorizontal: 6,
                    borderRadius: 5,
                  }}
                >
                  <Text style={{ fontSize: 13, color: colors.white }}>
                    bacon + R$ 1,30
                  </Text>
                </View>
              </View> */}
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text style={{ color: colors.primary }}>
                  {monetize(price)}
                </Text>
                <Text style={{ fontSize: 16 }}>{item.qty} un.</Text>
              </View>
            </View>
          </View>
        </View>
      );
    }

    if (!cartNotEmpty) {
      return (
        <View>
          <Text style={{ textAlign: 'center' }}>
            Seu carrinho esta vazio
          </Text>
        </View>
      );
    }

    return (
      <SwipeListView
        data={cart}
        renderItem={item => renderContent(item)}
        renderHiddenItem={renderHidden}
        rightOpenValue={-75}
      />
    );
  };

  const translateX = new Value(0);

  const animation = timing(translateX, {
    toValue: wpd(100),
    duration: 2000,
    easing: Easing.in(Easing.ease),
  });

  const opacity = interpolate(translateX, {
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  return (
    <RBSheet
      closeOnDragDown
      ref={ref}
      closeOnPressMask={false}
      height={Dimensions.get('window').height + getStatusBarHeight()}
      customStyles={{
        wrapper: {
          backgroundColor: 'rgba(0,0,0,0.4)',
        },
        draggableIcon: {
          backgroundColor: colors.primary,
        },
        container: {
          backgroundColor: 'white',
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        },
      }}
    >
      <SafeAreaView>
        <SimpleHeader text="Carrinho" goBack={closeCart} />
        <View style={{ marginTop: metrics.baseMargin }}>
          <ScrollView>
            <View style={{ marginBottom: metrics.baseMargin * 4 }}>
              <Products />
              <View style={{ marginHorizontal: 20, paddingTop: 20 }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <View />
                  {cartNotEmpty && (
                    <View>
                      <View style={{ flexDirection: 'row' }}>
                        <Text
                          style={{
                            fontSize: 22,
                            fontWeight: '300',
                            marginRight: 20,
                            width: 120,
                            color: colors.dark,
                          }}
                        >
                          Subtotal
                        </Text>
                        <Text
                          style={{
                            fontSize: 22,
                            fontWeight: '400',
                            color: colors.darker,
                          }}
                        >
                          {monetize(calcPrice())}
                        </Text>
                      </View>
                    </View>
                  )}
                </View>
              </View>
            </View>
            {cartNotEmpty && (
              <View>
                <View
                  style={{
                    marginBottom: metrics.baseMargin * 6,
                  }}
                >
                  <View
                    style={{
                      borderColor: colors.primary,
                      borderBottomWidth: 5,
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}
                  >
                    <Animated.Image
                      source={moto}
                      style={{
                        transform: [{ translateX }],
                      }}
                    />
                    <Animated.Text
                      style={{
                        fontFamily: 'roboto-light',
                        fontSize: 18,
                        padding: 15,
                        opacity,
                      }}
                    >
                      PAGAMENTO E ENTREGA
                    </Animated.Text>
                  </View>
                  <View
                    style={{
                      marginTop: metrics.baseMargin,
                      borderRadius: 10,
                      padding: 15,
                      marginHorizontal: metrics.baseMargin,
                      marginBottom: 5,
                      backgroundColor: colors.secundary,
                      shadowColor: 'rgba(0,0,0,0.4)',
                      shadowOffset: {
                        width: 0,
                        height: 3,
                      },
                      shadowOpacity: 0.25,
                      shadowRadius: 3.84,

                      elevation: 5,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: 'roboto',
                        color: colors.light,
                        fontSize: 16,
                      }}
                    >
                      Seu endereço:{'\n'}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-around',
                        marginBottom: metrics.baseMargin,
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: 'roboto-light',
                          color: colors.light,
                        }}
                      >
                        Rua amazonas, 378, Vila São Francisco
                      </Text>
                      <Button
                        color={colors.primaryLight}
                        fontColor={colors.primaryDark}
                        title="ALTERAR"
                      />
                    </View>
                    <View
                      style={{
                        alignItems: 'center',
                      }}
                    >
                      <Button
                        color={colors.success}
                        fontColor={colors.white}
                        title="R$ 10,00"
                      />
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    marginBottom: metrics.baseMargin * 4,
                  }}
                >
                  <View
                    style={{
                      borderColor: colors.primary,
                      borderBottomWidth: 5,
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}
                  >
                    <Image source={info} />
                    <Text
                      style={{
                        fontFamily: 'roboto-light',
                        fontSize: 18,
                        padding: 15,
                      }}
                    >
                      INFORMAÇÕES ADICIONAIS
                    </Text>
                  </View>
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'row',
                      marginBottom: metrics.baseMargin,
                    }}
                  >
                    <View
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: metrics.baseMargin,
                        borderRadius: 10,
                        padding: 15,
                        marginHorizontal: metrics.baseMargin,
                        marginBottom: 5,
                        backgroundColor: colors.light,
                        shadowColor: 'rgba(0,0,0,0.4)',
                        shadowOffset: {
                          width: 0,
                          height: 3,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        elevation: 5,
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: 'roboto-light',
                          color: colors.darker,
                          fontSize: 16,
                        }}
                      >
                        Tempo de entrega
                      </Text>
                      <Text
                        style={{
                          fontFamily: 'roboto',
                          color: colors.darker,
                          fontSize: 16,
                        }}
                      >
                        40-60min
                      </Text>
                    </View>
                    <View
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: metrics.baseMargin,
                        borderRadius: 10,
                        padding: 15,
                        marginHorizontal: metrics.baseMargin,
                        marginBottom: 5,
                        backgroundColor: colors.light,
                        shadowColor: 'rgba(0,0,0,0.4)',
                        shadowOffset: {
                          width: 0,
                          height: 3,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        elevation: 5,
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: 'roboto-light',
                          color: colors.darker,
                          fontSize: 16,
                        }}
                      >
                        Tempo de entrega
                      </Text>
                      <Text
                        style={{
                          fontFamily: 'roboto',
                          color: colors.darker,
                          fontSize: 16,
                        }}
                      >
                        40-60min
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{ marginBottom: metrics.baseMargin * 3 }}
                  >
                    <Text
                      style={{
                        textAlign: 'center',
                        fontFamily: 'roboto',
                        color: colors.darker,
                        fontSize: 16,
                      }}
                    >
                      Houve algum problema? {'\n'}Ligue no telefone:
                      <Text
                        style={{
                          fontWeight: 'bold',
                          color: colors.primaryLight,
                        }}
                      >
                        {' '}
                        (13) 1234-5678
                      </Text>
                    </Text>
                  </View>
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginBottom: metrics.baseMargin * 4,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() =>
                        animation.start(() => {
                          setSuccess(true);
                        })
                      }
                    >
                      <View
                        style={{
                          backgroundColor: success
                            ? colors.success
                            : colors.primaryLight,
                          borderRadius: 50,
                          padding: metrics.basePadding,
                        }}
                      >
                        {console.log(success)}
                        <Feather
                          name="check"
                          size={23}
                          color={
                            success ? colors.light : colors.darker
                          }
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          </ScrollView>
        </View>
        <FlashMessage position="top" />
        <AlertProvider />
      </SafeAreaView>
    </RBSheet>
  );
});

export default CartSheet;
