import { theme } from 'core';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { statsProvider } from '../providers/statsProvider';

const StreaksCardWidget = () => {
  const stats = statsProvider.stats?.current();
  const currentStreak = stats?.currentStreak ?? 0;
  const longestStreak = stats?.longestStreak ?? 0;

  return (
    <View style={styles.streaksContainer}>
      <Text style={styles.streaksHeaderText}>STREAKS</Text>
      <View style={styles.streaksInfoContainer}>
        <View
          style={[
            styles.streaksInfo,
            {
              borderRightWidth: 1,
              borderRightColor: theme.colors.outline,
              borderStyle: 'solid',
            },
          ]}>
          <Text style={styles.streakInfoCount}>{`${currentStreak} day${
            currentStreak !== 1 ? 's' : ''
          }`}</Text>
          <Text style={styles.streakInfoText}>CURRENT STREAK</Text>
        </View>
        <View style={styles.streaksInfo}>
          <Text style={styles.streakInfoCount}>{`${longestStreak} day${
            longestStreak !== 1 ? 's' : ''
          }`}</Text>
          <Text style={styles.streakInfoText}>LONGEST STREAK</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  streaksContainer: {
    shadowColor: 'black',
    shadowOpacity: 0.6,
    shadowRadius: 16,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    elevation: 4,

    borderRadius: 12,

    backgroundColor: theme.colors.elevation.level1,

    marginBottom: 14,
  },
  streaksHeaderText: {
    color: theme.colors.onSurface,
    fontSize: theme.fonts.titleMedium.fontSize,
    fontFamily: theme.fonts.titleMedium.fontFamily,
    textAlign: 'center',
    paddingVertical: 8,
  },
  streaksInfoContainer: {
    flexDirection: 'row',
    flex: 2,
    borderTopColor: theme.colors.outline,
    borderTopWidth: 1,
    borderStyle: 'solid',
  },
  streaksInfo: {
    alignItems: 'center',
    width: '50%',
    paddingVertical: 8,
  },
  streakInfoText: {
    color: theme.colors.outline,
    fontSize: theme.fonts.labelSmall.fontSize,
    fontFamily: theme.fonts.labelSmall.fontFamily,
  },
  streakInfoCount: {
    color: theme.colors.onSurface,
    fontSize: theme.fonts.headlineLarge.fontSize,
    fontFamily: theme.fonts.headlineLarge.fontFamily,
  },
});

export default observer(StreaksCardWidget);
