import { observer } from 'mobx-react-lite';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { AbstractChartConfig } from 'react-native-chart-kit/dist/AbstractChart';
import Card from '../components/Card';
import { theme } from '../core/theme';
import { dateTimeProvider } from '../providers/dateTimeProvider';
import { statsProvider } from '../providers/statsProvider';

const MoodChartWidget = () => {
  const screenWidth = Dimensions.get('window').width;
  const chartConfig: AbstractChartConfig = {
    backgroundColor: '#FFFFFF',
    color: (opacity = 1) => theme.colors.onSurface,
    useShadowColorFromDataset: true,
    fillShadowGradientFromOpacity: 0,
    fillShadowGradientToOpacity: 0,
  };
  const last7daysLabels = [
    dateTimeProvider.dateTime
      .minus({ day: 6 })
      .toLocaleString({ month: 'short', day: 'numeric' }),
    dateTimeProvider.dateTime
      .minus({ day: 5 })
      .toLocaleString({ month: 'short', day: 'numeric' }),
    dateTimeProvider.dateTime
      .minus({ day: 4 })
      .toLocaleString({ month: 'short', day: 'numeric' }),
    dateTimeProvider.dateTime
      .minus({ day: 3 })
      .toLocaleString({ month: 'short', day: 'numeric' }),
    dateTimeProvider.dateTime
      .minus({ day: 2 })
      .toLocaleString({ month: 'short', day: 'numeric' }),
    dateTimeProvider.dateTime
      .minus({ day: 1 })
      .toLocaleString({ month: 'short', day: 'numeric' }),
    dateTimeProvider.dateTime.toLocaleString({
      month: 'short',
      day: 'numeric',
    }),
  ];

  const renderHeader = (): React.ReactNode => {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>MOOD TRACKER</Text>
      </View>
    );
  };
  const renderChart = (): React.ReactNode => {
    const energyLevelData = statsProvider.energyLevelData;
    const pleasantnessLevelData = statsProvider.pleasantnessLevelData;

    if (energyLevelData === undefined || pleasantnessLevelData === undefined)
      return null;

    const data = {
      labels: last7daysLabels,
      datasets: [
        {
          data: energyLevelData,
          color: (opacity = 1) => `rgba(16, 109, 32, ${opacity})`,
        },
        {
          data: pleasantnessLevelData,
          color: (opacity = 1) => `rgba(0, 99, 154, ${opacity})`,
        },
      ],
      legend: ['Energy', 'Pleasantness'],
    };

    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <LineChart
          data={data}
          height={200}
          width={screenWidth - 50}
          chartConfig={chartConfig}
          withInnerLines={false}
          withOuterLines={false}
          withHorizontalLabels={false}
          transparent={true}
          style={{
            marginVertical: 8,
            paddingRight: 20,
            paddingLeft: 40,
          }}
          yAxisInterval={1}
        />
      </View>
    );
  };

  return (
    <Card mode="elevated">
      {renderHeader()}
      {renderChart()}
    </Card>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    borderBottomColor: theme.colors.outline,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    paddingBottom: 8,
  },
  headerText: {
    color: theme.colors.onSurface,
    fontSize: theme.fonts.titleMedium.fontSize,
    fontFamily: theme.fonts.titleMedium.fontFamily,
  },
});

export default observer(MoodChartWidget);
