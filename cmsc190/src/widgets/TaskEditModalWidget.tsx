import { repo } from 'client';
import { Stats, Task, idFactory, taskSchema, theme } from 'core';
import { DateTime } from 'luxon';
import { observer } from 'mobx-react-lite';
import { validate } from 'nutso';
import { useState } from 'react';
import { StyleSheet, ToastAndroid, View } from 'react-native';
import Button from '../components/Button';
import Header from '../components/Header';
import TextInput from '../components/TextInput';
import { statsProvider } from '../providers/statsProvider';
import { userProvider } from '../providers/userProvider';

type Props = {
  task?: Task;
  dismiss: () => void;
};

const TaskEditModalWidget = ({ dismiss, task }: Props) => {
  const stats = statsProvider.stats?.current();
  const [newTask, setTask] = useState<Task>(
    task
      ? task
      : {
          id: idFactory.id(),
          createdIsoDateUtc: DateTime.now().toISO() ?? '',
          task: '',
          isDone: false,
        }
  );

  const validation = validate(newTask, taskSchema);

  const onSave = (stats: Stats | null | undefined) => {
    if (!userProvider.user) return;

    repo.task.put(
      { uid: userProvider.user.uid, taskId: newTask.id },
      { ...newTask, createdIsoDateUtc: DateTime.now().toISO() ?? '' }
    );

    ToastAndroid.show('Task added!', ToastAndroid.SHORT);
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

  const onDelete = () => {
    if (!userProvider.user) return;
    if (!task) return;
    repo.task.delete({
      uid: userProvider.user.uid,
      taskId: task.id,
    });
    dismiss();
    ToastAndroid.show('Task successfully deleted!', ToastAndroid.SHORT);
  };

  return (
    <View style={styles.container}>
      <Header style={{ fontSize: theme.fonts.titleLarge.fontSize }}>
        {task ? 'Edit Task' : 'Add Task'}
      </Header>
      <TextInput
        label=""
        value={newTask.task}
        onChangeText={(text: string) => setTask({ ...newTask, task: text })}
        numberOfLines={5}
        multiline={true}
        error={!validation.properties.task.isValid}
        validation={validation.properties.task}
        returnKeyType="next"
      />
      <Button
        mode="contained"
        onPress={() => onSave(stats)}
        disabled={!validation.isValid}>
        Save
      </Button>
      {task && (
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

export default observer(TaskEditModalWidget);
