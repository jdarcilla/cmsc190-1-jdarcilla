import { theme } from 'core';
import React, { memo } from 'react';
import { KeyboardAvoidingView, StyleSheet, View } from 'react-native';

type Props = {
  children: React.ReactNode;
};

const DashboardBackground = ({ children }: Props) => (
  <View style={styles.background}>
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      {children}
    </KeyboardAvoidingView>
  </View>
);

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    backgroundColor: theme.colors.surface,
  },
  container: {
    flex: 1,
    width: '100%',
  },
});

export default memo(DashboardBackground);
