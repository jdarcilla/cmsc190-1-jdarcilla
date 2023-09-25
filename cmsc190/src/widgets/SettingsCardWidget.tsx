import { repo } from 'client';
import { theme } from 'core';
import { observer } from 'mobx-react-lite';
import { StyleSheet, Text, View } from 'react-native';
import { Switch } from 'react-native-paper';
import Card from '../components/Card';
import { userProvider } from '../providers/userProvider';

const SettingsCardWidget = () => {
  const userData = userProvider.userData?.current();

  const onToggle = () => {
    if (!userData) return;

    repo.user.update(userData, {
      notificationEnabled: !userData.notificationEnabled,
    });
  };

  return (
    <Card>
      <Text style={styles.header}>SETTINGS</Text>
      <View style={styles.group}>
        {userData ? (
          <>
            <Text>Enable notifications</Text>
            <Switch
              value={!!userData.notificationEnabled}
              onValueChange={onToggle}
            />
          </>
        ) : (
          <Text>Failed to fetch user data.</Text>
        )}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  header: {
    color: theme.colors.onSurface,
    fontSize: theme.fonts.labelLarge.fontSize,
    fontFamily: theme.fonts.labelLarge.fontFamily,
    borderBottomColor: theme.colors.outline,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    paddingBottom: 8,
  },
  group: {
    marginTop: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default observer(SettingsCardWidget);
