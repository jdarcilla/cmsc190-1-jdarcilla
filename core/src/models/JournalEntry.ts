export type JournalEntry = {
  id: string;
  createdIsoDateUtc: string;
  situation: string;
  mood: Mood;
  automaticThoughts: string;
  supportiveEvidence: string;
  contradictoryEvidence: string;
  balancedThoughts: string;
};

export enum Mood {
  Happy = 'HAPPY',
  Sad = 'SAD',
  Afraid = 'AFRAID',
  Disgusted = 'DISGUSTED',
  Angry = 'ANGRY',
  Surprised = 'SURPRISED',
}

export const moods = [
  Mood.Happy,
  Mood.Sad,
  Mood.Afraid,
  Mood.Disgusted,
  Mood.Angry,
  Mood.Surprised,
];

export type JournalEntryEvent = {
  journalEntryId: string;
  time: string;
  title: string;
  description: string;
  circleColor: string;
};
