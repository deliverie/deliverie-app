import * as React from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Alert,
} from 'react-native';
import {
  RectButton,
  ScrollView,
  TouchableOpacity,
} from 'react-native-gesture-handler';

import { useDispatch, useSelector } from 'react-redux';
import { Creators as LocationsActions } from '../../store/ducks/locations';

import { Formik } from 'formik';
import * as yup from 'yup';
import {
  MaterialCommunityIcons,
  Ionicons,
  AntDesign,
  Feather,
} from '@expo/vector-icons';

import H4 from '../../components/H4';
import SimpleHeader from '../../components/SimpleHeader';

import RNAnimatedTabs from 'rn-animated-tabs';

import { colors } from '../../styles';
const DATA = ['Top Tab 1 Content', 'Extra Stuff for Top Tab 2'];

export default function Orders({ navigation }) {
  const dispatch = useDispatch();
  const locations = useSelector(state => state.locations);
  const [currentTab, setCurrentTab] = React.useState(0);

  React.useEffect(() => {
    dispatch(LocationsActions.getLocations());
  }, []);

  function handleTabs(value) {
    setCurrentTab(value);
  }

  return (
    <View style={styles.container}>
      <SimpleHeader text="Seus pedidos" />
      <RNAnimatedTabs
        tabTitles={['EM ANDAMENTO', 'ANTERIORES']}
        onChangeTab={handleTabs}
        containerStyle={styles.tabContainerStyle}
        tabButtonStyle={styles.tabButtonStyle}
        tabTextStyle={styles.tabTextStyle}
        activeTabIndicatorColor={colors.primary}
        height={50}
      />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.content}>
          <View style={{ marginBottom: 20 }}>
            <View
              style={{
                flexDirection: 'row',
                marginBottom: 15,
              }}
            >
              <Feather
                name="calendar"
                size={17}
                color={colors.darker}
              />
              <Text
                style={{
                  fontWeight: '500',
                  color: colors.dark,
                  marginLeft: 10,
                }}
              >
                05 de junho de 2020{' '}
              </Text>
            </View>
            <View style={styles.cardItem}>
              <View style={styles.cardItemHeader}>
                <View style={styles.cardItemLogo} />
                <View>
                  <Text style={styles.cardItemCompanyText}>
                    Chapão Burger
                  </Text>
                  <Text style={styles.cardItemCompanyDescription}>
                    Entregue em 06/06/2020 às 23:23
                  </Text>
                </View>
              </View>
              <View
                style={{
                  position: 'absolute',
                  top: 10,
                  right: 10,
                  borderRadius: 4,
                  paddingHorizontal: 10,
                }}
              >
                <Text
                  style={{
                    fontSize: 13,
                    color: colors.darker,
                    fontWeight: 'bold',
                  }}
                >
                  #21343
                </Text>
              </View>
              <View style={styles.cardItemsContainer}>
                <View style={styles.cardItemsSingleContainer}>
                  <Text style={styles.cardItemsSingleQty}>143</Text>
                  <Text style={styles.cardItemsSingleText}>
                    X BACON
                  </Text>
                </View>
              </View>
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
    margin: 20,
  },
  tabContainerStyle: {
    backgroundColor: '#f9f9f9',
  },
  tabButtonStyle: {},
  tabTextStyle: {
    fontSize: 15,
    fontFamily: 'roboto',
    color: colors.darker,
  },
  cardItem: {
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 5,
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
    borderBottomWidth: 1,
    borderColor: '#f1f1f1',
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
  cardItemCompanyDescription: {
    color: colors.dark,
    fontSize: 14,
    fontWeight: '300',
    marginLeft: 10,
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
});
