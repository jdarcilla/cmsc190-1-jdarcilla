import { Question } from 'core';

class PHQ9TestProvider {
  questions: Question[] = [
    {
      id: '1',
      label: 'Little interest or pleasure in doing things',
      answers: [
        {
          id: '1',
          questionId: '1',
          label: 'Not at all',
          score: 0,
        },
        {
          id: '2',
          questionId: '1',
          label: 'Several days',
          score: 1,
        },
        {
          id: '3',
          questionId: '1',
          label: 'More than half the days',
          score: 2,
        },
        {
          id: '4',
          questionId: '1',
          label: 'Nearly every day',
          score: 3,
        },
      ],
    },
    {
      id: '2',
      label: 'Feeling down, depressed, or hopeless',
      answers: [
        {
          id: '1',
          questionId: '2',
          label: 'Not at all',
          score: 0,
        },
        {
          id: '2',
          questionId: '2',
          label: 'Several days',
          score: 1,
        },
        {
          id: '3',
          questionId: '2',
          label: 'More than half the days',
          score: 2,
        },
        {
          id: '4',
          questionId: '2',
          label: 'Nearly every day',
          score: 3,
        },
      ],
    },
    {
      id: '3',
      label: 'Trouble falling or staying asleep, or sleeping too much',
      answers: [
        {
          id: '1',
          questionId: '3',
          label: 'Not at all',
          score: 0,
        },
        {
          id: '2',
          questionId: '3',
          label: 'Several days',
          score: 1,
        },
        {
          id: '3',
          questionId: '3',
          label: 'More than half the days',
          score: 2,
        },
        {
          id: '4',
          questionId: '3',
          label: 'Nearly every day',
          score: 3,
        },
      ],
    },
    {
      id: '4',
      label: 'Feeling tired or having little energy',
      answers: [
        {
          id: '1',
          questionId: '4',
          label: 'Not at all',
          score: 0,
        },
        {
          id: '2',
          questionId: '4',
          label: 'Several days',
          score: 1,
        },
        {
          id: '3',
          questionId: '4',
          label: 'More than half the days',
          score: 2,
        },
        {
          id: '4',
          questionId: '4',
          label: 'Nearly every day',
          score: 3,
        },
      ],
    },
    {
      id: '5',
      label: 'Poor appetite or overeating',
      answers: [
        {
          id: '1',
          questionId: '5',
          label: 'Not at all',
          score: 0,
        },
        {
          id: '2',
          questionId: '5',
          label: 'Several days',
          score: 1,
        },
        {
          id: '3',
          questionId: '5',
          label: 'More than half the days',
          score: 2,
        },
        {
          id: '4',
          questionId: '5',
          label: 'Nearly every day',
          score: 3,
        },
      ],
    },
    {
      id: '6',
      label:
        'Feeling bad about yourself — or that you are a failure or have let yourself or your family down',
      answers: [
        {
          id: '1',
          questionId: '6',
          label: 'Not at all',
          score: 0,
        },
        {
          id: '2',
          questionId: '6',
          label: 'Several days',
          score: 1,
        },
        {
          id: '3',
          questionId: '6',
          label: 'More than half the days',
          score: 2,
        },
        {
          id: '4',
          questionId: '6',
          label: 'Nearly every day',
          score: 3,
        },
      ],
    },
    {
      id: '7',
      label:
        ' Trouble concentrating on things, such as reading the newspaper or watching television',
      answers: [
        {
          id: '1',
          questionId: '7',
          label: 'Not at all',
          score: 0,
        },
        {
          id: '2',
          questionId: '7',
          label: 'Several days',
          score: 1,
        },
        {
          id: '3',
          questionId: '7',
          label: 'More than half the days',
          score: 2,
        },
        {
          id: '4',
          questionId: '7',
          label: 'Nearly every day',
          score: 3,
        },
      ],
    },
    {
      id: '8',
      label:
        'Moving or speaking so slowly that other people could have noticed? Or the opposite — being so fidgety or restless that you have been moving around a lot more than usual',
      answers: [
        {
          id: '1',
          questionId: '8',
          label: 'Not at all',
          score: 0,
        },
        {
          id: '2',
          questionId: '8',
          label: 'Several days',
          score: 1,
        },
        {
          id: '3',
          questionId: '8',
          label: 'More than half the days',
          score: 2,
        },
        {
          id: '4',
          questionId: '8',
          label: 'Nearly every day',
          score: 3,
        },
      ],
    },
    {
      id: '9',
      label:
        'Thoughts that you would be better off dead or of hurting yourself in some way',
      answers: [
        {
          id: '1',
          questionId: '9',
          label: 'Not at all',
          score: 0,
        },
        {
          id: '2',
          questionId: '9',
          label: 'Several days',
          score: 1,
        },
        {
          id: '3',
          questionId: '9',
          label: 'More than half the days',
          score: 2,
        },
        {
          id: '4',
          questionId: '9',
          label: 'Nearly every day',
          score: 3,
        },
      ],
    },
  ];
}

export const phq9TestProvider = new PHQ9TestProvider();
