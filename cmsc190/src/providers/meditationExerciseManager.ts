import { action, makeAutoObservable, observable } from 'mobx';
import { Meditation } from '../core/models/MeditationExercise';

class MeditationExerciseManager {
  constructor() {
    makeAutoObservable(this, {
      exercise: observable,
      setExercise: action,
    });
  }

  exercise: Meditation | undefined;

  setExercise(exercise: Meditation | undefined) {
    this.exercise = exercise;
  }
}

export const meditationExerciseManager = new MeditationExerciseManager();
