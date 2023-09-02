import React, { memo } from 'react';
import { StyleSheet, Text, TextStyle } from 'react-native';
import { theme } from '../core/theme';

type Props = {
  style?: TextStyle;
  children: React.ReactNode;
};

const Paragraph = ({ style, children }: Props) => (
  <Text style={[styles.text, style]}>{children}</Text>
);

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    lineHeight: 26,
    color: theme.colors.onPrimary,
    textAlign: 'center',
  },
});

export default memo(Paragraph);
