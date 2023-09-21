import { theme } from 'core';
import { DateTime } from 'luxon';
import { observer } from 'mobx-react-lite';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Card from '../components/Card';
import { dateTimeProvider } from '../providers/dateTimeProvider';
import { modalApi } from '../providers/modalApi';
import BreathingExercisesModalWidget from './BreathingExercisesModalWidget';
import MeditationExercisesModalWidget from './MeditationExercisesModalWidget';

const MeditationCardWidget = () => {
  const showBreathingExercises = () => {
    modalApi.show(dismiss => (
      <BreathingExercisesModalWidget dismiss={() => dismiss()} />
    ));
  };

  const showMeditationExercises = () => {
    modalApi.show(dismiss => (
      <MeditationExercisesModalWidget dismiss={() => dismiss()} />
    ));
  };

  if (dateTimeProvider.dateTime.toISODate() !== DateTime.now().toISODate())
    return null;

  return (
    <Card>
      <View style={styles.header}>
        <Text style={styles.headerText}>MEDITATION</Text>
      </View>
      <View style={styles.content}>
        <TouchableOpacity
          style={styles.button}
          onPress={showBreathingExercises}>
          <View>
            <MaterialCommunityIcons
              name="meditation"
              color={theme.colors.onPrimary}
              size={40}
            />
            <Text style={{ color: theme.colors.onPrimary }}>Breathe</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.colors.secondary }]}
          onPress={showMeditationExercises}>
          <View>
            <MaterialCommunityIcons
              name="brain"
              color={theme.colors.onPrimary}
              size={40}
            />
            <Text style={{ color: theme.colors.onPrimary }}>Meditate</Text>
          </View>
        </TouchableOpacity>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 8,
  },
  headerText: {
    color: theme.colors.onSurface,
    fontSize: theme.fonts.labelLarge.fontSize,
    fontFamily: theme.fonts.labelLarge.fontFamily,
  },
  content: {
    flexDirection: 'row',
    gap: 6,
    paddingVertical: 8,
  },
  button: {
    borderRadius: 12,
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    backgroundColor: theme.colors.primary,
  },
});

export default observer(MeditationCardWidget);
