import FlashMessage from 'react-native-flash-message';
import React, { useState, useEffect } from 'react';
import {
  Ionicons,
  Feather,
  AntDesign,
  MaterialCommunityIcons,
} from '@expo/vector-icons';

import { TextInputMask } from 'react-native-masked-text';

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
      let price = 0;
      if (!selectedAttr.length) {
        price = item.price * item.qty;
      } else {
        selectedAttr.forEach(f => {
          if (f.length) {
            if (f.length > 1) {
              price +=
                f.reduce((ac, v) => ac.price + v.price) * item.qty;
            } else {
              price += f[0].price * item.qty;
            }
          } else {
            price += f?.prices?.price * item.qty;
          }
        });
      }
      // const pricesFilter = selectedAttr
      //   .filter(e => e?.prices?.price)
      //   .map(e => e?.prices?.price * item.qty);
      // return pricesFilter.reduce((ac, v) => ac + v);
      return price;
    });
    return prices?.length ? prices.reduce((ac, v) => ac + v) : 0;
  };

  const isDisabled = () => {
    if (!deliveryType) return true;
    if (deliveryType === 'delivery' && !paymentType) return true;
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

  const renderDeliveryType2 = () => {
    if (company?.order_delivery_type === 'delivery') {
      return (
        <TouchableOpacity
          style={{
            borderWidth: 1,
            padding: 10,
            borderRadius: 5,
            borderColor:
              deliveryType === 'delivery' ? colors.primary : '#ccc',
          }}
          onPress={() => setDeliveryType('delivery')}
        >
          <Text
            style={{
              color:
                deliveryType === 'delivery' ? colors.primary : '#ccc',
            }}
          >
            Delivery
          </Text>
        </TouchableOpacity>
        // <RoundSelect
        //   selected={deliveryType === 'delivery'}
        //   onPress={() => setDeliveryType('delivery')}
        //   text="Delivery"
        // />
      );
    }
    if (company?.order_delivery_type === 'withdraw') {
      return (
        <TouchableOpacity
          style={{
            borderWidth: 1,
            padding: 10,
            borderRadius: 5,
            borderColor:
              deliveryType === 'withdraw' ? colors.primary : '#ccc',
          }}
          onPress={() => setDeliveryType('withdraw')}
        >
          <Text
            style={{
              color:
                deliveryType === 'withdraw' ? colors.primary : '#ccc',
            }}
          >
            Retirar na loja
          </Text>
        </TouchableOpacity>
        // <RoundSelect
        //   selected={deliveryType === 'withdraw'}
        //   onPress={() => setDeliveryType('withdraw')}
        //   text="Retirar"
        // />
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
          <TouchableOpacity
            onPress={() => setDeliveryType('delivery')}
            style={{
              borderWidth: 1,
              padding: 10,
              borderRadius: 5,
              borderColor:
                deliveryType === 'delivery' ? colors.primary : '#ccc',
            }}
          >
            <Text
              style={{
                color:
                  deliveryType === 'delivery'
                    ? colors.primary
                    : '#ccc',
              }}
            >
              Delivery
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setDeliveryType('withdraw')}
            style={{
              borderWidth: 1,
              padding: 10,
              borderRadius: 5,
              marginLeft: 8,
              borderColor:
                deliveryType === 'withdraw' ? colors.primary : '#ccc',
            }}
          >
            <Text
              style={{
                color:
                  deliveryType === 'withdraw'
                    ? colors.primary
                    : '#ccc',
              }}
            >
              Retirar
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
    return null;
  };

  const renderAddress = `${currentLocation?.street}, ${currentLocation?.number}, \n${currentLocation?.district}`;

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
            Você optou por pagar por dinheiro, deseja troco par?
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
          style={{ width: 32, height: 32 }}
          source={mastercard}
        />
      );
    }
    if (name === 'Visa') {
      return (
        <Image
          resizeMode="contain"
          style={{ width: 32, height: 32 }}
          source={visa}
        />
      );
    }
    if (name === 'Amex') {
      return (
        <Image
          resizeMode="contain"
          style={{ width: 32, height: 32 }}
          source={amex}
        />
      );
    }
    if (name === 'Dinheiro') {
      return (
        <Image
          resizeMode="contain"
          style={{ width: 32, height: 32 }}
          source={cash}
        />
      );
    }
    if (name === 'Diners') {
      return (
        <Image
          resizeMode="contain"
          style={{ width: 32, height: 32 }}
          source={diners}
        />
      );
    }
    if (name === 'Elo') {
      return (
        <Image
          resizeMode="contain"
          style={{ width: 32, height: 32 }}
          source={elo}
        />
      );
    }
    if (name === 'Hipercard') {
      return (
        <Image
          resizeMode="contain"
          style={{ width: 32, height: 32 }}
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
      let price = 0;
      if (!selectedAttr.length) {
        price = item.price;
      } else {
        selectedAttr.forEach(f => {
          if (f.length) {
            if (f.length > 1) {
              price += f.reduce((ac, v) => ac.price + v.price);
            } else {
              price += f[0].price;
            }
          } else {
            price += f?.prices?.price;
          }
        });
      }
      // const pricesFilter = selectedAttr
      //   .filter(e => e?.prices?.price)
      //   .map(e => e?.prices?.price);
      // const price = pricesFilter?.length
      //   ? pricesFilter.reduce((ac, v) => ac + v) * item.qty
      //   : 0;
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
                      if (attr.length) {
                        return attr.map(e => (
                          <Text
                            style={{
                              fontFamily: 'roboto-light',
                              fontSize: 13,
                              color: colors.danger,
                            }}
                          >
                            + {e.name} ({monetize(e.price)})
                          </Text>
                        ));
                      }
                      return (
                        <Text
                          style={{
                            fontFamily: 'roboto-light',
                            fontSize: 13,
                          }}
                        >
                          {attr.name}
                          {attr?.prices?.price
                            ? ` (${monetize(attr?.prices?.price)})`
                            : ''}
                        </Text>
                      );
                    })}
                  </View>
                )}
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
      const attributes = Object.values(selectedAttr).map(e => {
        if (!e.length) {
          return { id: e.attribute_id, value: e.id };
        }
        const attributeId = e[0].pivot.attribute_id;
        return {
          id: attributeId,
          increments: e.map(({ id }) => ({ id, qty: 1 })),
        };
      });
      const obj = { product_id, qty, attributes };
      variations.push(obj);
    });
    dispatch(
      OrderActions.createOrder(
        variations,
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
                <View style={{}}>
                  <View
                    style={{
                      marginBottom: metrics.baseMargin * 2,
                    }}
                  >
                    <View
                      style={{
                        borderColor: '#ccc',
                        borderBottomWidth: 1,
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexDirection: 'row',

                        paddingHorizontal: 15,
                      }}
                    >
                      <View>
                        <Text
                          style={{
                            fontFamily: 'roboto-light',
                            fontSize: 18,
                            color: colors.darker,
                          }}
                        >
                          ENTREGA
                        </Text>
                        <Text
                          style={{
                            fontFamily: 'roboto-light',
                            fontSize: 14,
                            color: colors.dark,
                          }}
                        >
                          Selecione o tipo de entrega
                        </Text>
                      </View>
                      <View style={{ paddingVertical: 10 }}>
                        {renderDeliveryType2()}
                      </View>
                    </View>

                    {deliveryType === 'delivery' && (
                      <View style={{ marginHorizontal: 15 }}>
                        <View
                          style={{
                            marginTop: 15,
                            backgroundColor: '#f1f1f1',
                            padding: 10,
                            borderRadius: 7,
                          }}
                        >
                          <Text
                            style={{
                              color: colors.darker,
                              fontFamily: 'roboto',
                            }}
                          >
                            Seu endereço
                          </Text>
                          <Text
                            style={{
                              color: colors.darker,
                              fontFamily: 'roboto-light',
                            }}
                          >
                            {renderAddress}
                            {'\n'}
                            {renderCity}
                          </Text>
                          <View
                            style={{
                              alignItems: 'flex-end',
                              justifyContent: 'flex-end',
                              flexDirection: 'row',
                              padding: 10,
                            }}
                          >
                            <AntDesign
                              name="edit"
                              size={16}
                              color={colors.darker}
                            />
                            <Text
                              style={{
                                color: colors.darker,
                                fontSize: 15,
                              }}
                            >
                              Alterar
                            </Text>
                          </View>
                        </View>
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
                        marginBottom: metrics.baseMargin * 2,
                      }}
                    >
                      <View
                        style={{
                          borderColor: '#ccc',
                          borderBottomWidth: 1,
                          paddingHorizontal: 15,
                          paddingBottom: 10,
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: 'roboto-light',
                            fontSize: 18,
                            color: colors.darker,
                          }}
                        >
                          PAGAMENTO
                        </Text>
                        <Text
                          style={{
                            fontFamily: 'roboto-light',
                            fontSize: 14,
                            color: colors.dark,
                          }}
                        >
                          {paymentType === 'money'
                            ? 'O valor para troco deve ser maior que o valor do pedido'
                            : 'Selecione uma forma de pagamento'}
                        </Text>
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
                            alignSelf: 'stretch',
                            marginHorizontal: 15,
                          }}
                        >
                          <TouchableOpacity
                            style={{
                              borderWidth: 1,
                              justifyContent: 'center',
                              alignItems: 'center',

                              borderRadius: 5,
                              flexDirection: 'row',
                              borderColor:
                                paymentType === 'money'
                                  ? '#4caf50'
                                  : '#ccc',
                            }}
                            onPress={() => setPaymentType('money')}
                          >
                            <Text
                              style={{
                                paddingHorizontal: 10,
                                color:
                                  paymentType === 'money'
                                    ? '#4caf50'
                                    : '#ccc',
                              }}
                            >
                              Dinheiro
                            </Text>
                            {paymentType === 'money' && (
                              <TextInputMask
                                type="money"
                                options={{
                                  precision: 2,
                                  separator: ',',
                                  delimiter: '.',
                                  unit: 'R$ ',
                                  suffixUnit: '',
                                }}
                                underlineColorAndroid="rgba(0, 0, 0, 0)"
                                placeholderTextColor="rgba(0, 0, 0, 0.4)"
                                placeholder="Troco para"
                                keyboardType="numeric"
                                onChangeText={text => setChange(text)}
                                value={change}
                                style={{
                                  width: 100,
                                  borderLeftWidth: 1,
                                  borderColor: '#4caf50',
                                  padding: 10,
                                }}
                              />
                            )}
                          </TouchableOpacity>

                          <TouchableOpacity
                            style={{
                              borderWidth: 1,
                              padding: 10,
                              borderRadius: 5,
                              marginHorizontal: 8,
                              borderColor:
                                paymentType === 'creditcard'
                                  ? colors.primary
                                  : '#ccc',
                            }}
                            onPress={() =>
                              setPaymentType('creditcard')
                            }
                          >
                            <Text
                              style={{
                                color:
                                  paymentType === 'creditcard'
                                    ? colors.primary
                                    : '#ccc',
                              }}
                            >
                              Crédito
                            </Text>
                          </TouchableOpacity>

                          <TouchableOpacity
                            style={{
                              borderWidth: 1,
                              padding: 10,
                              borderRadius: 5,
                              borderColor:
                                paymentType === 'debitcard'
                                  ? colors.primary
                                  : '#ccc',
                            }}
                            onPress={() =>
                              setPaymentType('debitcard')
                            }
                          >
                            <Text
                              style={{
                                color:
                                  paymentType === 'debitcard'
                                    ? colors.primary
                                    : '#ccc',
                              }}
                            >
                              Débito
                            </Text>
                          </TouchableOpacity>
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
                        borderColor: '#ccc',
                        borderBottomWidth: 1,

                        flexDirection: 'row',
                      }}
                    >
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
                        flexDirection: 'row',
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
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: 'roboto',
                            color: colors.darker,
                            fontSize: 25,
                          }}
                        >
                          {company?.has_delivery_time
                            ? `${company?.min_delivery_time}-${company?.max_delivery_time}min`
                            : 'Mesmo dia'}
                        </Text>
                        <Text
                          style={{
                            fontFamily: 'roboto-light',
                            color: colors.darker,
                            fontSize: 16,
                          }}
                        >
                          Tempo de entrega
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
                        }}
                      >
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
                        <Text
                          style={{
                            fontFamily: 'roboto-light',
                            color: colors.darker,
                            fontSize: 16,
                          }}
                        >
                          Métodos de pagamento
                        </Text>
                      </View>
                    </View>

                    {!isDisabled() && (
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginBottom: metrics.baseMargin * 4,
                        }}
                      >
                        <TouchableOpacity
                          onPress={submit}
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            backgroundColor: '#4caf50',
                            borderRadius: 50,
                            padding: metrics.basePadding,
                          }}
                        >
                          <Feather
                            name="check"
                            size={27}
                            color={colors.white}
                          />
                          <Text
                            style={{
                              marginLeft: 10,
                              fontSize: 23,
                              color: colors.white,
                            }}
                          >
                            Finalizar Pedido
                          </Text>
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
