import { StyleSheet } from 'react-native';

import { metrics, colors } from '../../styles';

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors.lighter,
    marginHorizontal: metrics.baseMargin,
    flexDirection: 'row',
    borderRadius: 5,
    marginTop: 10,
  },
  image: {
    width: 65,
    height: 65,
    backgroundColor: 'blue',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
});

export default styles;
