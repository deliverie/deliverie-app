import { Feather } from '@expo/vector-icons';
import * as React from 'react';
import { Text } from 'react-native';
import { metrics } from '../../styles';

export default function H3({ text, margin }) {
  return (
    <Text
      style={[
        { fontSize: 14, fontWeight: '400' },
        margin ? { marginHorizontal: metrics.baseMargin } : {},
      ]}
    >
      {text}
    </Text>
  );
}
