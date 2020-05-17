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
import { Creators as LocationsActions } from '../../store/ducks/locations';
/** REDUX END */

const schema = () =>
  yup.object().shape({
    email: yup
      .string()
      .email('Digite um e-mail valido')
      .required('Digite um e-mail'),
    senha: yup.string().required('Digite sua senha'),
  });

export default function Register({ navigation }) {
  const locationSheet = React.useRef();
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    console.log(locationSheet.current);
  }, []);

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
          text="Faça seu cadastro"
          align="center"
        />

        <Formik
          key="login"
          initialValues={{ email: '', senha: '' }}
          onSubmit={(values) => saveAddres(values)}
          validationSchema={schema}
        >
          {({
            values,
            handleChange,
            handleSubmit,
            errors,
            isValid,
          }) => (
            <ScrollView contentContainerStyle={styles.container}>
              <View style={{ alignItems: 'center' }}>
                <Input
                  name="Nome"
                  placeholder="Digite seu e-mail"
                  value={values.numero}
                  onChangeText={handleChange('numero')}
                  msg={errors.numero ? errors.numero : null}
                />
                <Input
                  name="E-mail"
                  placeholder="Digite seu e-mail"
                  value={values.numero}
                  onChangeText={handleChange('numero')}
                  msg={errors.numero ? errors.numero : null}
                />
                <Input
                  name="Telefone"
                  placeholder="Digite seu e-mail"
                  value={values.numero}
                  onChangeText={handleChange('numero')}
                  msg={errors.numero ? errors.numero : null}
                />
                <Input
                  name="Senha"
                  placeholder="Digite sua senha"
                  value={values.complemento}
                  onChangeText={handleChange('complemento')}
                  msg={errors.complemento ? errors.complemento : null}
                  secureTextEntry
                />
              </View>
              <ButtonFill
                title={'Entrar'}
                fontColor={colors.darker}
                disabled={!isValid}
                color={colors.primary}
                loading={loading}
                onPress={() => handleSubmit()}
              />

              <KeyboardSpacer topSpacing={-40} />
            </ScrollView>
          )}
        </Formik>

        <ButtonFill
          title={'Voltar para o Login'}
          fontColor={colors.white}
          color={colors.secundary}
          loading={loading}
          onPress={() => navigation.goBack()}
        />
      </SafeAreaView>
    </ScrollView>
  );
}

Register.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({});
