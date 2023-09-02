import { DateTime } from 'luxon';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Checkbox } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Card from '../components/Card';
import { Reward } from '../core/models/Reward';
import { repo } from '../core/repo/repo';
import { theme } from '../core/theme';
import { dateTimeProvider } from '../providers/dateTimeProvider';
import { modalApi } from '../providers/modalApi';
import { rewardsProvider } from '../providers/rewardsProvider';
import { userProvider } from '../providers/userProvider';
import RewardEditModalWidget from './RewardEditModalWidget';

const RewardsCardWidget = () => {
  //
  const rewards = rewardsProvider.rewards?.current();

  const onAddReward = () => {
    modalApi.show(dismiss => (
      <RewardEditModalWidget dismiss={() => dismiss()} />
    ));
  };

  const onUpdateRewardStatus = (reward: Reward) => {
    if (!userProvider.user) return;

    repo.reward.update(
      { uid: userProvider.user.uid, rewardId: reward.id },
      { isDone: !reward.isDone }
    );
  };

  const onEditReward = (reward: Reward) => {
    modalApi.show(dismiss => (
      <RewardEditModalWidget dismiss={() => dismiss()} reward={reward} />
    ));
  };

  const renderHeader = (): React.ReactNode => {
    const dateTime = dateTimeProvider.dateTime;
    const currentIsoDate = DateTime.now().toISODate();
    return (
      <View style={styles.cardHeader}>
        <Text style={styles.cardHeaderText}>REWARDS</Text>
        {dateTime.toISODate() === currentIsoDate && (
          <TouchableOpacity onPress={onAddReward}>
            <MaterialCommunityIcons
              name="plus-box-outline"
              color={theme.colors.outline}
              size={20}
            />
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const renderRewards = (): React.ReactNode => {
    if (!rewards?.length)
      return (
        <Text style={styles.emptyState}>
          Empty. Hit the plus sign to add one.
        </Text>
      );

    return (
      <View style={styles.rewardsContainer}>
        {rewards.map(reward => renderReward(reward))}
      </View>
    );
  };

  const renderReward = (reward: Reward): React.ReactNode => {
    const status = reward.isDone ? 'checked' : 'unchecked';

    return (
      <View style={styles.reward} key={reward.id}>
        <Checkbox
          status={status}
          onPress={() => onUpdateRewardStatus(reward)}
        />
        <TouchableOpacity onPress={() => onEditReward(reward)}>
          <Text style={{ color: theme.colors.onSurface }}>{reward.reward}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <Card mode="elevated">
      {renderHeader()}
      {renderRewards()}
    </Card>
  );
};

const styles = StyleSheet.create({
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: theme.colors.outline,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    paddingBottom: 8,
  },
  cardHeaderText: {
    color: theme.colors.onSurface,
    fontSize: theme.fonts.labelLarge.fontSize,
    fontFamily: theme.fonts.labelLarge.fontFamily,
  },
  rewardsContainer: {
    padding: 8,
  },
  reward: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emptyState: {
    textAlign: 'center',
    color: theme.colors.onSurfaceVariant,
    padding: 20,
  },
});

export default observer(RewardsCardWidget);
