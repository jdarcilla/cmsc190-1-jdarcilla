import { observer } from 'mobx-react-lite';
import React from 'react';
import { ScrollView } from 'react-native';
import DashboardBackground from '../../components/DashboardBackground';
import Header from '../../components/Header';
import { Navigation } from '../../types';
import MoodChartCardWidget from '../../widgets/MoodChartCardWidget';
import StreaksCardWidget from '../../widgets/StreaksCardWidget';
import TestResultCardWidget from '../../widgets/TestResultCardWidget';

type Props = {
  navigation: Navigation;
};

const ProgressScreen = ({ navigation }: Props) => {
  return (
    <DashboardBackground>
      <Header>Progress</Header>
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 85 }}>
        <StreaksCardWidget />
        <TestResultCardWidget />
        <MoodChartCardWidget />
      </ScrollView>
    </DashboardBackground>
  );
};

export default observer(ProgressScreen);
