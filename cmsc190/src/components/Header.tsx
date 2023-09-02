import React, { memo } from 'react';
import { StyleSheet, Text, TextStyle } from 'react-native';
import { theme } from '../core/theme';

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
