import FlashMessage from 'react-native-flash-message';
import React, { useState } from 'react';
import { Ionicons, Feather } from '@expo/vector-icons';

import {
  Image,
  View,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import AlertProvider, { setModal } from 'react-native-alert-utils';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { Formik } from 'formik';
import * as yup from 'yup';

import { useDispatch, useSelector } from 'react-redux';
import { SwipeListView } from 'react-native-swipe-list-view';
import Animated, {
  interpolate,
  Value,
  timing,
  Easing,
} from 'react-native-reanimated';

import { SimpleLayout } from 'react-native-alert-utils/Layout';
import Button from '../ButtonFill';
import moto from '../../assets/images/motorcycle.png';
import product from '../../assets/images/product.png';
import info from '../../assets/images/info.png';
import { colors, metrics } from '../../styles';
import { wpd } from '../../utils/scalling';
/** REDUX END */

const CartSheet = React.forwardRef((props, ref) => {
  const { cart } = useSelector(state => state.cart);
  const [success, setSuccess] = useState(false);
  const Products = () => {
    const renderHidden = () => (
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
              <SimpleLayout>
                <Text>Deseja remover este item do carrinho?</Text>
              </SimpleLayout>,
            )
          }
        >
          <Ionicons name="md-trash" size={23} color="white" />
        </TouchableOpacity>
      </View>
    );

    const renderContent = () => (
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: metrics.baseMargin,
          marginBottom: 5,
          backgroundColor: 'white',
          borderRadius: 5,
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
              <Text style={{ color: colors.primary }}>R$ 10,00</Text>
              <Text style={{ fontSize: 16 }}>1 un.</Text>
            </View>
          </View>
        </View>
      </View>
    );

    return (
      <SwipeListView
        data={[...Array(4).keys()]}
        renderItem={renderContent}
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
      height={Dimensions.get('window').height}
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
          marginTop: 20,
        },
      }}
    >
      <Text
        style={{
          fontFamily: 'roboto-bold',
          fontSize: 22,
          color: colors.primary,
          textAlign: 'center',
        }}
      >
        CARRINHO
      </Text>
      <View style={{ marginTop: metrics.baseMargin }}>
        <ScrollView>
          <View style={{ marginBottom: metrics.baseMargin * 4 }}>
            <View
              style={{
                marginBottom: metrics.baseMargin * 2,
              }}
            >
              <View
                style={{
                  borderColor: colors.primary,
                  borderBottomWidth: 5,
                  justifyContent: 'center',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Image source={product} />
                <Text
                  style={{
                    fontFamily: 'roboto-light',
                    fontSize: 18,
                    padding: 15,
                  }}
                >
                  PRODUTOS
                </Text>
              </View>
            </View>
            <Products />
          </View>
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
            <View style={{ marginBottom: metrics.baseMargin * 3 }}>
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
                    color={success ? colors.light : colors.darker}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
      <FlashMessage position="top" />
      <AlertProvider />
    </RBSheet>
  );
});

export default CartSheet;
