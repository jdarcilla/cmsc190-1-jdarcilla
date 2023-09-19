import { observer } from 'mobx-react-lite';
import React from 'react';
import { ScrollView } from 'react-native';
import Button from '../../components/Button';
import DashboardBackground from '../../components/DashboardBackground';
import Header from '../../components/Header';
import { userProvider } from '../../providers/userProvider';
import { Navigation } from '../../types';
import HelplinesCardWidget from '../../widgets/HelplinesCardWidget';
import UserDataCardWidget from '../../widgets/UserDataCardWidget';

type Props = {
  navigation: Navigation;
};

const ProfileScreen = ({ navigation }: Props) => (
  <DashboardBackground>
    <Header>Profile</Header>

    <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 85 }}>
      <UserDataCardWidget />
      <HelplinesCardWidget />
      <Button mode="contained" onPress={() => userProvider.logout()}>
        Log out
      </Button>
    </ScrollView>
  </DashboardBackground>
);

export default observer(ProfileScreen);
