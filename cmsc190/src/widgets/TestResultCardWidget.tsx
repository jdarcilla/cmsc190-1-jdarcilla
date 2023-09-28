import { theme } from 'core';
import { DateTime } from 'luxon';
import { observer } from 'mobx-react-lite';
import { StyleSheet, Text, View } from 'react-native';
import Button from '../components/Button';
import Card from '../components/Card';
import { modalApi } from '../providers/modalApi';
import { statsProvider } from '../providers/statsProvider';
import TestModalWidget from './TestModalWidget';

const TestResultCardWidget = () => {
  const stats = statsProvider.stats?.current();
  const testResults = stats?.testResults ?? [];
  const latestTestResult = testResults.slice(-1)[0];

  const renderResult = (): React.ReactNode => {
    return (
      <View style={styles.resultContainer}>
        <Text style={styles.score}>{latestTestResult?.score ?? '--'}/27</Text>
        <View style={styles.textGroup}>
          <Text style={styles.text}>PHQ-9 Result</Text>
          <Text style={styles.text}>
            {latestTestResult?.lastUpdatedIsoDateUtc
              ? `(${DateTime.fromISO(
                  latestTestResult.lastUpdatedIsoDateUtc
                ).toLocaleString(DateTime.DATE_MED)})`
              : ''}
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
    alignItems: 'center',
    justifyContent: 'center',
    gap: 14,
  },
  score: {
    fontSize: theme.fonts.displayMedium.fontSize,
    fontFamily: theme.fonts.displayMedium.fontFamily,
    color: theme.colors.onPrimary,
  },
  textGroup: {
    justifyContent: 'center',
  },
  text: {
    color: theme.colors.onPrimary,
    fontSize: theme.fonts.bodyLarge.fontSize,
    fontFamily: theme.fonts.bodyLarge.fontFamily,
  },
});

export default observer(TestResultCardWidget);
