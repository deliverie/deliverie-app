import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

import { SimpleLineIcons } from '@expo/vector-icons';
import SkeletonContent from 'react-native-skeleton-content';

/** Internal Imports */
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles';
import { colors } from '../../styles';
/** Internal Imports Ends */

/** Components */

/** Components Ends */

/** REDUX */
import { Creators as LocationsActions } from '../../store/ducks/locations';
/** REDUX END */

export default function CurrentPlace({ open, close, navigation }) {
  const [active, setActive] = React.useState(1);

  const { locations, currentLocation } = useSelector(
    state => state.locations,
  );
  const { data } = useSelector(state => state.login);

  // React.useEffect(() => {
  //   if (locations.length === 0) {
  //     open();
  //   }
  // }, []);

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
      <SkeletonContent
        containerStyle={{
          flex: 1,
          width: 300,
          marginLeft: 10,
          marginTop: 3,
        }}
        isLoading={false}
        layout={[
          { key: 'address', width: 220, height: 20, marginBottom: 6 },
        ]}
      >
        <TouchableOpacity
          onPress={() =>
            data ? navigation.navigate('Address') : open()
          }
          style={styles.addressContainer}
        >
          <Text style={styles.addressText}>
            {currentLocation
              ? `${currentLocation.street}, ${
                  currentLocation.number
                    ? `${currentLocation.number},`
                    : ''
                } ${
                  currentLocation.city
                    ? `${currentLocation.city}`
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
      </SkeletonContent>
    </SafeAreaView>
  );
}
