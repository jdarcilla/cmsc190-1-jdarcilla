import { DateTime } from 'luxon';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { StyleSheet, Text, ToastAndroid, View } from 'react-native';
import { RadioButton } from 'react-native-paper';
import Button from '../components/Button';
import Header from '../components/Header';
import { Answer, Question } from '../core/models/BDI-II';
import { repo } from '../core/repo/repo';
import { theme } from '../core/theme';
import { getScore } from '../core/utils';
import { bdiTestProvider } from '../providers/bdiTestProvider';
import { statsProvider } from '../providers/statsProvider';
import { userProvider } from '../providers/userProvider';

type Props = {
  dismiss: () => void;
};

const TestModalWidget = ({ dismiss }: Props) => {
  const stats = statsProvider.stats?.current();
  const testResults = stats?.testResults ?? [];
  const questions = bdiTestProvider.questions;
  const [currentQuestionIndex, setCurrentQuestionIndex] =
    React.useState<number>(0);
  const [currentAnswers, setCurrentAnswers] = React.useState<Answer[]>([]);

  const onSelectAnswer = (answer: Answer): void => {
    const oldAnswerIndex = currentAnswers.findIndex(
      value => value.questionId === answer.questionId
    );

    // no answer yet
    if (oldAnswerIndex < 0) {
      setCurrentAnswers([...currentAnswers, answer]);
      return;
    }

    // already answered
    const newAnswers = currentAnswers.map(oldAnswer => {
      if (oldAnswer.questionId === answer.questionId) return answer;
      return oldAnswer;
    });
    setCurrentAnswers(newAnswers);
  };

  const onSubmit = () => {
    if (currentAnswers.length !== 21) {
      ToastAndroid.show('Please answer all questions', ToastAndroid.SHORT);
      return;
    }

    if (!userProvider.user) return;

    const currentDateTime = DateTime.now();

    // if no stats yet
    if (!stats) {
      repo.stats.put(
        { uid: userProvider.user.uid },
        {
          currentStreak: 0,
          longestStreak: 0,
          lastUpdatedIsoDateUtc: currentDateTime.toISODate() ?? '',
          testResults: [
            {
              score: getScore(currentAnswers),
              lastUpdatedIsoDateUtc: currentDateTime.toISODate() ?? '',
            },
          ],
        }
      );
      return;
    }

    repo.stats.update(
      { uid: userProvider.user.uid },
      {
        testResults: [
          ...testResults,
          {
            score: getScore(currentAnswers),
            lastUpdatedIsoDateUtc: currentDateTime.toISODate() ?? '',
          },
        ],
      }
    );

    dismiss();
  };

  const renderQuestion = ({
    index,
    question,
  }: {
    index: number;
    question: Question;
  }): React.ReactNode => {
    return (
      <View style={{ marginVertical: 20 }}>
        <Text style={styles.questionLabel}>
          {index + 1}. {question.label}
        </Text>
        {renderAnswers({ answers: question.answers, questionIndex: index })}
      </View>
    );
  };

  const renderAnswers = ({
    questionIndex,
    answers,
  }: {
    questionIndex: number;
    answers: Answer[];
  }): React.ReactNode => {
    const [value, setValue] = React.useState<string>('');

    React.useEffect(() => {
      const currentAnswer = currentAnswers.find(
        answer => answer.questionId === (questionIndex + 1).toString()
      );
      setValue(
        `${questionIndex}-${currentAnswer ? Number(currentAnswer.id) - 1 : 'x'}`
      );
    }, [currentQuestionIndex]);

    return (
      <View>
        <RadioButton.Group
          value={value}
          onValueChange={newValue => {
            const answerIndex = newValue.split('-')[1];
            setValue(newValue);
            onSelectAnswer(answers[Number(answerIndex)]);
          }}>
          {answers.map((answer, index) =>
            renderAnswer({ answer, index, questionIndex })
          )}
        </RadioButton.Group>
        {renderActions()}
      </View>
    );
  };

  const renderAnswer = ({
    questionIndex,
    index,
    answer,
  }: {
    questionIndex: number;
    index: number;
    answer: Answer;
  }): React.ReactNode => {
    return (
      <View key={index} style={styles.answer}>
        <RadioButton value={`${questionIndex}-${index}`} />
        <View style={{ flex: 1 }}>
          <Text>{answer.label}</Text>
        </View>
      </View>
    );
  };

  const renderActions = (): React.ReactNode => {
    if (currentQuestionIndex === 20)
      return (
        <View style={{ marginVertical: 20 }}>
          <Button
            mode="outlined"
            onPress={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}>
            Previous
          </Button>
          <Button
            mode="contained"
            disabled={currentAnswers.length !== 21}
            onPress={onSubmit}>
            Submit
          </Button>
        </View>
      );

    return (
      <View style={{ marginVertical: 20 }}>
        {currentQuestionIndex > 0 && (
          <Button
            mode="outlined"
            onPress={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}>
            Previous
          </Button>
        )}
        <Button
          mode="contained"
          disabled={
            !currentAnswers.find(
              answer =>
                answer.questionId === (currentQuestionIndex + 1).toString()
            )
          }
          onPress={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}>
          Next
        </Button>
      </View>
    );
  };

  return (
    <View style={{ padding: 20, paddingTop: 0 }}>
      <Header style={{ fontSize: theme.fonts.titleLarge.fontSize }}>
        BDI-II
      </Header>
      <Text style={styles.instructions}>
        Instructions: This questionnaire consists of 21 groups of statements.
        Please read each group of statements carefully. And then select one
        statement in each group that best describes the way you have been
        feeling during the past two weeks, including today. If several
        statements in the group seem to apply equally well, select the last
        choice for that group. Be sure that you do not choose more than one
        statement for any group, including Item 16 (Changes in Sleeping Pattern)
        or Item 18 (Changes in Appetite).
      </Text>
      {renderQuestion({
        question: questions[currentQuestionIndex],
        index: currentQuestionIndex,
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  instructions: {
    fontFamily: theme.fonts.labelMedium.fontFamily,
    fontSize: theme.fonts.labelMedium.fontSize,
    fontWeight: theme.fonts.labelMedium.fontWeight,
    color: theme.colors.outlineVariant,

    marginBottom: 6,
  },
  answer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  questionLabel: {
    fontFamily: theme.fonts.bodyLarge.fontFamily,
    fontSize: theme.fonts.bodyLarge.fontSize,
    fontWeight: theme.fonts.bodyLarge.fontWeight,
    color: theme.colors.onSurface,
    marginVertical: 4,
  },
});

export default observer(TestModalWidget);
