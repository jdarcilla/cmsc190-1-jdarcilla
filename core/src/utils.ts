import { DateTime } from "luxon";
import { Answer } from "./models/BDI-II";
import { JournalEntry, JournalEntryEvent, Mood } from "./models/JournalEntry";
import { ScoreInterpretation } from "./models/ScoreInterpretation";
import { theme } from "./theme";

/**
 * We need our ids to be short enough and also be distributed over time.
 * We also need out ids to be neat, with just lowercase and numbers. Easy to select and to look good in the URLs.
 *
 * All ids should have a space and time component
 */
const space = () => Math.floor(Math.random() * 100000).toString(36); // moves randomly in space (within the space of a second)
const time = () => Math.floor(Date.now() / 1000).toString(36); // moves forward every second

// space should always come first, otherwise we will endup in sequential ids
export const id = () => `${space()}${time()}`;

export const idFactory = { id };

export const getCircleColorFromMood = (mood: Mood): string => {
  switch (mood) {
    case Mood.Happy:
      return theme.colors.primary;
    case Mood.Sad:
      return "#FFA000";
    case Mood.Afraid:
      return "#303F9F";
    case Mood.Disgusted:
      return "#616161";
    case Mood.Angry:
      return "#D32F2F";
    case Mood.Surprised:
      return "#2E7D32";
    default:
      return theme.colors.primary;
  }
};

export const undef2null = (obj: any) => {
  if (!obj) return;
  for (let k in obj) {
    if (obj[k] && typeof obj[k] === "object") {
      undef2null(obj[k]);
    } else {
      if (obj[k] === undefined) obj[k] = null;
    }
  }
};

export const getJournalEntryEvent = (
  journalEntry: JournalEntry
): JournalEntryEvent => {
  return {
    journalEntryId: journalEntry.id,
    title: journalEntry.situation,
    description: journalEntry.balancedThoughts,
    time: DateTime.fromISO(journalEntry.createdIsoDateUtc).toFormat("H ':' mm"),
    circleColor: getCircleColorFromMood(journalEntry.mood),
  };
};

export const getEnergyLevelFromMood = (mood: Mood): number => {
  switch (mood) {
    case Mood.Happy:
      return 7;
    case Mood.Surprised:
      return 10;
    case Mood.Disgusted:
      return 5;
    case Mood.Sad:
      return 4;
    case Mood.Afraid:
      return 8;
    case Mood.Angry:
      return 8;
    default:
      return 0;
  }
};

export const getPleasantnessLevelFromMood = (mood: Mood): number => {
  switch (mood) {
    case Mood.Happy:
      return 8;
    case Mood.Surprised:
      return 6;
    case Mood.Disgusted:
      return 1;
    case Mood.Sad:
      return 4;
    case Mood.Afraid:
      return 2;
    case Mood.Angry:
      return 3;
    default:
      return 0;
  }
};

export const getScoreInterpretation = (
  score: number | undefined
): ScoreInterpretation | undefined => {
  if (score === undefined) return;
  if (score <= 13) return ScoreInterpretation.minimal;
  if (score >= 14 && score <= 19) return ScoreInterpretation.mild;
  if (score >= 20 && score <= 28) return ScoreInterpretation.moderate;
  if (score >= 29 && score <= 63) return ScoreInterpretation.severe;
  return;
};

export const getScore = (answers: Answer[]): number => {
  return answers.reduce((total, answer) => {
    return total + answer.score;
  }, 0);
};
