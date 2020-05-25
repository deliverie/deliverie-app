import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { colors } from '../../../styles';
import { Ionicons } from '@expo/vector-icons';

import H1 from '../../../components/H1';

export const Tabs = ({ categories }) => {
  const [tab, setTab] = useState(categories[0]);
  useEffect(() => {
    console.tron.log(tab);
  }, [tab]);
  return (
    <View
      style={{
        backgroundColor: colors.lighter,
      }}
    >
      <View style={{ marginHorizontal: 20, marginVertical: 10 }}>
        <H1 text="Departamentos" />
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{}}
      >
        {categories.map(e => (
          <TouchableOpacity
            style={{
              borderColor: e === tab ? 'rgba(34,60,120,1)' : '#ccc',
              borderWidth: e === tab ? 2 : 2,
              backgroundColor:
                e === tab ? 'rgba(34,60,120,1)' : '#fff',
              bordeRadius: 100,
              marginHorizontal: 10,
              paddingHorizontal: 10,
              paddingVertical: 7,
              borderRadius: 100,
            }}
            key={e}
            onPress={() => setTab(e)}
          >
            <Text
              style={{
                color: e === tab ? colors.white : colors.regular,
                fontWeight: e === tab ? 'bold' : '300',
              }}
            >
              {e.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {tab?.subcategories.length > 0 && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{}}
        >
          {tab?.subcategories.map(e => (
            <TouchableOpacity
              style={{
                paddingHorizontal: 12,
                paddingVertical: 12,
                flexDirection: 'row',
              }}
              key={e}
              onPress={() => setTab(e)}
            >
              <Ionicons
                name="ios-arrow-forward"
                size={16}
                color="black"
              />
              <Text
                style={{
                  color: e === tab ? colors.regular : colors.regular,
                  fontWeight: e === tab ? 'bold' : '300',
                  marginLeft: 7,
                }}
              >
                {e.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};
