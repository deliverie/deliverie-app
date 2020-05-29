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
  disabled,
  first,
}) {
  return (
    <View style={{ alignSelf: 'stretch' }}>
      {name && <Text style={styles.text}>{name}</Text>}

      <View
        style={[
          first === true
            ? styles.inputContainerFirst
            : styles.inputContainer,
          !name ? { marginTop: 15 } : {},
        ]}
      >
        {icon && (
          <MaterialCommunityIcons
            name={icon}
            size={22}
            color={colors.primary}
            style={{ paddingRight: 10 }}
          />
        )}

        {!mask && (
          <TextInput
            style={styles.input}
            autoCapitalize={autoCapitalize || 'none'}
            autoCorrect={false}
            placeholder={placeholder}
            underlineColorAndroid="rgba(0, 0, 0, 0)"
            placeholderTextColor="rgba(0, 0, 0, 0.4)"
            onChangeText={onChangeText}
            value={value}
            keyboardType={keyboardType || 'default'}
            secureTextEntry={!!secureTextEntry}
            editable={!disabled}
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
            placeholderTextColor="rgba(0, 0, 0, 0.4)"
            onChangeText={onChangeText}
            value={value}
            keyboardType={keyboardType || 'default'}
            secureTextEntry={!!secureTextEntry}
            editable={!disabled}
          />
        )}
        {msg && <InputMessage msg={msg} />}
      </View>
    </View>
  );
}
