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
              <Text>Pedido</Text>
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
});
