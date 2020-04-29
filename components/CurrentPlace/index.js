import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

import { SimpleLineIcons } from '@expo/vector-icons';

/** Internal Imports */
import styles from './styles';
import { colors } from '../../styles';
/** Internal Imports Ends */

/** Components */

/** Components Ends */

/** REDUX */
import { useDispatch, useSelector } from 'react-redux';
import { Creators as LocationsActions } from '../../store/ducks/locations';
/** REDUX END */

export default function CurrentPlace({ open, close }) {
  const [active, setActive] = React.useState(1);

  const { locations, currentLocation } = useSelector(
    (state) => state.locations,
  );

  React.useEffect(() => {
    console.tron.log(locations);
  }, []);

  function handleActive(index) {
    if (index !== active) {
      setActive(index);
    }
  }
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => handleActive(1)}
          style={[
            styles.button,
            active === 1 ? styles.buttonActive : [],
          ]}
        >
          <Text
            style={active === 1 ? styles.textActive : styles.text}
          >
            Entrega
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleActive(2)}
          style={[
            styles.button,
            active === 2 ? styles.buttonActive : [],
          ]}
        >
          <Text
            style={active === 2 ? styles.textActive : styles.text}
          >
            Retirada
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => open()}
        style={styles.addressContainer}
      >
        <Text style={styles.addressText}>
          {currentLocation
            ? `${currentLocation.logradouro}, ${
                currentLocation.numero
                  ? `${currentLocation.numero},`
                  : ''
              } ${
                currentLocation.localidade
                  ? `${currentLocation.localidade}`
                  : ''
              }`
            : 'Adicione um endereço'}
        </Text>
        <SimpleLineIcons
          name="arrow-down"
          size={10}
          color={colors.primary}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
