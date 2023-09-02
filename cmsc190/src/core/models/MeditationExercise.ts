import Sound from 'react-native-sound';

export type Meditation = {
  label: BreathingExercise | MeditationExercise;
  audio: Sound;
  text: string;
  link: string;
};

export enum BreathingExercise {
  DeepBreathing = 'DEEP_BREATHING',
  BreathFocus = 'BREATHE_FOCUS',
  EqualTime = 'EQUAL_TIME',
}

export const breathingExercises = [
  BreathingExercise.DeepBreathing,
  BreathingExercise.BreathFocus,
  BreathingExercise.EqualTime,
];

export const breathingExerciseLabel: { [key in BreathingExercise]: string } = {
  DEEP_BREATHING: 'DEEP BREATHING',
  BREATHE_FOCUS: 'BREATHE FOCUS',
  EQUAL_TIME: 'EQUAL TIME',
};

export enum MeditationExercise {
  SensesAndBreath = 'SENSES_AND_BREATH',
  BodyScan = 'BODY_SCAN',
  ThoughtsAndFeelings = 'THOUGHTS_AND_FEELINGS',
}

export const meditationExercises = [
  MeditationExercise.SensesAndBreath,
  MeditationExercise.BodyScan,
  MeditationExercise.ThoughtsAndFeelings,
];

export const meditationExerciseLabel: { [key in MeditationExercise]: string } =
  {
    SENSES_AND_BREATH: 'SENSES AND BREATH',
    BODY_SCAN: 'BODY SCAN',
    THOUGHTS_AND_FEELINGS: 'THOUGHTS AND FEELINGS',
  };
