import {
  Meditation,
  MeditationExercise,
  MeditationStat,
  idFactory,
  meditationExerciseLabel,
  repo,
  theme,
} from 'core';
import { DateTime } from 'luxon';
import { memo, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import Sound from 'react-native-sound';
import Button from '../components/Button';
import Header from '../components/Header';
import { meditationExerciseManager } from '../providers/meditationExerciseManager';
import { meditationExercisesProvider } from '../providers/meditationExercisesProvider';
import { userProvider } from '../providers/userProvider';
import Visualizer from './Visualizer';

Sound.setCategory('Playback');

type Props = {
  dismiss: () => void;
};

const MeditationExercisesModalWidget = ({ dismiss }: Props) => {
  const [selectedExercise, setSelectedExercise] = useState<Meditation | undefined>(meditationExerciseManager.exercise); // prettier-ignore
  const [isPlaying, setPlaying] = useState<boolean>(false);

  const meditationExercises = meditationExercisesProvider.meditationExercises;

  useEffect(() => {
    meditationExercises.forEach(exercise => exercise.audio.setVolume(1));

    return () => {
      meditationExerciseManager.exercise?.audio.stop();
      meditationExerciseManager.setExercise(undefined);
    };
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
      createdIsoDateUtc: DateTime.now().toISO() ?? '',
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
      <View style={styles.container}>
        <Header
          style={{
            fontSize: theme.fonts.titleLarge.fontSize,
          }}>
          Meditate
        </Header>
        <View style={styles.content}>
          {meditationExercises.map(exercise => (
            <TouchableOpacity
              key={exercise.label}
              style={styles.button}
              onPress={() => {
                setSelectedExercise(exercise);
                meditationExerciseManager.setExercise(exercise);
              }}>
              <Text
                style={[styles.text, { fontWeight: 'bold', marginBottom: 4 }]}>
                {meditationExerciseLabel[exercise.label as MeditationExercise]}
              </Text>
              <Text style={styles.text}>{exercise.text}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  return (
    <View style={styles.container}>
      <Header style={{ fontSize: theme.fonts.titleLarge.fontSize }}>
        {meditationExerciseLabel[selectedExercise.label as MeditationExercise]}
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
          meditationExerciseManager.setExercise(undefined);
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

export default memo(MeditationExercisesModalWidget);
