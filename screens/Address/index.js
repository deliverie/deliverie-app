import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
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
import { MaterialCommunityIcons } from '@expo/vector-icons';

import H4 from '../../components/H4';
import SimpleHeader from '../../components/SimpleHeader';
import Input from '../../components/Input';
import ButtonFill from '../../components/ButtonFill';
import KeyboardSpacer from 'react-native-keyboard-spacer';

import { colors } from '../../styles';

export default function Address() {
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
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 20,
              }}
              onPress={() => handleAddress()}
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
              <View
                style={{
                  backgroundColor: colors.white,
                  flex: 1,
                  padding: 10,
                  borderWidth: 2,
                  borderColor: item.is_active
                    ? colors.primary
                    : '#ccc',
                  borderRadius: 5,
                }}
              >
                <Text>Rua: {item.street}</Text>
                <Text>Número: {item.number}</Text>
                <Text>Bairro: {item.district}</Text>
                <Text>CEP: {item.zipcode}</Text>
              </View>
            </TouchableOpacity>
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
        <SafeAreaView>
          {locations.loading ? (
            <ActivityIndicator />
          ) : (
            renderLocations()
          )}
        </SafeAreaView>
      </ScrollView>
    </View>
  );
}

function OptionButton({
  icon,
  label,
  onPress,
  isLastOption,
  colorIcon,
}) {
  return (
    <RectButton
      style={[styles.option, isLastOption && styles.lastOption]}
      onPress={onPress}
    >
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.optionIconContainer}>
          <Ionicons
            name={icon}
            size={22}
            color={colorIcon ? colorIcon : 'rgba(0,0,0,0.35)'}
          />
        </View>
        <View style={styles.optionTextContainer}>
          <Text
            style={[
              styles.optionText,
              colorIcon ? { color: colorIcon } : {},
            ]}
          >
            {label}
          </Text>
        </View>
      </View>
    </RectButton>
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
