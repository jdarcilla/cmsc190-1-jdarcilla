import { observer } from 'mobx-react-lite';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Card from '../components/Card';
import { theme } from '../core/theme';
import { journalEntriesProvider } from '../providers/journalEntriesProvider';
import { meditationStatsProvider } from '../providers/meditationStatsProvider';
import { tasksProvider } from '../providers/tasksProvider';
import { Navigation } from '../types';

type Props = {
  navigation: Navigation;
};

const ProgressCardWidget = ({ navigation }: Props) => {
  const journalEntries = journalEntriesProvider.journals?.current();
  const tasks = tasksProvider.tasks?.current();
  const meditationStats = meditationStatsProvider.meditationStats?.current();

  const completedTasks = tasks?.filter(task => task.isDone);

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Progress')}>
      <Card
        mode="contained"
        contentStyles={styles.progressCardContent}
        cardStyles={styles.progressCard}>
        <View style={styles.progressCardContentGroup}>
          <Text style={styles.progressCardCount}>
            {journalEntries?.length ?? 0}
          </Text>
          <Text style={styles.progressCardText}>JOURNAL ENTRIES</Text>
        </View>
        <View style={styles.progressCardContentGroup}>
          <Text style={styles.progressCardCount}>
            {completedTasks?.length ?? 0}/{tasks?.length ?? 0}
          </Text>
          <Text style={styles.progressCardText}>TASKS COMPLETED</Text>
        </View>
        <View style={styles.progressCardContentGroup}>
          <Text style={styles.progressCardCount}>
            {meditationStats?.length ?? 0}
          </Text>
          <Text style={styles.progressCardText}>MEDITATION DONE</Text>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  progressCard: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 24,
  },
  progressCardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'space-between',
    alignItems: 'center',
  },
  progressCardContentGroup: {
    alignItems: 'center',
  },
  progressCardText: {
    width: 70,

    textAlign: 'center',
    color: theme.colors.inversePrimary,
    fontSize: theme.fonts.labelSmall.fontSize,
    fontFamily: theme.fonts.labelSmall.fontFamily,
  },
  progressCardCount: {
    color: theme.colors.inverseOnSurface,
    fontSize: theme.fonts.headlineLarge.fontSize,
    fontFamily: theme.fonts.headlineLarge.fontFamily,
  },
});

export default observer(ProgressCardWidget);
