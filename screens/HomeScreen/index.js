import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { useDispatch, useSelector } from 'react-redux';
import SkeletonContent from 'react-native-skeleton-content';
import { Card } from 'react-native-paper';
import CurrentPlace from '../../components/CurrentPlace';

/** Internal Imports */
import { colors, metrics } from '../../styles';
/** Internal Imports Ends */

/** Components */
import Input from '../../components/Input';
import ShopListItem from '../../components/ShopListItem';
import LocationSheet from '../../components/LocationSheet';
import H1 from '../../components/H1';
/** Components Ends */

import styles from './styles';

/** REDUX */
import * as company from '../../store/ducks/company';
/** REDUX END */

const firstLayout = [
  {
    width: 65,
    height: 70,
  },
];
const secondLayout = [
  {
    width: 150,
    height: 20,
    marginBottom: 2,
  },
  {
    width: 130,
    height: 20,
    marginBottom: 2,
  },
  {
    width: 80,
    height: 20,
  },
];

export default function HomeScreen() {
  const locationSheet = useRef();
  const dispatch = useDispatch();
  const { loading, company: dataCompany, total } = useSelector(
    state => state.company,
  );

  useEffect(() => {
    dispatch(company.actions.getCompany());
  }, []);

  const LoadingShop = () =>
    [...Array(6).keys()].map(e => (
      <View key={e} style={styles.loadingContainer}>
        <Card>
          <View style={styles.loading}>
            <SkeletonContent
              containerStyle={{ flex: 1, padding: 5 }}
              layout={firstLayout}
              isLoading
            />
            <SkeletonContent
              layout={secondLayout}
              containerStyle={{ flex: 4 }}
              isLoading
            />
          </View>
        </Card>
      </View>
    ));

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}
    >
      <CurrentPlace
        open={() => locationSheet.current.open()}
        close={() => locationSheet.current.close()}
      />
      {loading ? (
        <SkeletonContent
          isLoading
          layout={[{ width: 150, height: 20 }]}
          containerStyle={{
            marginHorizontal: metrics.baseMargin,
            marginBottom: metrics.baseMargin,
          }}
        />
      ) : (
        <H1 text={`${total} estabelecimentos`} margin />
      )}
      <LocationSheet ref={locationSheet} />
      {loading ? (
        <LoadingShop />
      ) : (
        <View>
          {dataCompany?.map(e => (
            <ShopListItem key={e} item={e} />
          ))}
        </View>
      )}
    </ScrollView>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};
