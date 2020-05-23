import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { colors } from '../../../styles';

export const Tabs = () => {
  const [tab, setTab] = useState(0);
  return (
    <View
      style={{
        backgroundColor: colors.lighter,
      }}
    >
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
        }}
      >
        {[...Array(6).keys()].map(e => (
          <TouchableOpacity key={e} onPress={() => setTab(e)}>
            <View
              style={{
                padding: 10,
                borderBottomColor: colors.primary,
                borderBottomWidth: e === tab ? 5 : 0,
                borderBottomLeftRadius: e === tab ? 5 : 0,
                borderBottomRightRadius: e === tab ? 5 : 0,
              }}
            >
              <Text
                style={{
                  color: colors.regular,
                }}
              >
                CATEGORIA
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};
