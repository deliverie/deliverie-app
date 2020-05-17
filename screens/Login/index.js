import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import {
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import FlashMessage, {
  showMessage,
} from 'react-native-flash-message';

import KeyboardSpacer from 'react-native-keyboard-spacer';

import RBSheet from 'react-native-raw-bottom-sheet';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { Formik } from 'formik';
import * as yup from 'yup';
import { MaterialCommunityIcons } from '@expo/vector-icons';

/** Internal Imports */
import { colors } from '../../styles';
/** Internal Imports Ends */

/** Components */
import Input from '../../components/Input';
import ButtonFill from '../../components/ButtonFill';
import H1 from '../../components/H1';
import H3 from '../../components/H3';

/** Components Ends */

/** REDUX */
import { useDispatch, useSelector } from 'react-redux';
import { Creators as LoginActions } from '../../store/ducks/login';
/** REDUX END */

export default function Login({ navigation }) {
  const dispatch = useDispatch();
  const login = useSelector((state) => state.login);

  // React.useEffect(() => {
  //   dispatch(LoginActions.loginLogout());
  // }, []);

  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 20,
        alignContent: 'center',
        justifyContent: 'center',
      }}
    >
      <SafeAreaView>
        <H1
          color={colors.primary}
          text="Faça seu login"
          align="center"
        />

        <Formik
          initialValues={{
            email: 'test@user.com',
            password: 'teste123',
          }}
          validationSchema={yup.object().shape({
            email: yup
              .string()
              .email('Digite um e-mail válido')
              .required('Campo obrigatório'),
            password: yup.string().required('Campo obrigatório'),
          })}
          onSubmit={(values) =>
            dispatch(LoginActions.loginRequest(values))
          }
        >
          {({
            values,
            handleChange,
            handleSubmit,
            errors,
            touched,
            setFieldTouched,
          }) => (
            <>
              <Input
                icon="account-outline"
                placeholder="Seu e-mail"
                keyboardType="email-address"
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={() => setFieldTouched('email')}
                msg={
                  touched.email && errors.email ? errors.email : null
                }
              />
              <Input
                icon="lock-outline"
                placeholder="Sua senha"
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={() => setFieldTouched('password')}
                secureTextEntry
                msg={
                  touched.password && errors.password
                    ? errors.password
                    : null
                }
              />

              <ButtonFill
                title="ENTRAR"
                color={colors.primary}
                // disabled={loading}
                loading={login.loading}
                onPress={handleSubmit}
                fontColor={colors.darker}
              />
            </>
          )}
        </Formik>
      </SafeAreaView>
    </ScrollView>
  );
}

Login.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({});
