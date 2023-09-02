import { DateTime } from 'luxon';
import { memo, useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import Sound from 'react-native-sound';
import Button from '../components/Button';
import Header from '../components/Header';
import {
  BreathingExercise,
  Meditation,
  breathingExerciseLabel,
} from '../core/models/MeditationExercise';
import { MeditationStat } from '../core/models/Stats';
import { repo } from '../core/repo/repo';
import { theme } from '../core/theme';
import { idFactory } from '../core/utils';
import { meditationExercisesProvider } from '../providers/meditationExercisesProvider';
import { userProvider } from '../providers/userProvider';
import Visualizer from './Visualizer';

Sound.setCategory('Playback');

type Props = {
  dismiss: () => void;
};

const BreathingExercisesModalWidget = ({ dismiss }: Props) => {
  const [selectedExercise, setSelectedExercise] = useState<Meditation | undefined>(undefined); // prettier-ignore
  const [isPlaying, setPlaying] = useState<boolean>(false);

  const breathingExercises = meditationExercisesProvider.breathingExercises;

  useEffect(() => {
    breathingExercises.forEach(exercise => exercise.audio.setVolume(1));
  }, []);

  const playPause = (exercise: Meditation) => {
    if (isPlaying) {
      exercise.audio.pause();
      setPlaying(false);
    } else {
      exercise.audio.play(success => {
        if (!success)
          ToastAndroid.show('Failed to play audio.', ToastAndroid.SHORT);
      });
      setPlaying(true);
    }
  };

  const stop = (exercise: Meditation) => {
    exercise.audio.stop();
    setPlaying(false);
  };

  const onComplete = (exercise: Meditation) => {
    if (!userProvider.user) return;

    const meditationStat: MeditationStat = {
      id: idFactory.id(),
      createdIsoDateUtc: DateTime.now().toISO(),
      exercise: exercise.label,
    };

    repo.meditationStat.put(
      { uid: userProvider.user.uid, meditationStatId: meditationStat.id },
      meditationStat
    );

    dismiss();
  };

  if (!selectedExercise)
    return (
      <ScrollView>
        <View style={styles.container}>
          <Header style={{ fontSize: theme.fonts.titleLarge.fontSize }}>
            Breathe
          </Header>
          <View style={styles.content}>
            {breathingExercises.map(exercise => (
              <TouchableOpacity
                key={exercise.label}
                style={styles.button}
                onPress={() => setSelectedExercise(exercise)}>
                <Text
                  style={[
                    styles.text,
                    { fontWeight: 'bold', marginBottom: 4 },
                  ]}>
                  {breathingExerciseLabel[exercise.label as BreathingExercise]}
                </Text>
                <Text style={styles.text}>{exercise.text}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    );
  return (
    <View style={styles.container}>
      <Header style={{ fontSize: theme.fonts.titleLarge.fontSize }}>
        {breathingExerciseLabel[selectedExercise.label as BreathingExercise]}
      </Header>
      <Visualizer
        onChange={() => playPause(selectedExercise)}
        isPlaying={isPlaying}
      />
      <Button
        mode="contained"
        onPress={() => {
          stop(selectedExercise);
          onComplete(selectedExercise);
        }}>
        Complete
      </Button>
      <Button
        onPress={() => {
          stop(selectedExercise);
          setSelectedExercise(undefined);
        }}>
        Back
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 0,
  },
  content: {
    flex: 1,
    gap: 12,
  },
  button: {
    padding: 12,
    backgroundColor: theme.colors.primaryContainer,
    borderRadius: 12,
  },
  text: {
    color: theme.colors.onPrimaryContainer,
  },
  ripple: {
    backgroundColor: theme.colors.primaryContainer,
    zIndex: 2,
  },
});

export default memo(BreathingExercisesModalWidget);
