import { StyleSheet } from 'react-native';
import { metrics, colors } from '../../styles';

import { hpd } from '../../utils/scalling';

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#f1f1f1',
    backgroundColor: colors.white,
    borderRadius: metrics.baseRadius * 3,
    padding: metrics.basePadding / 2,
    alignItems: 'center',
    shadowColor: 'rgba(0,0,0,0.3)',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 3,
  },
  input: {
    color: colors.darker,
    fontWeight: '300',
    width: '50%',
  },
  text: {
    paddingBottom: 3,
    marginTop: 10,
    fontSize: 12,
  },
});

export default styles;
