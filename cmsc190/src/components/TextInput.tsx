import { ValidationResult } from 'nutso';
import React, { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput as Input } from 'react-native-paper';
import { theme } from '../core/theme';

type Props = React.ComponentProps<typeof Input> & {
  validation: ValidationResult;
};

const TextInput = ({ validation, ...props }: Props) => (
  <View style={styles.container}>
    <Input
      selectionColor={theme.colors.primary}
      underlineColor="transparent"
      mode={props.mode ?? 'flat'}
      {...props}
    />
    {!validation.isValid ? (
      <Text style={styles.error}>{validation.errorMessage}</Text>
    ) : null}
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 12,
  },
  error: {
    fontSize: 14,
    color: theme.colors.error,
    paddingHorizontal: 4,
    paddingTop: 4,
  },
});

export default memo(TextInput);
