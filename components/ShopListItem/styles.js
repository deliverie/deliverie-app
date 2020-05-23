import { StyleSheet } from 'react-native';

import { metrics, colors } from '../../styles';
import { wpd } from '../../utils/scalling';

const styles = StyleSheet.create({
  card: {
    marginHorizontal: metrics.baseMargin,
    marginBottom: 5,
  },
  container: {
    flexDirection: 'row',
    borderRadius: 5,
  },
  image: {
    width: 65,
    backgroundColor: 'blue',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
});

export default styles;
