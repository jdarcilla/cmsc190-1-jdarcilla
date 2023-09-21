import { Question } from 'core';

class BDITestProvider {
  questions: Question[] = [
    {
      id: '1',
      label: 'Sadness',
      answers: [
        {
          id: '1',
          questionId: '1',
          label: 'I do not feel sad.',
          score: 0,
        },
        {
          id: '2',
          questionId: '1',
          label: 'I feel sad much of the time.',
          score: 1,
        },
        {
          id: '3',
          questionId: '1',
          label: 'I am sad all the time.',
          score: 2,
        },
        {
          id: '4',
          questionId: '1',
          label: "I am so sad or unhappy that I can't stand it.",
          score: 3,
        },
      ],
    },
    {
      id: '2',
      label: 'Pessimism',
      answers: [
        {
          id: '1',
          questionId: '2',
          label: 'I am not discouraged about my future.',
          score: 0,
        },
        {
          id: '2',
          questionId: '2',
          label: 'I feel more discouraged about my future than I used to .',
          score: 1,
        },
        {
          id: '3',
          questionId: '2',
          label: 'I do not expect things to work out for me.',
          score: 2,
        },
        {
          id: '4',
          questionId: '2',
          label: 'I feel my future is hopeless and will only get worse.',
          score: 3,
        },
      ],
    },
    {
      id: '3',
      label: 'Past Failure',
      answers: [
        {
          id: '1',
          questionId: '3',
          label: 'I do not feel like a failure.',
          score: 0,
        },
        {
          id: '2',
          questionId: '3',
          label: 'I have failed more than I should have.',
          score: 1,
        },
        {
          id: '3',
          questionId: '3',
          label: 'As I look back, I see a lot of failures.',
          score: 2,
        },
        {
          id: '4',
          questionId: '3',
          label: 'I feel I am a total failure as a person.',
          score: 3,
        },
      ],
    },
    {
      id: '4',
      label: 'Loss of Pleasure',
      answers: [
        {
          id: '1',
          questionId: '4',
          label:
            'I get as much pleasure as I ever did from the things I enjoy.',
          score: 0,
        },
        {
          id: '2',
          questionId: '4',
          label: "I don't enjoy things as much as I used to.",
          score: 1,
        },
        {
          id: '3',
          questionId: '4',
          label: 'I get very little pleasure from the things I used to enjoy.',
          score: 2,
        },
        {
          id: '4',
          questionId: '4',
          label: 'I cant get any pleasure from the things I used to enjoy.',
          score: 3,
        },
      ],
    },
    {
      id: '5',
      label: 'Guilty Feelings',
      answers: [
        {
          id: '1',
          questionId: '5',
          label: "I don't feel particularly guilty.",
          score: 0,
        },
        {
          id: '2',
          questionId: '5',
          label:
            'I feel guilty over many things I have done or should have done.',
          score: 1,
        },
        {
          id: '3',
          questionId: '5',
          label: 'I feel quite guilty most of the time.',
          score: 2,
        },
        {
          id: '4',
          questionId: '5',
          label: 'I feel guilty all of the time.',
          score: 3,
        },
      ],
    },
    {
      id: '6',
      label: 'Punishment Feelings',
      answers: [
        {
          id: '1',
          questionId: '6',
          label: "I don't feel I am being punished.",
          score: 0,
        },
        {
          id: '2',
          questionId: '6',
          label: 'I feel I may be punished.',
          score: 1,
        },
        {
          id: '3',
          questionId: '6',
          label: 'I expect to be punished.',
          score: 2,
        },
        {
          id: '4',
          questionId: '6',
          label: 'I feel I am being punished.',
          score: 3,
        },
      ],
    },
    {
      id: '7',
      label: 'Self-Dislike',
      answers: [
        {
          id: '1',
          questionId: '7',
          label: 'I feel the same about myself as ever.',
          score: 0,
        },
        {
          id: '2',
          questionId: '7',
          label: 'I have lost confidence in myself.',
          score: 1,
        },
        {
          id: '3',
          questionId: '7',
          label: 'I am disappointed in myself.',
          score: 2,
        },
        {
          id: '4',
          questionId: '7',
          label: 'I dislike myself.',
          score: 3,
        },
      ],
    },
    {
      id: '8',
      label: 'Self-Criticalness',
      answers: [
        {
          id: '1',
          questionId: '8',
          label: "I don't criticize or blame myself more than usual.",
          score: 0,
        },
        {
          id: '2',
          questionId: '8',
          label: 'I am more critical of myself than I used to be.',
          score: 1,
        },
        {
          id: '3',
          questionId: '8',
          label: 'I criticize myself for all my faults.',
          score: 2,
        },
        {
          id: '4',
          questionId: '8',
          label: 'I blame myself for everything bad that happens.',
          score: 3,
        },
      ],
    },
    {
      id: '9',
      label: 'Suicidal Thoughts or Wishes',
      answers: [
        {
          id: '1',
          questionId: '9',
          label: "I don't have any thoughts of killing myself.",
          score: 0,
        },
        {
          id: '2',
          questionId: '9',
          label:
            'I have thoughts of killing myself, but I would not carry them out.',
          score: 1,
        },
        {
          id: '3',
          questionId: '9',
          label: 'I would like to kill myself.',
          score: 2,
        },
        {
          id: '4',
          questionId: '9',
          label: 'I would kill myself if I had the chance.',
          score: 3,
        },
      ],
    },
    {
      id: '10',
      label: 'Crying',
      answers: [
        {
          id: '1',
          questionId: '10',
          label: "I don't cry anymore than I used to.",
          score: 0,
        },
        {
          id: '2',
          questionId: '10',
          label: 'I cry more than I used to.',
          score: 1,
        },
        {
          id: '3',
          questionId: '10',
          label: 'I cry over every little thing.',
          score: 2,
        },
        {
          id: '4',
          questionId: '10',
          label: "I feel like crying, but I can't.",
          score: 3,
        },
      ],
    },
    {
      id: '11',
      label: 'Agitation',
      answers: [
        {
          id: '1',
          questionId: '11',
          label: 'I am no more restless or wound up than usual.',
          score: 0,
        },
        {
          id: '2',
          questionId: '11',
          label: 'I feel more restless or wound up than usual.',
          score: 1,
        },
        {
          id: '3',
          questionId: '11',
          label: "I am so restless or agitated, it's hard to stay still.",
          score: 2,
        },
        {
          id: '4',
          questionId: '11',
          label:
            'I am so restless or agitated that I have to keep moving or doing something.',
          score: 3,
        },
      ],
    },
    {
      id: '12',
      label: 'Loss of Interest',
      answers: [
        {
          id: '1',
          questionId: '12',
          label: 'I have not lost interest in other people or activities.',
          score: 0,
        },
        {
          id: '2',
          questionId: '12',
          label: 'I am less interested in other people or things than before.',
          score: 1,
        },
        {
          id: '3',
          questionId: '12',
          label: 'I have lost most of my interest in other people or things.',
          score: 2,
        },
        {
          id: '4',
          questionId: '12',
          label: "It's hard to get interested in anything.",
          score: 3,
        },
      ],
    },
    {
      id: '13',
      label: 'Indecisiveness',
      answers: [
        {
          id: '1',
          questionId: '13',
          label: 'I make decisions about as well as ever.',
          score: 0,
        },
        {
          id: '2',
          questionId: '13',
          label: 'I find it more difficult to make decisions than usual.',
          score: 1,
        },
        {
          id: '3',
          questionId: '13',
          label:
            'I have much greater difficulty in making decisions than I used to.',
          score: 2,
        },
        {
          id: '4',
          questionId: '13',
          label: 'I have trouble making any decisions.',
          score: 3,
        },
      ],
    },
    {
      id: '14',
      label: 'Worthlessness',
      answers: [
        {
          id: '1',
          questionId: '14',
          label: 'I do not feel I am worthless.',
          score: 0,
        },
        {
          id: '2',
          questionId: '14',
          label:
            "I don't consider myself as worthwhile and useful as I used to.",
          score: 1,
        },
        {
          id: '3',
          questionId: '14',
          label: 'I feel more worthless as compared to others.',
          score: 2,
        },
        {
          id: '4',
          questionId: '14',
          label: 'I feel utterly worthless.',
          score: 3,
        },
      ],
    },
    {
      id: '15',
      label: 'Loss of Energy',
      answers: [
        {
          id: '1',
          questionId: '15',
          label: 'I have as much energy as ever.',
          score: 0,
        },
        {
          id: '2',
          questionId: '15',
          label: 'I have less energy than I used to have.',
          score: 1,
        },
        {
          id: '3',
          questionId: '15',
          label: "I don't have enough energy to do very much.",
          score: 2,
        },
        {
          id: '4',
          questionId: '15',
          label: "I don't have enough energy to do anything.",
          score: 3,
        },
      ],
    },
    {
      id: '16',
      label: 'Changes in Sleeping Pattern',
      answers: [
        {
          id: '1',
          questionId: '16',
          label: 'I have not experienced any change in my sleeping.',
          score: 0,
        },
        {
          id: '2',
          questionId: '16',
          label: 'I sleep somewhat more than usual.',
          score: 1,
        },
        {
          id: '3',
          questionId: '16',
          label: 'I sleep somewhat less than usual.',
          score: 1,
        },
        {
          id: '4',
          questionId: '16',
          label: 'I sleep a lot more than usual.',
          score: 2,
        },
        {
          id: '5',
          questionId: '16',
          label: 'I sleep a lot less than usual.',
          score: 2,
        },
        {
          id: '6',
          questionId: '16',
          label: 'I sleep most of the day.',
          score: 3,
        },
        {
          id: '7',
          questionId: '16',
          label: "I wake up 1-2 hours early and can't get back to sleep.",
          score: 3,
        },
      ],
    },
    {
      id: '17',
      label: 'Irritability',
      answers: [
        {
          id: '1',
          questionId: '17',
          label: 'I am not more irritable than usual.',
          score: 0,
        },
        {
          id: '2',
          questionId: '17',
          label: 'I am more irritable than usual.',
          score: 1,
        },
        {
          id: '3',
          questionId: '17',
          label: 'I am much more irritable than usual.',
          score: 2,
        },
        {
          id: '4',
          questionId: '17',
          label: 'I am irritable all the time.',
          score: 3,
        },
      ],
    },
    {
      id: '18',
      label: 'Changes in Appetite',
      answers: [
        {
          id: '1',
          questionId: '18',
          label: 'I have not experienced any change in my appetite.',
          score: 0,
        },
        {
          id: '2',
          questionId: '18',
          label: 'My appetite is somewhat more than usual.',
          score: 1,
        },
        {
          id: '3',
          questionId: '18',
          label: 'My appetite is somewhat less than usual.',
          score: 1,
        },
        {
          id: '4',
          questionId: '18',
          label: 'My appetite is much greater than usual.',
          score: 2,
        },
        {
          id: '5',
          questionId: '18',
          label: 'My appetite is much less than usual.',
          score: 2,
        },
        {
          id: '6',
          questionId: '18',
          label: 'I crave food all the time.',
          score: 3,
        },
        {
          id: '17',
          questionId: '18',
          label: 'I have no appetite at all.',
          score: 3,
        },
      ],
    },
    {
      id: '19',
      label: 'Concentration Difficulty',
      answers: [
        {
          id: '1',
          questionId: '19',
          label: 'I can concentrate as well as ever.',
          score: 0,
        },
        {
          id: '2',
          questionId: '19',
          label: "I can't concentrate as well as usual.",
          score: 1,
        },
        {
          id: '3',
          questionId: '19',
          label: "It's hard to keep my mind on anything for very long.",
          score: 2,
        },
        {
          id: '4',
          questionId: '19',
          label: "I find I can't concentrate on anything.",
          score: 3,
        },
      ],
    },
    {
      id: '20',
      label: 'Tiredness or Fatigue',
      answers: [
        {
          id: '1',
          questionId: '20',
          label: 'I am no more tired or fatigued than usual.',
          score: 0,
        },
        {
          id: '2',
          questionId: '20',
          label: 'I get more tired or fatigued more easily than usual.',
          score: 1,
        },
        {
          id: '3',
          questionId: '20',
          label:
            'I am too tired or fatigued to do a lot of the things I used to do.',
          score: 2,
        },
        {
          id: '4',
          questionId: '20',
          label:
            'I am too tired or fatigued to do most of the things I used to do.',
          score: 3,
        },
      ],
    },
    {
      id: '21',
      label: 'Loss of Interest in Sex',
      answers: [
        {
          id: '1',
          questionId: '21',
          label: 'I have not noticed any recent change in my interest in sex.',
          score: 0,
        },
        {
          id: '2',
          questionId: '21',
          label: 'I am less interested in sex than I used be.',
          score: 1,
        },
        {
          id: '3',
          questionId: '21',
          label: 'I am much less interested in sex now.',
          score: 2,
        },
        {
          id: '4',
          questionId: '21',
          label: 'I have lost interest in sex completely.',
          score: 3,
        },
      ],
    },
  ];
}

export const bdiTestProvider = new BDITestProvider();
