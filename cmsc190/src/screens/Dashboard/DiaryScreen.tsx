import { DateTime } from 'luxon';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DashboardBackground from '../../components/DashboardBackground';
import Header from '../../components/Header';
import { theme } from '../../core/theme';
import { dateTimeProvider } from '../../providers/dateTimeProvider';
import { Navigation } from '../../types';
import JournalEntriesCardWidget from '../../widgets/JournalEntriesCardWidget';
import MeditationCardWidget from '../../widgets/MeditationCardWidget';
import ProgressCardWidget from '../../widgets/ProgressCardWidget';
import RewardsCardWidget from '../../widgets/RewardsCardWidget';
import TasksCardWidget from '../../widgets/TasksCardWidget';

type Props = {
  navigation: Navigation;
};

const DiaryScreen = ({ navigation }: Props) => {
  const dateTime = dateTimeProvider.dateTime;

  const renderDate = (): React.ReactNode => {
    const date = dateTime.toLocaleString({
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
    const currentDate = DateTime.now().toLocaleString({
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
    return (
      <View style={styles.dateGroup}>
        <TouchableOpacity
          onPress={() => {
            dateTimeProvider.setDateTime(dateTime.minus({ day: 1 }));
          }}>
          <MaterialCommunityIcons
            name="chevron-left"
            size={20}
            color={theme.colors.outline}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.dateText}>
            {date} {date === currentDate && '(Today)'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            dateTimeProvider.setDateTime(dateTime.plus({ day: 1 }));
          }}>
          <MaterialCommunityIcons
            name="chevron-right"
            size={20}
            color={theme.colors.outline}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <DashboardBackground>
      <Header>Depressn't </Header>
      {renderDate()}
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 85 }}>
        <ProgressCardWidget navigation={navigation} />
        <JournalEntriesCardWidget />
        <TasksCardWidget />
        <RewardsCardWidget />
        <MeditationCardWidget />
      </ScrollView>
    </DashboardBackground>
  );
};

const styles = StyleSheet.create({
  dateGroup: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    marginBottom: 12,
    paddingHorizontal: 36,
  },
  dateText: {
    color: theme.colors.outline,
  },
});

export default observer(DiaryScreen);
