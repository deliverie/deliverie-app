import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import {
  RectButton,
  ScrollView,
  TouchableOpacity,
} from 'react-native-gesture-handler';

import { useDispatch, useSelector } from 'react-redux';
import { Creators as ProfileActions } from '../../store/ducks/profile';

import { Formik } from 'formik';
import * as yup from 'yup';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import H4 from '../../components/H4';
import SimpleHeader from '../../components/SimpleHeader';
import Input from '../../components/Input';
import ButtonFill from '../../components/ButtonFill';
import KeyboardSpacer from 'react-native-keyboard-spacer';

import { colors } from '../../styles';

export default function Profile() {
  const dispatch = useDispatch();
  const login = useSelector(state => state.login);
  const [showPasswords, setShowPasswords] = React.useState(false);
  return (
    <View style={styles.container}>
      <SimpleHeader text={login.data.user.name} />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <SafeAreaView>
          <Formik
            key="login"
            initialValues={{
              name: login.data.user.name,
              email: login.data.user.email,
              phone: `${login.data.user.phone_ddd}${login.data.user.phone_num}`,
              cpf: login.data.user.cpf,
            }}
            onSubmit={values =>
              dispatch(ProfileActions.profileUpdateRequest(values))
            }
            validationSchema={yup.object().shape({
              email: yup
                .string()
                .email('Digite um e-mail válido')
                .required('Campo obrigatório'),
              password: yup.string(),
            })}
          >
            {({
              values,
              handleChange,
              handleSubmit,
              errors,
              isValid,
              setFieldTouched,
            }) => (
              <ScrollView>
                <View style={{ alignItems: 'center' }}>
                  <Input
                    icon="account-outline"
                    name="Nome"
                    placeholder="Digite seu e-mail"
                    value={values.name}
                    onChangeText={handleChange('name')}
                    onBlur={() => setFieldTouched('name')}
                    msg={errors.name ? errors.name : null}
                  />
                  <Input
                    icon="email-outline"
                    name="E-mail"
                    placeholder="Digite seu e-mail"
                    value={values.email}
                    onChangeText={handleChange('email')}
                    msg={errors.email ? errors.email : null}
                    disabled
                  />
                  <Input
                    mask="cpf"
                    icon="card-text-outline"
                    name="Cpf"
                    placeholder="Digite seu e-mail"
                    value={values.cpf}
                    onChangeText={handleChange('cpf')}
                    msg={errors.cpf ? errors.cpf : null}
                    disabled
                  />
                  <Input
                    icon="phone-in-talk"
                    mask="cel-phone"
                    name="Telefone"
                    placeholder="Digite seu telefone"
                    value={values.phone}
                    onChangeText={handleChange('phone')}
                    onBlur={() => setFieldTouched('phone')}
                    msg={errors.phone ? errors.phone : null}
                  />
                  <TouchableOpacity
                    onPress={() => setShowPasswords(!showPasswords)}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingTop: 20,
                    }}
                  >
                    <MaterialCommunityIcons
                      name="lock-outline"
                      size={22}
                      color={colors.primary}
                      style={{ paddingRight: 10 }}
                    />
                    <Text style={{ color: colors.darker }}>
                      Alterar senha
                    </Text>
                  </TouchableOpacity>
                  {showPasswords && (
                    <View style={{ flex: 1, alignSelf: 'stretch' }}>
                      <Input
                        icon="lock-outline"
                        name="Nova senha"
                        placeholder="Digite sua nova senha senha"
                        value={values.password}
                        onChangeText={handleChange('password')}
                        onBlur={() => setFieldTouched('password')}
                        msg={errors.password ? errors.password : null}
                        secureTextEntry
                      />
                    </View>
                  )}
                </View>
                <ButtonFill
                  title={'Atualizar'}
                  fontColor={colors.white}
                  disabled={!isValid}
                  color={colors.primary}
                  onPress={() => handleSubmit()}
                />

                <KeyboardSpacer topSpacing={-40} />
              </ScrollView>
            )}
          </Formik>
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
