import * as React from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  Text,
  View,
  SafeAreaView,
  FlatList,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import {
  RectButton,
  ScrollView,
  TouchableOpacity,
} from 'react-native-gesture-handler';

import { useDispatch, useSelector } from 'react-redux';
import { Creators as LocationsActions } from '../../../store/ducks/locations';

import { useKeyboard } from '../../../Hooks/KeyboardHeight';

import apiViaCep from '../../../services/viacep';
import { showToast } from '../../../utils/toast';

import { Formik } from 'formik';
import * as yup from 'yup';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

import H4 from '../../../components/H4';
import SimpleHeader from '../../../components/SimpleHeader';
import Input from '../../../components/Input';
import ButtonFill from '../../../components/ButtonFill';
import KeyboardSpacer from 'react-native-keyboard-spacer';

import { colors } from '../../../styles';

export default function Zipcode({ navigation }) {
  const dispatch = useDispatch();
  const locations = useSelector(state => state.locations);
  const [keyboardHeight] = useKeyboard();

  const [onlyCep, setOnlyCep] = React.useState(true);
  const [cepResponse, setCepResponse] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    console.tron.log('tamanho do teclado', keyboardHeight);
    dispatch(LocationsActions.getLocations());
  }, []);
  React.useEffect(() => {
    console.tron.log('alterou o location', locations);
  }, [locations]);

  async function checkCep(values) {
    setLoading(true);
    try {
      const response = await apiViaCep.get(
        `${values.replace('-', '')}/json`,
      );
      if (response.data.erro) {
        showToast(
          'Ops!',
          'O CEP que você digitou não existe',
          'danger',
        );
      } else {
        console.tron.log(response.data);
        setCepResponse(response.data);
        setTimeout(() => {
          setOnlyCep(false);
        }, 200);
        showToast(
          'Oba!',
          'O CEP que você digitou não existe',
          'success',
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
    setLoading(false);
  }

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
      <SimpleHeader
        goBack={
          onlyCep ? () => navigation.goBack() : () => setOnlyCep(true)
        }
        text="Insira um CEP"
      />
      {onlyCep && (
        <View style={styles.contentContainer}>
          <Formik
            key="cep-form"
            initialValues={{
              cep: '',
            }}
            onSubmit={values => checkCep(values.cep)}
            validationSchema={yup.object().shape({
              cep: yup.string().required('Campo obrigatório'),
            })}
          >
            {({
              values,
              handleChange,
              handleSubmit,
              errors,
              isValid,
              touched,
              setFieldTouched,
            }) => (
              <>
                <Input
                  mask="zip-code"
                  icon="home-outline"
                  placeholder="Ex: 17730-123"
                  keyboardType="email-address"
                  value={values.cep}
                  onChangeText={handleChange('cep')}
                  onBlur={() => setFieldTouched('cep')}
                  msg={touched.cep && errors.cep ? errors.cep : null}
                  disabled={!onlyCep ? true : false}
                />

                {onlyCep && (
                  <ButtonFill
                    title="BUSCAR"
                    fontColor={colors.white}
                    disabled={!isValid}
                    color={colors.primary}
                    loading={loading}
                    onPress={() => handleSubmit()}
                  />
                )}
              </>
            )}
          </Formik>
        </View>
      )}
      {cepResponse && !onlyCep && (
        <Formik
          initialValues={{
            cep: cepResponse?.cep,
            street: cepResponse?.logradouro,
            number: cepResponse?.numero,
            district: cepResponse?.bairro,
            city: cepResponse?.localidade,
            state: cepResponse?.uf,
            complement: cepResponse?.complemento,
          }}
          validationSchema={yup.object().shape({
            street: yup.string().required('Campo obrigatório'),
            number: yup.string().required('Campo obrigatório'),
            district: yup.string().required('Campo obrigatório'),
            city: yup.string().required('Campo obrigatório'),
            state: yup.string().required('Campo obrigatório'),
            complement: yup.string().required('Campo obrigatório'),
          })}
          onSubmit={values => checkCep(values.cep)}
        >
          {({
            values,
            handleChange,
            handleSubmit,
            errors,
            touched,
            setFieldTouched,
          }) => (
            <KeyboardAvoidingView
              behavior={'padding'}
              style={styles.containerKey}
            >
              <ScrollView style={styles.scrollView}>
                <Input
                  mask="zip-code"
                  icon="home-outline"
                  placeholder="Ex: 17730-123"
                  keyboardType="email-address"
                  value={values.cep}
                  onChangeText={handleChange('cep')}
                  onBlur={() => setFieldTouched('cep')}
                  msg={touched.cep && errors.cep ? errors.cep : null}
                  disabled={!onlyCep ? true : false}
                />
                <Input
                  name="Cidade"
                  placeholder="Sua cidade"
                  value={values.city}
                  onChangeText={handleChange('city')}
                  msg={errors.city ? errors.city : null}
                  disabled
                />
                <Input
                  name="Estado"
                  placeholder="UF"
                  value={values.state}
                  onChangeText={handleChange('state')}
                  msg={errors.state ? errors.state : null}
                  disabled
                />

                <Input
                  name="Endereço"
                  placeholder="Rua, Av..."
                  value={values.street}
                  onChangeText={handleChange('street')}
                  msg={errors.street ? errors.street : null}
                />
                <Input
                  name="Bairo"
                  placeholder="Seu bairro"
                  value={values.district}
                  onChangeText={handleChange('district')}
                  msg={errors.district ? errors.district : null}
                />
                <Input
                  name="Número"
                  placeholder=""
                  value={values.number}
                  onChangeText={handleChange('number')}
                  msg={errors.number ? errors.number : null}
                />
                <Input
                  name="Complemento"
                  placeholder="Ex: Apt 11, Esquina"
                  value={values.complement}
                  onChangeText={handleChange('complement')}
                  msg={errors.complement ? errors.complement : null}
                />
                <ButtonFill
                  title="SALVAR"
                  color={colors.primary}
                  // disabled={loading}
                  // loading={login.loading}
                  onPress={handleSubmit}
                  fontColor={colors.white}
                />
              </ScrollView>
            </KeyboardAvoidingView>
          )}
        </Formik>
      )}
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
  containerKey: {
    flex: 1,
  },
  scrollView: { paddingHorizontal: 20 },
  input: {
    marginBottom: 20,
    borderBottomWidth: 2,
    borderColor: '#dbdbdb',
    padding: 10,
  },
});
