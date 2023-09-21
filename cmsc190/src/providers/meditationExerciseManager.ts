import { Meditation } from 'core';
import { action, makeAutoObservable, observable } from 'mobx';

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
