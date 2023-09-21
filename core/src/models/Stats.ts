import { BreathingExercise, MeditationExercise } from './MeditationExercise';

export type Stats = {
  currentStreak: number;
  longestStreak: number;
  testResults?: TestResult[];
  lastUpdatedIsoDateUtc: string;
};

export type MeditationStat = {
  id: string;
  createdIsoDateUtc: string;
  exercise: BreathingExercise | MeditationExercise;
};

export type TestResult = {
  score: number;
  lastUpdatedIsoDateUtc: string;
};
