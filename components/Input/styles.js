import { StyleSheet } from 'react-native';
import { metrics, colors } from '../../styles';

import { hpd } from '../../utils/scalling';

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
  },
  input: {
    color: colors.darker,
    fontWeight: '300',
    paddingBottom: 10,
    paddingTop: 3,
    width: '50%',
  },
  text: {
    paddingBottom: 3,
    marginTop: 10,
    fontSize: 12,
  },
});

export default styles;
