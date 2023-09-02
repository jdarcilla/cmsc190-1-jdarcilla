import { DateTime } from 'luxon';
import { observer } from 'mobx-react-lite';
import { StyleSheet, Text, View } from 'react-native';
import Button from '../components/Button';
import Card from '../components/Card';
import { scoreInterpretationLabel } from '../core/models/ScoreInterpretation';
import { theme } from '../core/theme';
import { getScoreInterpretation } from '../core/utils';
import { modalApi } from '../providers/modalApi';
import { statsProvider } from '../providers/statsProvider';
import TestModalWidget from './TestModalWidget';

const TestResultCardWidget = () => {
  const stats = statsProvider.stats?.current();
  const testResults = stats?.testResults ?? [];
  const latestTestResult = testResults.at(-1);

  const renderResult = (): React.ReactNode => {
    const scoreInterpretation = getScoreInterpretation(latestTestResult?.score);

    return (
      <View style={styles.resultContainer}>
        <Text style={styles.score}>{latestTestResult?.score ?? '--'}/63</Text>
        <View style={styles.textGroup}>
          <Text style={styles.text}>
            BDI-II Result
            {latestTestResult?.lastUpdatedIsoDateUtc
              ? ` (${DateTime.fromISO(
                  latestTestResult.lastUpdatedIsoDateUtc
                ).toLocaleString(DateTime.DATE_MED)})`
              : ''}
            :
          </Text>
          <Text
            style={[
              styles.text,
              { fontSize: theme.fonts.titleMedium.fontSize },
            ]}>
            {scoreInterpretation
              ? scoreInterpretationLabel[scoreInterpretation]
              : 'Invalid data'}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <Card
      mode="elevated"
      cardStyles={{ backgroundColor: theme.colors.primary }}>
      {renderResult()}
      <Button
        buttonColor={theme.colors.surface}
        textColor={theme.colors.primary}
        onPress={() =>
          modalApi.show(dismiss => (
            <TestModalWidget dismiss={() => dismiss()} />
          ))
        }>
        Take Test
      </Button>
    </Card>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    borderBottomColor: theme.colors.inversePrimary,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    paddingBottom: 8,
  },
  headerText: {
    color: theme.colors.onPrimary,
    fontSize: theme.fonts.titleMedium.fontSize,
    fontFamily: theme.fonts.titleMedium.fontFamily,
  },
  resultContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  score: {
    fontSize: theme.fonts.displayMedium.fontSize,
    fontFamily: theme.fonts.displayMedium.fontFamily,
    color: theme.colors.onPrimary,
  },
  textGroup: {
    paddingLeft: 14,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  text: {
    color: theme.colors.onPrimary,
    fontSize: theme.fonts.bodyMedium.fontSize,
    fontFamily: theme.fonts.bodyMedium.fontFamily,
  },
});

export default observer(TestResultCardWidget);
