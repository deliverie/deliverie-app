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

import { Ionicons, Feather, Entypo } from '@expo/vector-icons';

import { LinearGradient } from 'expo-linear-gradient';

import SkeletonContent from 'react-native-skeleton-content';
import { useDispatch, useSelector } from 'react-redux';

import { monetize, handleWorkHours } from '../../utils';
import { colors } from '../../styles';

import CategorieSheet from '../../components/CategorieSheet';

import { Cart } from './components/Cart';
import { Tabs } from './components/Tabs';
import { baseURL } from '../../services/api';
import company, {
  Creators as CompanyActions,
} from '../../store/ducks/company';

import styles from './styles';
import Products from './components/Products';

const { height } = Dimensions.get('window');

export default function Company({ navigation, route: { params } }) {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products);
  const { loading, company: data } = useSelector(
    state => state.company,
  );
  const globalCart = useSelector(state => state.cart);

  const [currentProduct, setCurrentProduct] = useState(null);
  const [cartItems, setCartItens] = useState([]);

  const productSheetRef = useRef();
  const categorieSheetRef = useRef();

  const { item } = params;

  if (!item) {
    return null;
  }

  const [cart, setCart] = useState(true);
  const [qtd, setQtd] = useState(null);
  const [attr, setAttr] = useState(null);

  const { width: wWidth } = Dimensions.get('window');
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    dispatch(CompanyActions.getCompanyById(item));
  }, []);

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
            onPress={() => navigation.navigate('Cart')}
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
        {currentProduct ? (
          <Products
            currentProduct={currentProduct}
            setCurrentProduct={setCurrentProduct}
            productSheetRef={productSheetRef}
          />
        ) : null}
      </RBSheet>
      <CategorieSheet ref={categorieSheetRef} />
    </>
  );
}
