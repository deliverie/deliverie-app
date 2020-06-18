import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  Text,
  View,
  Image,
  FlatList,
  Alert,
} from 'react-native';
import {
  RectButton,
  ScrollView,
  TouchableOpacity,
} from 'react-native-gesture-handler';

import { useDispatch, useSelector } from 'react-redux';

import { monetize } from '../../utils/index';

import moment from 'moment';
moment.locale('pt-br', require('moment/locale/pt-br'));
import { Ionicons, Feather } from '@expo/vector-icons';

import RNAnimatedTabs from 'rn-animated-tabs';
import H4 from '../../components/H4';
import SimpleHeader from '../../components/SimpleHeader';

import { Creators as LocationsActions } from '../../store/ducks/locations';

import { colors } from '../../styles';

export default function OrderDetail({ navigation, route }) {
  const dispatch = useDispatch();
  const { order } = route.params;

  function parsePrice(variation) {
    if (variation) {
      if (variation.choices?.length) {
        const findChoice = variation?.choices?.find(
          e => e.value?.prices,
        );
        if (findChoice?.value?.prices?.length) {
          return findChoice.value.prices[0].price.toFixed(2);
        }
      }
      return variation.product?.price;
    }
    return '';
  }

  function renderItem(variations) {
    return (
      <FlatList
        data={variations}
        renderItem={({ item }) => {
          return (
            <View
              style={{
                marginBottom: 4,
                paddingBottom: 4,
                borderBottomWidth: 1,
                borderColor: '#f1f1f1',
              }}
            >
              <View style={styles.cardItemsSingleContainer}>
                <Text style={styles.cardItemsSingleQty}>
                  {item.pivot.qty}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',

                    flex: 1,
                  }}
                >
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.cardItemsSingleText}>
                      {item.product.name}
                    </Text>
                    {item.choices?.length ? (
                      <View>
                        {item.choices.map(f => (
                          <Text style={styles.cardItemsSingleText}>
                            ({f.value?.name})
                          </Text>
                        ))}
                      </View>
                    ) : null}
                  </View>
                  <Text style={styles.cardItemsSingleText}>
                    R$ {parsePrice(item)}
                  </Text>
                </View>
              </View>
              <View>
                {item.increments?.length ? (
                  <>
                    <View style={styles.cardItemsSingleContainer}>
                      {item.increments.map(f => (
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            flex: 1,
                            alignItems: 'center',
                          }}
                        >
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}
                          >
                            <Text
                              style={{
                                color: colors.dark,
                                marginRight: 10,
                              }}
                            >
                              +{f.qty}
                            </Text>
                            <Text style={{ color: colors.dark }}>
                              {f.additional?.name}
                            </Text>
                          </View>
                          <Text style={{ color: colors.dark }}>
                            {` (R$ ${f.additional?.price?.toFixed(
                              2,
                            )})`}
                          </Text>
                        </View>
                      ))}
                    </View>
                  </>
                ) : null}
              </View>
            </View>
          );
        }}
        keyExtractor={item => String(item.id)}
      />
    );
  }

  function renderBadge(status) {
    const colors = {
      pending: 'red',
      on_way: 'blue',
      done: 'green',
    };

    const statusPtBr = {
      pending: 'Pendente',
      on_way: 'A caminho',
      done: 'Finalizado',
    };

    return (
      <View
        style={{
          backgroundColor: '#f1f1f1',
          borderRadius: 5,
          padding: 9,
          alignItems: 'center',
        }}
      >
        <Text style={[styles.cardItemCompanyDescription]}>
          {moment(order.updated_at)
            .subtract(3, 'hours')
            .format(
              ` [${statusPtBr[status]} em] DD/MM/YYYY [às] H:mm `,
            )}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SimpleHeader text={`Pedido #${order.id}`} />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.content}>
          <View style={{ marginBottom: 20 }}>
            <View style={styles.cardItem}>
              <View style={styles.cardItemHeader}>
                <Image
                  resizeMode="cover"
                  style={styles.cardItemLogo}
                  source={{ uri: order.company.imageUrl }}
                />

                <View>
                  <Text style={styles.cardItemCompanyText}>
                    {order.company.name}
                  </Text>
                </View>
              </View>
              <View
                style={[
                  { flexDirection: 'row', paddingVertical: 10 },
                  styles.border,
                ]}
              >
                <Feather
                  name="calendar"
                  size={15}
                  color={colors.darker}
                />
                <Text
                  style={{
                    fontWeight: '300',
                    color: colors.dark,
                    marginLeft: 5,
                  }}
                >
                  Realizado em
                  {moment(order.created_at)
                    .subtract(3, 'hours')
                    .format(' D [de] MMMM [de] YYYY [às] H:mm ')}
                </Text>
              </View>
              {renderBadge(order.order_status)}
              <View style={styles.cardItemsContainer}>
                {renderItem(order.variations)}
              </View>

              <View
                style={[
                  styles.cardItemsSingleContainer,
                  {
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end',
                  },
                ]}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.cardItemsSingleText}>
                      Subtotal
                    </Text>
                  </View>
                  <Text style={styles.cardItemsSingleText}>
                    R$ {order.total}
                  </Text>
                </View>
              </View>
              <View
                style={[
                  styles.cardItemsSingleContainer,
                  {
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end',
                  },
                ]}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.cardItemsSingleText}>
                      Frete
                    </Text>
                  </View>
                  <Text style={styles.cardItemsSingleText}>
                    R$ {order.shipping_price}
                  </Text>
                </View>
              </View>
              <View
                style={[
                  styles.cardItemsSingleContainer,
                  {
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end',
                  },
                ]}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.cardItemsSingleText}>
                      Total
                    </Text>
                  </View>
                  <Text style={styles.cardItemsSingleText}>
                    R$ {order.total}
                  </Text>
                </View>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: 15,
                overflow: 'hidden',
                paddingBottom: 10,
              }}
            >
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
              <View style={styles.tringle} />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  contentContainer: {
    flex: 1,
  },
  content: {
    marginTop: 20,
  },

  cardItem: {
    backgroundColor: colors.white,
    padding: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    marginHorizontal: 15,
    shadowColor: 'rgba(0,0,0,0.3)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  cardItemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 15,
  },
  cardItemLogo: {
    width: 45,
    height: 45,
    borderRadius: 45,
    backgroundColor: 'red',
  },
  cardItemCompanyText: {
    color: colors.darker,
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 10,
  },
  border: {
    borderBottomWidth: 1,
    borderColor: '#f1f1f1',
  },
  cardItemCompanyDescription: {
    color: colors.darker,
    fontSize: 14,
    fontWeight: '300',
  },
  cardItemsContainer: {
    borderBottomWidth: 1,
    borderColor: '#f1f1f1',
    paddingVertical: 15,
  },
  cardItemsSingleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardItemsSingleQty: {
    borderWidth: 1,
    padding: 4,
    borderRadius: 4,
    borderColor: colors.light,
    color: colors.dark,
  },
  cardItemsSingleText: {
    color: colors.darker,
    marginLeft: 10,
  },
  tringle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'white',
    transform: [{ rotate: '180deg' }],
    shadowColor: 'rgba(0,0,0,0.3)',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
