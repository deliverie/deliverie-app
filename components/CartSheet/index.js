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
  TextInput,
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
import { ActivityIndicator } from 'react-native-paper';
import SimpleHeader from '../SimpleHeader';

import Button from '../ButtonFill';
import RoundSelect from '../RoundSelect';
import moto from '../../assets/images/motorcycle.png';
import { baseURL } from '../../services/api';
import product from '../../assets/images/product.png';
import mastercard from '../../assets/images/payments/mastercard.png';
import amex from '../../assets/images/payments/amex.png';
import cash from '../../assets/images/payments/cash.png';
import diners from '../../assets/images/payments/diners.png';
import elo from '../../assets/images/payments/elo.png';
import hipercard from '../../assets/images/payments/hipercard.png';
import visa from '../../assets/images/payments/visa.png';
import info from '../../assets/images/info.png';
import { colors, metrics } from '../../styles';
import { Creators as CartActions } from '../../store/ducks/cart';
import { Creators as LocationActions } from '../../store/ducks/locations';
import { Creators as OrderActions } from '../../store/ducks/order';
import { wpd } from '../../utils/scalling';
import { monetize } from '../../utils';
import { showToast } from '../../utils/toast';
import Input from '../Input';
/** REDUX END */

const CartSheet = React.forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const [paymentType, setPaymentType] = useState(null);
  const [change, setChange] = useState(null);
  const { cart } = useSelector(state => state.cart);
  const { company } = useSelector(state => state.company);
  const { loading, shipment, currentLocation } = useSelector(
    state => state.locations,
  );
  const { loading: orderLoading, cart: orderCart } = useSelector(
    state => state.order,
  );
  const [deliveryType, setDeliveryType] = useState(null);
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    console.tron.log(cart);
  }, [cart]);

  useEffect(() => {
    if (deliveryType === 'delivery' && !shipment) {
      dispatch(
        LocationActions.calcShipment({
          address_id: currentLocation?.id,
          company_id: company?.id,
        }),
      );
    }
  }, [deliveryType]);

  function closeCart() {
    setTimeout(() => {
      return ref.current.close();
    }, 100);
  }

  const isLoading = loading || orderLoading;

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

  const isDisabled = () => {
    if (!deliveryType) return true;
    if (deliveryType === 'delivery' && !paymentType) return true;
    console.tron.log(calcPrice() + shipment?.price);
    if (
      paymentType === 'money' &&
      (!change || change <= (calcPrice() + shipment?.price || 0))
    )
      return true;
    return false;
  };

  const renderDeliveryType = () => {
    if (company?.order_delivery_type === 'delivery') {
      return (
        <RoundSelect
          selected={deliveryType === 'delivery'}
          onPress={() => setDeliveryType('delivery')}
          text="Delivery"
        />
      );
    }
    if (company?.order_delivery_type === 'withdraw') {
      return (
        <RoundSelect
          selected={deliveryType === 'withdraw'}
          onPress={() => setDeliveryType('withdraw')}
          text="Retirar"
        />
      );
    }
    if (company?.order_delivery_type === 'both') {
      return (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            flex: 1,
          }}
        >
          <RoundSelect
            selected={deliveryType === 'delivery'}
            onPress={() => setDeliveryType('delivery')}
            style={{ marginRight: metrics.baseMargin * 2 }}
            text="Delivery"
          />
          <RoundSelect
            selected={deliveryType === 'withdraw'}
            onPress={() => setDeliveryType('withdraw')}
            text="Retirar"
          />
        </View>
      );
    }
    return null;
  };

  const renderAddress = `${currentLocation?.street}, ${currentLocation?.number}, ${currentLocation?.district}`;

  const renderCity = `${currentLocation?.city}, ${currentLocation?.state}`;

  const renderPayOptions = () => {
    if (paymentType === 'creditcard') {
      return (
        <Text
          style={{
            fontFamily: 'roboto',
            color: colors.darker,
          }}
        >
          Você optou por pagar via cartão de crédito
        </Text>
      );
    }
    if (paymentType === 'debitcard') {
      return (
        <Text
          style={{
            fontFamily: 'roboto',
            color: colors.darker,
          }}
        >
          Você optou por pagar via cartão de débito
        </Text>
      );
    }
    if (paymentType === 'money') {
      let msg;
      if (!change) {
        msg = 'Digite o valor do troco.';
      }
      if (change <= (calcPrice() + shipment?.price || 0)) {
        msg = 'O valor para troco deve ser maior que o total.';
      }

      return (
        <View>
          <Text
            style={{
              fontFamily: 'roboto',
              color: colors.darker,
            }}
          >
            Você optou por pagar por dinheiro, deseja troco?
          </Text>
          <Input
            placeholder="Valor"
            keyboardType="numeric"
            onChangeText={text => setChange(text)}
            icon="cash"
            msg={msg}
          />
        </View>
      );
    }
    return null;
  };

  const parsePaymentMethod = name => {
    if (name === 'Mastercard') {
      return (
        <Image
          resizeMode="contain"
          style={{ width: 36, height: 36 }}
          source={mastercard}
        />
      );
    }
    if (name === 'Visa') {
      return (
        <Image
          resizeMode="contain"
          style={{ width: 36, height: 36 }}
          source={visa}
        />
      );
    }
    if (name === 'Amex') {
      return (
        <Image
          resizeMode="contain"
          style={{ width: 36, height: 36 }}
          source={amex}
        />
      );
    }
    if (name === 'Dinheiro') {
      return (
        <Image
          resizeMode="contain"
          style={{ width: 36, height: 36 }}
          source={cash}
        />
      );
    }
    if (name === 'Diners') {
      return (
        <Image
          resizeMode="contain"
          style={{ width: 36, height: 36 }}
          source={diners}
        />
      );
    }
    if (name === 'Elo') {
      return (
        <Image
          resizeMode="contain"
          style={{ width: 36, height: 36 }}
          source={elo}
        />
      );
    }
    if (name === 'Hipercard') {
      return (
        <Image
          resizeMode="contain"
          style={{ width: 36, height: 36 }}
          source={hipercard}
        />
      );
    }

    return (
      <Text
        style={{
          fontFamily: 'roboto',
          color: colors.darker,
          fontSize: 16,
        }}
      >
        {name}
      </Text>
    );
  };

  const Products = () => {
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

  const submit = () => {
    animation.start(() => {
      setSuccess(true);
    });
    const variations = [];
    cart.forEach(({ id: product_id, qty, selectedAttr }) => {
      const attributes = Object.values(selectedAttr).map(
        ({ attribute_id: id, id: value }) => ({
          id,
          value,
        }),
      );
      const obj = { product_id, qty, attributes };
      variations.push(obj);
    });
    const data = {
      variations,
    };
    dispatch(
      OrderActions.createOrder(
        data,
        currentLocation.id,
        paymentType,
        change,
      ),
    );
  };

  return (
    <RBSheet
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
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <View style={{ marginTop: metrics.baseMargin }}>
            <ScrollView>
              <View style={{ marginBottom: metrics.baseMargin * 4 }}>
                <Products />
                <View
                  style={{ marginHorizontal: 20, paddingTop: 20 }}
                >
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
                        ENTREGA
                      </Animated.Text>
                    </View>
                    <View
                      style={{
                        marginTop: metrics.baseMargin * 2,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      {renderDeliveryType()}
                    </View>
                    {deliveryType === 'delivery' && (
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
                            {renderAddress}
                          </Text>
                          <Text
                            style={{
                              fontFamily: 'roboto',
                              color: colors.light,
                            }}
                          >
                            {renderCity}
                          </Text>
                        </View>
                        {shipment?.price && (
                          <View
                            style={{
                              alignItems: 'center',
                            }}
                          >
                            <Button
                              color={colors.success}
                              fontColor={colors.white}
                              title={
                                shipment?.price === 0
                                  ? 'GRÁTIS'
                                  : monetize(shipment?.price)
                              }
                            />
                          </View>
                        )}
                      </View>
                    )}
                    <View style={{ marginTop: metrics.baseMargin }}>
                      {deliveryType === 'withdraw' && (
                        <Text
                          style={{
                            textAlign: 'center',
                            fontFamily: 'roboto',
                          }}
                        >
                          Você escolheu retirar seu pedido no
                          estabelecimento.
                        </Text>
                      )}
                    </View>
                  </View>
                  {deliveryType === 'delivery' && (
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
                          source={cash}
                          resizeMode="contain"
                          style={{
                            width: 32,
                            height: 32,
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
                          PAGAMENTO
                        </Animated.Text>
                      </View>
                      <View
                        style={{
                          marginTop: metrics.baseMargin * 2,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flex: 1,
                          }}
                        >
                          <RoundSelect
                            selected={paymentType === 'money'}
                            onPress={() => setPaymentType('money')}
                            style={{
                              marginRight: metrics.baseMargin * 2,
                            }}
                            text="Dinheiro"
                          />
                          <RoundSelect
                            selected={paymentType === 'creditcard'}
                            onPress={() =>
                              setPaymentType('creditcard')
                            }
                            style={{
                              marginRight: metrics.baseMargin * 2,
                            }}
                            text={`Cartão de${'\n'}crédito`}
                          />
                          <RoundSelect
                            selected={paymentType === 'debitcard'}
                            onPress={() =>
                              setPaymentType('debitcard')
                            }
                            text={`Cartão de${'\n'}débito`}
                          />
                        </View>
                        <View
                          style={{ marginTop: metrics.baseMargin }}
                        >
                          {renderPayOptions()}
                        </View>
                      </View>
                    </View>
                  )}
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
                          {company?.has_delivery_time
                            ? `${company?.min_delivery_time}-${company?.max_delivery_time}min`
                            : 'Mesmo dia'}
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
                          Métodos de pagamento aceitos
                        </Text>
                        <View
                          style={{
                            flexDirection: 'row',
                          }}
                        >
                          {company?.payment_methods &&
                            JSON.parse(company.payment_methods).map(
                              e => (
                                <View
                                  key={e}
                                  style={{ paddingHorizontal: 3 }}
                                >
                                  {parsePaymentMethod(e)}
                                </View>
                              ),
                            )}
                        </View>
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
                          ({company?.phone_ddd}) {company?.phone_num}
                        </Text>
                        {'\n'} Ou pelo whatsapp:
                        <Text
                          style={{
                            fontWeight: 'bold',
                            color: colors.primaryLight,
                          }}
                        >
                          {' '}
                          ({company?.whatsapp_ddd}){' '}
                          {company?.whatsapp_num}
                        </Text>
                      </Text>
                    </View>
                    {!isDisabled() && (
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginBottom: metrics.baseMargin * 4,
                        }}
                      >
                        <TouchableOpacity onPress={submit}>
                          <View
                            style={{
                              backgroundColor: success
                                ? colors.success
                                : colors.primaryLight,
                              borderRadius: 50,
                              padding: metrics.basePadding,
                            }}
                          >
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
                    )}
                  </View>
                </View>
              )}
            </ScrollView>
          </View>
        )}
        <AlertProvider />
        <FlashMessage position="top" />
      </SafeAreaView>
    </RBSheet>
  );
});

export default CartSheet;
