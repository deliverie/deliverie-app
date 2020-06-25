import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { colors } from '../../../styles';

import H1 from '../../../components/H1';

import { Creators as ProductsActions } from '../../../store/ducks/products';

export const Tabs = ({ categories }) => {
  const dispatch = useDispatch();

  const [tab, setTab] = useState(categories[0]);
  const [subTab, setSubtab] = useState(null);

  useEffect(() => {
    console.tron.log('Teste', tab);
    if (tab) {
      dispatch(
        ProductsActions.getProductsRequest({ category: tab.id }),
      );
    }
  }, [tab]);

  useEffect(() => {
    if (subTab) {
      dispatch(
        ProductsActions.getProductsRequest({
          category: tab.id,
          subcategory: subTab.id,
        }),
      );
    }
  }, [subTab]);

  return (
    <View
      style={{
        backgroundColor: colors.lighter,
        marginBottom: 10,
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
              borderColor: e === tab ? 'rgba(0,0,0,1)' : '#ccc',
              borderWidth: e === tab ? 2 : 2,
              backgroundColor: e === tab ? 'rgba(0,0,0,1)' : '#fff',
              bordeRadius: 100,
              marginHorizontal: 10,
              paddingHorizontal: 10,
              paddingVertical: 7,
              borderRadius: 100,
            }}
            key={e}
            onPress={() => {
              setTab(e);
              setSubtab(null);
            }}
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
              onPress={() => setSubtab(e)}
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
