export enum ScoreInterpretation {
  minimal = 'MINIMAL',
  mild = 'MILD',
  moderate = 'MODERATE',
  severe = 'SEVERE',
}

export const scoreInterpretationLabel: {
  [key in ScoreInterpretation]: string;
} = {
  MINIMAL: 'Minimal Depression',
  MILD: 'Mild Depression',
  MODERATE: 'Moderate Depression',
  SEVERE: 'Severe Depression',
};

export const scoreInterpretations = [
  ScoreInterpretation.minimal,
  ScoreInterpretation.mild,
  ScoreInterpretation.moderate,
  ScoreInterpretation.severe,
];
