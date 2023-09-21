import { theme } from 'core';
import React, { memo } from 'react';
import { StyleSheet, Text, TextStyle } from 'react-native';

type Props = {
  style?: TextStyle;
  children: React.ReactNode;
};

const Header = ({ style, children }: Props) => (
  <Text style={[styles.header, style]}>{children}</Text>
);

const styles = StyleSheet.create({
  header: {
    fontSize: 26,
    color: theme.colors.primary,
    fontWeight: 'bold',
    paddingVertical: 12,
    textAlign: 'center',
  },
});

export default memo(Header);
