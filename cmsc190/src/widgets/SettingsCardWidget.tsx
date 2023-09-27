import { repo } from 'client';
import { User, theme } from 'core';
import { observer } from 'mobx-react-lite';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Switch } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Card from '../components/Card';
import { userProvider } from '../providers/userProvider';

type NumberPickerProps = {
  onChange: (value: number) => void;
  minValue?: number;
  maxValue?: number;
  value: number;
};

const Picker = ({ onChange, minValue, maxValue, value }: NumberPickerProps) => {
  return (
    <View
      style={{
        alignItems: 'center',
        flexDirection: 'row',
        columnGap: 10,
      }}>
      <TouchableOpacity
        onPress={() => {
          if (value === minValue) return;
          onChange(value - 1);
        }}>
        <MaterialCommunityIcons name="chevron-down" size={24} />
      </TouchableOpacity>
      <Text style={{ fontWeight: 'bold', color: theme.colors.onSurface }}>
        {value}
      </Text>
      <TouchableOpacity
        onPress={() => {
          if (value === maxValue) return;
          onChange(value + 1);
        }}>
        <MaterialCommunityIcons name="chevron-up" size={24} />
      </TouchableOpacity>
    </View>
  );
};

const SettingsCardWidget = () => {
  const userData = userProvider.userData?.current();

  const onToggleNotification = () => {
    if (!userData) return;

    repo.user.update(userData, {
      notificationEnabled: !userData.notificationEnabled,
    });
  };

  const onToggleGoals = () => {
    if (!userData) return;

    if (!userData.goals) {
      repo.user.update(userData, {
        goals: { journalEntries: 1, tasksCompleted: 1, meditationsDone: 1 },
      });
      return;
    }

    repo.user.update(userData, { goals: undefined });
  };

  const renderEnableGoals = (userData: User) => {
    return (
      <>
        <View style={styles.row}>
          <Text style={{ color: theme.colors.onSurface, fontWeight: 'bold' }}>
            Add goals
          </Text>
          <Switch value={!!userData.goals} onValueChange={onToggleGoals} />
        </View>
        {!!userData.goals ? renderGoals(userData) : null}
      </>
    );
  };

  const renderGoals = (userData: User) => {
    return (
      <>
        <View style={[styles.row, { marginLeft: 10, marginTop: 4 }]}>
          <Text style={{ color: theme.colors.onSurface }}>Journal entries</Text>
          <Picker
            onChange={value =>
              repo.user.update(userData, { goals: { journalEntries: value } })
            }
            minValue={1}
            value={userData.goals?.journalEntries ?? 0}
          />
        </View>
        <View style={[styles.row, { marginLeft: 10, marginTop: 4 }]}>
          <Text style={{ color: theme.colors.onSurface }}>Tasks completed</Text>
          <Picker
            onChange={value =>
              repo.user.update(userData, { goals: { tasksCompleted: value } })
            }
            minValue={1}
            value={userData.goals?.tasksCompleted ?? 0}
          />
        </View>
        <View style={[styles.row, { marginLeft: 10, marginTop: 4 }]}>
          <Text style={{ color: theme.colors.onSurface }}>
            Meditations done
          </Text>
          <Picker
            onChange={value =>
              repo.user.update(userData, { goals: { meditationsDone: value } })
            }
            minValue={1}
            value={userData.goals?.meditationsDone ?? 0}
          />
        </View>
      </>
    );
  };

  return (
    <Card>
      <Text style={styles.header}>SETTINGS</Text>
      <View style={styles.content}>
        {userData ? (
          <>
            <View style={styles.row}>
              <Text
                style={{ color: theme.colors.onSurface, fontWeight: 'bold' }}>
                Enable notifications
              </Text>
              <Switch
                value={!!userData.notificationEnabled}
                onValueChange={onToggleNotification}
              />
            </View>
            {renderEnableGoals(userData)}
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
  content: {
    marginTop: 10,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default observer(SettingsCardWidget);
