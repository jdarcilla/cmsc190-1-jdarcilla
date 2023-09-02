export type Question = {
  label: string;
  answers: Answer[];
  id: string;
};

export type Answer = {
  id: string;
  label: string;
  score: number;
  questionId: string;
};
