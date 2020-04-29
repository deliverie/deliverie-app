import { Feather } from '@expo/vector-icons';
import * as React from 'react';
import { Text, View } from 'react-native';
import { metrics, colors } from '../../styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import styles from './styles';
import H3 from '../H3';
import H4 from '../H4';

export default function ShopListItem({ text, margin }) {
  return (
    <View style={styles.container}>
      <View style={styles.image} />
      <View
        style={{ flex: 1, paddingVertical: 5, paddingHorizontal: 10 }}
      >
        <H3 text="Cacau Show - Centro - Taquarituba" />
        <View style={{ flexDirection: 'row', marginTop: 4 }}>
          <H4 text="Variadas -" />
          <H4 text=" 2,2 km" />
          <H4 badge color={colors.primary} text=" Tem cupons" />
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 4,
            justifyContent: 'space-between',
            alignContent: 'center',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              marginRight: 5,
              alignContent: 'center',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <MaterialCommunityIcons
              name="clock-outline"
              size={12}
              color={colors.darker}
              style={{ marginRight: 3 }}
            />
            <H4 text="30-80 min" />
          </View>
          <View style={{ flexDirection: 'row' }}>
            <MaterialCommunityIcons
              name="bike"
              size={14}
              color={colors.darker}
              style={{ marginRight: 3 }}
            />
            <H4 text="R$ 3,30" />
          </View>
        </View>
      </View>
    </View>
  );
}
