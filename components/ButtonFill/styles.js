import { StyleSheet } from 'react-native';
import { colors } from '../../styles';

import { wpd, hpd } from '../../utils/scalling';

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: colors.secundary,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: wpd(4),
    paddingVertical: wpd(3),
    marginVertical: hpd(2),
  },
  buttonText: {
    color: colors.white,
    fontWeight: 'bold',
  },
});

export default styles;
