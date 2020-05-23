import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import {
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Platform,
  StatusBar,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import FlashMessage, {
  showMessage,
} from 'react-native-flash-message';

import RBSheet from 'react-native-raw-bottom-sheet';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { Formik } from 'formik';
import * as yup from 'yup';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { useDispatch, useSelector } from 'react-redux';
import CurrentPlace from '../components/CurrentPlace';

/** Internal Imports */
import { colors } from '../styles';
/** Internal Imports Ends */

/** Components */
import Input from '../components/Input';
import ShopListItem from '../components/ShopListItem';
import LocationSheet from '../components/LocationSheet';
import H1 from '../components/H1';
/** Components Ends */

/** REDUX */
import { Creators as LocationsActions } from '../store/ducks/locations';
/** REDUX END */

export default function HomeScreen() {
  const locationSheet = React.useRef();
  const [loading, setLoading] = React.useState(true);

  const schema = () =>
    yup.object().shape({
      cep: yup
        .string()
        .matches(/[0-9]{5}-[0-9]{3}/, 'CEP inválido')
        .required('Preencha o CEP corretamente'),
      number: yup
        .number('Insira um número válido')
        .min(1)
        .required('Insira um número'),
    });

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}
    >
      <CurrentPlace
        open={() => locationSheet.current.open()}
        close={() => locationSheet.current.close()}
      />
      <H1 text="37 estabelecimentos" margin />
      <LocationSheet ref={locationSheet} />
      <View>
        <ShopListItem />
        <ShopListItem />
        <ShopListItem />
      </View>
    </ScrollView>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({});
