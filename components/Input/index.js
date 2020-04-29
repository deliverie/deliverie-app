/* eslint-disable no-unused-expressions */
import React, { Component } from 'react';

import { TextInput, View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TextInputMask } from 'react-native-masked-text';
import { colors } from '../../styles';

/** Components */
import InputMessage from '../InputMessage';

import styles from './styles';

export default function Input({
  mask,
  icon,
  placeholder,
  keyboardType,
  secureTextEntry,
  value,
  onChangeText,
  msg,
  options,
  autoCapitalize,
  name,
}) {
  return (
    <>
      {name && <Text style={styles.text}>{name}</Text>}
      <View
        style={[
          styles.inputContainer,
          !name ? { marginTop: 15 } : {},
        ]}
      >
        {icon && (
          <MaterialCommunityIcons
            name={icon}
            size={22}
            color="#7dc242"
          />
        )}

        {!mask && (
          <TextInput
            style={styles.input}
            autoCapitalize={autoCapitalize || 'none'}
            autoCorrect={false}
            placeholder={placeholder}
            underlineColorAndroid="rgba(0, 0, 0, 0)"
            placeholderTextColor={colors.darker}
            onChangeText={onChangeText}
            value={value}
            keyboardType={keyboardType || 'default'}
            secureTextEntry={!!secureTextEntry}
          />
        )}
        {mask && (
          <TextInputMask
            type={mask}
            options={options}
            style={styles.input}
            autoCapitalize={autoCapitalize || 'none'}
            autoCorrect={false}
            placeholder={placeholder}
            underlineColorAndroid="rgba(0, 0, 0, 0)"
            placeholderTextColor={colors.darker}
            onChangeText={onChangeText}
            value={value}
            keyboardType={keyboardType || 'default'}
            secureTextEntry={!!secureTextEntry}
          />
        )}
      </View>
      {msg && <InputMessage msg={msg} />}
    </>
  );
}
