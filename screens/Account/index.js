import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
} from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';

import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { Creators as LoginActions } from '../../store/ducks/login';
import logo from '../../assets/images/logo-colored-small.png';
import { wpd } from '../../utils/scalling';

import H1 from '../../components/H1';
import { metrics } from '../../styles';

export default function Account({ navigation }) {
  const dispatch = useDispatch();
  const { data } = useSelector(state => state.login);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
        }}
      >
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <View
            style={{
              flex: 2,
              alignItems: 'center',
            }}
          >
            <Image style={{ width: 64, height: 64 }} source={logo} />
            {data && (
              <View style={{ margin: 10 }}>
                <H1 text={`Olá, ${data?.user?.name}`} />
              </View>
            )}
          </View>
          <View style={{ flex: 1 }}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <View
                style={{
                  marginBottom: 5,
                  width: wpd(80),
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
                <Text
                  style={{
                    fontFamily: 'roboto-bold',
                    textAlign: 'center',
                    marginBottom: metrics.baseMargin,
                  }}
                >
                  {data?.user?.email?.toUpperCase()}
                </Text>
                <Text>
                  Registrado desde:{' '}
                  {data &&
                    moment(data?.user?.created_at).format(
                      'DD/MM/YYYY',
                    )}
                </Text>
                <Text>Pedidos realizados: 10</Text>
              </View>
            </View>
            <View style={{ marginTop: metrics.baseMargin * 3 }}>
              <OptionButton
                icon="md-person"
                label="Alterar perfil"
                onPress={() => navigation.navigate('Profile')}
              />
              <OptionButton
                icon="md-compass"
                label="Alterar endereço"
                onPress={() => navigation.navigate('Address')}
              />
              <OptionButton
                icon="md-log-out"
                label="Sair"
                onPress={() => dispatch(LoginActions.loginLogout())}
                isLastOption
                colorIcon="#e42618"
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
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
            color={colorIcon || 'rgba(0,0,0,0.35)'}
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
