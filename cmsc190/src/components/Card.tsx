import { theme } from 'core';
import React, { memo } from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { Card as PaperCard } from 'react-native-paper';

type Props = {
  children: React.ReactNode;
  mode?: 'outlined' | 'elevated' | 'contained';
  contentStyles?: StyleProp<ViewStyle>;
  cardStyles?: StyleProp<ViewStyle>;
};

const Card = ({ children, mode, contentStyles, cardStyles }: Props) => (
  <PaperCard mode={mode ?? 'elevated'} style={[styles.card, cardStyles]}>
    <PaperCard.Content style={contentStyles}>{children}</PaperCard.Content>
  </PaperCard>
);

const styles = StyleSheet.create({
  card: {
    marginBottom: 14,

    width: '100%',

    fontSize: 16,
    lineHeight: 26,
    color: theme.colors.secondary,
    textAlign: 'center',
  },
});

export default memo(Card);
