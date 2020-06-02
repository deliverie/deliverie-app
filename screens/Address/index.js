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
} from '@expo/vector-icons';

import H4 from '../../components/H4';
import SimpleHeader from '../../components/SimpleHeader';
import Input from '../../components/Input';
import ButtonFill from '../../components/ButtonFill';
import KeyboardSpacer from 'react-native-keyboard-spacer';

import { colors } from '../../styles';

export default function Address({ navigation }) {
  const dispatch = useDispatch();
  const locations = useSelector(state => state.locations);
  const [showPasswords, setShowPasswords] = React.useState(false);

  React.useEffect(() => {
    dispatch(LocationsActions.getLocations());
  }, []);
  React.useEffect(() => {
    console.tron.log('alterou o location', locations);
  }, [locations]);

  function handleAddress() {
    Alert.alert(
      'O que você desaja fazer?',
      '',
      [
        {
          text: 'Excluir',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Alterar',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Tornar principal',
          onPress: () => console.log('OK Pressed'),
        },
      ],
      { cancelable: false },
    );
  }

  function renderLocations() {
    return (
      <FlatList
        data={locations.locations}
        renderItem={({ item }) => {
          return (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 20,
              }}
            >
              <View
                style={{
                  borderWidth: 2,
                  padding: 10,
                  borderColor: item.is_active
                    ? colors.primary
                    : '#ccc',
                  borderRadius: 5,
                  flexDirection: 'row',
                  flex: 1,
                }}
              >
                <TouchableOpacity
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <View
                    style={{
                      width: 28,
                      height: 28,
                      backgroundColor: '#ccc',
                      borderRadius: 15,
                      marginRight: 10,
                      padding: 6,
                    }}
                  >
                    <View
                      style={{
                        width: 15,
                        height: 15,
                        backgroundColor: item.is_active
                          ? colors.primary
                          : '#ccc',
                        borderRadius: 15,
                        marginRight: 10,
                      }}
                    />
                  </View>
                  <View style={{}}>
                    <Text>Rua: {item.street}</Text>
                    <Text>Número: {item.number}</Text>
                    <Text>Bairro: {item.district}</Text>
                    <Text>CEP: {item.zipcode}</Text>
                  </View>
                </TouchableOpacity>
              </View>

              <Ionicons
                name="md-trash"
                size={22}
                color={colors.secundary}
                style={{ paddingLeft: 20 }}
                onPress={() => console.log('Apagar')}
              />
            </View>
          );
        }}
        keyExtractor={item => String(item.id)}
      />
    );
  }
  return (
    <View style={styles.container}>
      <SimpleHeader text="Seus endereços" />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {locations.loading ? (
          <ActivityIndicator />
        ) : (
          renderLocations()
        )}
        <TouchableOpacity
          onPress={() => navigation.navigate('Zipcode')}
          style={{
            borderTopWidth: 1,
            borderTopColor: '#ccc',
            paddingTop: 10,
            flexDirection: 'row',
            flex: 1,

            alignItems: 'center',
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',

              flex: 1,
            }}
          >
            <Ionicons
              name="md-pin"
              size={22}
              color={colors.secundary}
            />
            <View>
              <Text
                style={{
                  color: colors.secundary,
                  fontSize: 17,
                  marginLeft: 12,
                }}
              >
                Adicionar novo endereço
              </Text>
              <Text
                style={{
                  color: colors.darker,
                  fontSize: 15,
                  marginLeft: 12,
                }}
              >
                Insira seu CEP
              </Text>
            </View>
          </View>
          <AntDesign name="plus" size={24} color={colors.primary} />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  contentContainer: {
    paddingTop: 15,
    paddingHorizontal: 20,
  },
  optionIconContainer: {
    marginRight: 12,
  },
  option: {
    backgroundColor: '#fdfdfd',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 0,
    borderColor: '#ededed',
  },
  lastOption: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  optionText: {
    fontSize: 15,
    alignSelf: 'flex-start',
    marginTop: 1,
    fontWeight: '300',
  },
});
