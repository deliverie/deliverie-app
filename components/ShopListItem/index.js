import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as React from 'react';
import { TouchableOpacity, Image, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Card } from 'react-native-paper';
import { colors } from '../../styles';

import styles from './styles';
import H3 from '../H3';
import H4 from '../H4';

export default function ShopListItem({ item }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Company', { item })}
    >
      <Card style={styles.card}>
        <View style={styles.container}>
          {item?.photo ? (
            <Image
              style={styles.image}
              source={{ uri: `http://206.189.219.178/${item.photo}` }}
            />
          ) : (
            <View style={styles.image} />
          )}
          <View
            style={{
              flex: 1,
              paddingVertical: 10,
              paddingHorizontal: 10,
            }}
          >
            {/* <H3 text={item.fantasy_name} /> */}
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
      </Card>
    </TouchableOpacity>
  );
}
