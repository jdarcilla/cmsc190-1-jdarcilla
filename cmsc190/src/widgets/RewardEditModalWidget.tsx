import { DateTime } from 'luxon';
import { observer } from 'mobx-react-lite';
import { validate } from 'nutso';
import { useState } from 'react';
import { StyleSheet, ToastAndroid, View } from 'react-native';
import Button from '../components/Button';
import Header from '../components/Header';
import TextInput from '../components/TextInput';
import { Reward } from '../core/models/Reward';
import { Stats } from '../core/models/Stats';
import { repo } from '../core/repo/repo';
import { rewardSchema } from '../core/schema/rewardSchema';
import { theme } from '../core/theme';
import { idFactory } from '../core/utils';
import { statsProvider } from '../providers/statsProvider';
import { userProvider } from '../providers/userProvider';

type Props = {
  reward?: Reward;
  dismiss: () => void;
};

const RewardEditModalWidget = ({ dismiss, reward }: Props) => {
  const stats = statsProvider.stats?.current();
  const [newReward, setReward] = useState<Reward>(
    reward
      ? reward
      : {
          id: idFactory.id(),
          createdIsoDateUtc: DateTime.now().toISO() ?? '',
          reward: '',
          isDone: false,
        }
  );

  const validation = validate(newReward, rewardSchema);

  const onSave = (stats: Stats | null | undefined) => {
    if (!userProvider.user) return;

    repo.reward.put(
      { uid: userProvider.user.uid, rewardId: newReward.id },
      { ...newReward, createdIsoDateUtc: DateTime.now().toISO() ?? '' }
    );

    ToastAndroid.show('Reward added!', ToastAndroid.SHORT);
    dismiss();

    const currentDateTime = DateTime.now();

    // if no stats saved yet
    if (!stats) {
      repo.stats.put(
        { uid: userProvider.user.uid },
        {
          currentStreak: 1,
          longestStreak: 1,
          lastUpdatedIsoDateUtc: currentDateTime.toISODate() ?? '',
        }
      );
      return;
    }

    // if streak last updated today, no-op
    if (stats.lastUpdatedIsoDateUtc === currentDateTime.toISODate()) return;

    // if streak last updated yesterday
    if (
      stats.lastUpdatedIsoDateUtc ===
      currentDateTime.minus({ day: 1 }).toISODate()
    ) {
      const newCurrentStreak: number = stats.currentStreak + 1;
      const newStats: Partial<Stats> = {
        lastUpdatedIsoDateUtc: currentDateTime.toISODate() ?? '',
        currentStreak: newCurrentStreak,
        longestStreak:
          stats.longestStreak > newCurrentStreak
            ? stats.longestStreak
            : newCurrentStreak,
      };
      repo.stats.update({ uid: userProvider.user.uid }, newStats);
    }

    // if streak last updated at least 2 days ago
    if (
      stats.lastUpdatedIsoDateUtc <=
      (currentDateTime.minus({ day: 2 }).toISODate() ?? '')
    ) {
      const newStats: Partial<Stats> = {
        lastUpdatedIsoDateUtc: currentDateTime.toISODate() ?? '',
        currentStreak: 1,
      };
      repo.stats.update({ uid: userProvider.user.uid }, newStats);
    }
  };

  const onDelete = async () => {
    if (!userProvider.user) return;
    if (!reward) return;
    await repo.reward.delete({
      uid: userProvider.user.uid,
      rewardId: reward.id,
    });
    dismiss();
    ToastAndroid.show('Reward successfully deleted!', ToastAndroid.SHORT);
  };

  return (
    <View style={styles.container}>
      <Header style={{ fontSize: theme.fonts.titleLarge.fontSize }}>
        {reward ? 'Edit Reward' : 'Add Reward'}
      </Header>
      <TextInput
        label=""
        value={newReward.reward}
        onChangeText={(text: string) =>
          setReward({ ...newReward, reward: text })
        }
        numberOfLines={5}
        multiline={true}
        error={!validation.properties.reward.isValid}
        validation={validation.properties.reward}
        returnKeyType="next"
      />
      <Button
        mode="contained"
        onPress={() => onSave(stats)}
        disabled={!validation.isValid}>
        Save
      </Button>
      {reward && (
        <Button
          mode="contained"
          buttonColor={theme.colors.error}
          textColor={theme.colors.onError}
          style={{ marginBottom: 20 }}
          onPress={onDelete}>
          Delete
        </Button>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 0,
  },
});

export default observer(RewardEditModalWidget);
