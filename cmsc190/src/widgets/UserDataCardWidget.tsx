import { theme } from 'core';
import { observer } from 'mobx-react-lite';
import { StyleSheet, Text, View } from 'react-native';
import Card from '../components/Card';
import { userProvider } from '../providers/userProvider';

const UserDataCardWidget = () => {
  const user = userProvider.user;

  if (!user) return <Text>Not signed in.</Text>;

  return (
    <Card>
      <View style={styles.row}>
        <Text style={styles.textLabel}>Name:</Text>
        <Text style={styles.textValue}>{user.displayName}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.textLabel}>Email:</Text>
        <Text style={styles.textValue}>{user.email}</Text>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textLabel: {
    color: theme.colors.outline,
  },
  textValue: {
    color: theme.colors.onSurface,
  },
});

export default observer(UserDataCardWidget);
