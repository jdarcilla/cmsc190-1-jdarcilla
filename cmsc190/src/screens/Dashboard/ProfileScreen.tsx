import React, { memo } from 'react';
import { ScrollView } from 'react-native';
import Button from '../../components/Button';
import DashboardBackground from '../../components/DashboardBackground';
import Header from '../../components/Header';
import { userProvider } from '../../providers/userProvider';
import { Navigation } from '../../types';
import UserDataCardWidget from '../../widgets/UserDataCardWidget';

type Props = {
  navigation: Navigation;
};

const ProfileScreen = ({ navigation }: Props) => (
  <DashboardBackground>
    <Header>Profile</Header>

    <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 85 }}>
      <UserDataCardWidget />
      <Button mode="contained" onPress={() => userProvider.logout()}>
        Log out
      </Button>
    </ScrollView>
  </DashboardBackground>
);

export default memo(ProfileScreen);
