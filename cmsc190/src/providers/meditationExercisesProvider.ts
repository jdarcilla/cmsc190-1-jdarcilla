import { BreathingExercise, Meditation, MeditationExercise } from 'core';
import Sound from 'react-native-sound';
const deep_breathing_wav = require('../assets/audio/deep_breathing.wav');
const breathe_focus_wav = require('../assets/audio/breathe_focus.wav');
const equal_time_wav = require('../assets/audio/equal_time.wav');
const senses_and_breath_mp3 = require('../assets/audio/Senses_and_Breath_ED.mp3');
const body_scan_mp3 = require('../assets/audio/Body_Scan_ED.mp3');
const thoughts_and_feelings_mp3 = require('../assets/audio/Thoughts_and_Feelings_ED.mp3');

const deepBreathing = new Sound(deep_breathing_wav);
const breatheFocus = new Sound(breathe_focus_wav);
const equalTime = new Sound(equal_time_wav);
const sensesAndBreath = new Sound(senses_and_breath_mp3);
const bodyScan = new Sound(body_scan_mp3);
const thoughtsAndFeelings = new Sound(thoughts_and_feelings_mp3);

class MeditationExercisesProvider {
  breathingExercises: Meditation[] = [
    {
      label: BreathingExercise.DeepBreathing,
      audio: deepBreathing,
      text: "Most people take short, shallow breaths into their chest. It can make you feel anxious and zap your energy. With this technique, you'll learn how to take bigger breaths, all the way into your belly.",
      link: '../assets/audio/deep_breathing.wav',
    },
    {
      label: BreathingExercise.BreathFocus,
      audio: breatheFocus,
      text: 'While you do deep breathing, use a picture in your mind and a word or phrase to help you feel more relaxed.',
      link: '../assets/audio/breathe_focus.wav',
    },
    {
      label: BreathingExercise.EqualTime,
      audio: equalTime,
      text: "In this exercise, you'll match how long you breathe in with how long you breathe out. Over time, you'll increase how long you're able to breathe in and out at a time.",
      link: '../assets/audio/equal_time.wav',
    },
  ];

  meditationExercises: Meditation[] = [
    {
      label: MeditationExercise.SensesAndBreath,
      audio: sensesAndBreath,
      text: 'When we practise mindfulness, we become more and more familiar with our mind, and in particular we learn to recognise the movement of the mind, which we experience as thoughts. Living in the past or in the future is our habit. We almost forget to live in the present moment.',
      link: '../assets/audio/Senses_and_Breath_ED.mp3',
    },
    {
      label: MeditationExercise.BodyScan,
      audio: bodyScan,
      text: "In this practice, the intention is simply to 'drop into' your body and experience fully what is there.",
      link: '../assets/audio/Body_Scan_ED.mp3',
    },
    {
      label: MeditationExercise.ThoughtsAndFeelings,
      audio: thoughtsAndFeelings,
      text: "In this practice, we continue to observe: we watch the activity of our minds, seeing the passing thoughts as 'mental events', rather than as very true or even very important!",
      link: '../assets/audio/Thoughts_and_Feelings_ED.mp3',
    },
  ];
}

export const meditationExercisesProvider = new MeditationExercisesProvider();
