import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';

import { useDispatch, useSelector } from 'react-redux';
import { Creators as LoginActions } from '../../store/ducks/login';

import H1 from '../../components/H1';

export default function Account() {
  const dispatch = useDispatch();
  const login = useSelector(state => state.login);
  React.useEffect(() => {
    console.tron.log(login);
  }, []);
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <SafeAreaView>
        {login.data && (
          <View style={{ margin: 10 }}>
            <H1 text={`Olá, ${login.data.user.name}`} />
          </View>
        )}
        <OptionButton
          icon="md-person"
          label="Alterar perfil"
          onPress={() =>
            WebBrowser.openBrowserAsync('https://docs.expo.io')
          }
        />

        <OptionButton
          icon="md-compass"
          label="Alterar endereço"
          onPress={() =>
            WebBrowser.openBrowserAsync('https://reactnavigation.org')
          }
        />

        <OptionButton
          icon="md-log-out"
          label="Sair"
          onPress={() => dispatch(LoginActions.loginLogout())}
          isLastOption
          colorIcon="#e42618"
        />
      </SafeAreaView>
    </ScrollView>
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
