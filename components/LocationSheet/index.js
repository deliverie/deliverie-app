import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import {
  Image,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { Formik } from 'formik';
import * as yup from 'yup';
import { MaterialCommunityIcons } from '@expo/vector-icons';

/** Internal Imports */
import { colors } from '../../styles';
import styles from './styles';
/** Internal Imports Ends */

/** Components */
import Input from '../Input';
import ButtonFill from '../ButtonFill';
import H1 from '../H1';
/** Components Ends */

const LocationSheet = React.forwardRef((props, ref) => {
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
    <RBSheet
      ref={ref}
      closeOnDragDown={true}
      closeOnPressMask={false}
      height={Dimensions.get('window').height - getStatusBarHeight()}
      customStyles={{
        wrapper: {
          backgroundColor: 'rgba(0,0,0,0.4)',
        },
        draggableIcon: {
          backgroundColor: colors.primary,
        },
        container: {
          backgroundColor: 'white',
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        },
      }}
    >
      <Formik
        initialValues={
          {
            // cep: "86300-000",
            // number: ""
          }
        }
        onSubmit={(values) =>
          this.setState(
            { cep: values.cep, number: values.number },
            () => this.handleClick(),
          )
        }
        validationSchema={schema}
      >
        {({ values, handleChange, handleSubmit, errors }) => (
          <View style={styles.container}>
            <View>
              <H1 text="Adicione um endereço" />
              <Input
                mask="zip-code"
                name="CEP"
                keyboardType="number-pad"
                placeholder="Insira seu CEP"
                value={values.cep}
                onChangeText={handleChange('cep')}
                msg={errors.cep ? errors.cep : null}
              />
              <Input
                keyboardType="number-pad"
                placeholder="Insira o número da residência"
                value={values.number}
                onChangeText={handleChange('number')}
                msg={errors.number ? errors.number : null}
              />
            </View>

            <ButtonFill
              title={'AVANÇAR'}
              fontColor={colors.darker}
              color={colors.primary}
              loading={loading}
              onPress={() => handleSubmit()}
            />
          </View>
        )}
      </Formik>
    </RBSheet>
  );
});

export default LocationSheet;
