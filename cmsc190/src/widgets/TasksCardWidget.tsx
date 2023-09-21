import { Task, repo, theme } from 'core';
import { DateTime } from 'luxon';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Checkbox } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Card from '../components/Card';
import { dateTimeProvider } from '../providers/dateTimeProvider';
import { modalApi } from '../providers/modalApi';
import { tasksProvider } from '../providers/tasksProvider';
import { userProvider } from '../providers/userProvider';
import TaskEditModalWidget from './TaskEditModalWidget';

const TasksCardWidget = () => {
  //
  const tasks = tasksProvider.tasks?.current();

  const onAddTask = () => {
    modalApi.show(dismiss => <TaskEditModalWidget dismiss={() => dismiss()} />);
  };

  const onUpdateTaskStatus = (task: Task) => {
    if (!userProvider.user) return;

    repo.task.update(
      { uid: userProvider.user.uid, taskId: task.id },
      { isDone: !task.isDone }
    );
  };

  const onEditTask = (task: Task) => {
    modalApi.show(dismiss => (
      <TaskEditModalWidget dismiss={() => dismiss()} task={task} />
    ));
  };

  const renderHeader = (): React.ReactNode => {
    const dateTime = dateTimeProvider.dateTime;
    const currentIsoDate = DateTime.now().toISODate();
    return (
      <View style={styles.cardHeader}>
        <Text style={styles.cardHeaderText}>TASKS</Text>
        {dateTime.toISODate() === currentIsoDate && (
          <TouchableOpacity onPress={onAddTask}>
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

  const renderTasks = (): React.ReactNode => {
    if (!tasks?.length)
      return (
        <Text style={styles.emptyState}>
          Empty. Hit the plus sign to add one.
        </Text>
      );

    return (
      <View style={styles.tasksContainer}>
        {tasks.map(task => renderTask(task))}
      </View>
    );
  };

  const renderTask = (task: Task): React.ReactNode => {
    const status = task.isDone ? 'checked' : 'unchecked';

    return (
      <View style={styles.task} key={task.id}>
        <Checkbox status={status} onPress={() => onUpdateTaskStatus(task)} />
        <TouchableOpacity onPress={() => onEditTask(task)}>
          <Text style={{ color: theme.colors.onSurface }}>{task.task}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <Card mode="elevated">
      {renderHeader()}
      {renderTasks()}
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
  tasksContainer: {
    padding: 8,
  },
  task: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emptyState: {
    textAlign: 'center',
    color: theme.colors.onSurfaceVariant,
    padding: 20,
  },
});

export default observer(TasksCardWidget);
