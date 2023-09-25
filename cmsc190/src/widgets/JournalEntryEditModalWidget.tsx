import { repo } from 'client';
import {
  JournalEntry,
  Mood,
  Stats,
  getCircleColorFromMood,
  idFactory,
  journalEntrySchema,
  moods,
  theme,
} from 'core';
import { DateTime } from 'luxon';
import { observer } from 'mobx-react-lite';
import { validate } from 'nutso';
import { useState } from 'react';
import { StyleSheet, Text, ToastAndroid, View } from 'react-native';
import { Chip } from 'react-native-paper';
import Button from '../components/Button';
import Header from '../components/Header';
import TextInput from '../components/TextInput';
import { statsProvider } from '../providers/statsProvider';
import { userProvider } from '../providers/userProvider';

type Props = {
  dismiss: () => void;
};

const JournalEntryEditModalWidget = ({ dismiss }: Props) => {
  const stats = statsProvider.stats?.current();
  const [journalEntry, setJournalEntry] = useState<JournalEntry>({
    id: idFactory.id(),
    situation: '',
    mood: Mood.Happy,
    automaticThoughts: '',
    supportiveEvidence: '',
    contradictoryEvidence: '',
    balancedThoughts: '',
    createdIsoDateUtc: DateTime.now().toISO() ?? '',
  });

  const validation = validate(journalEntry, journalEntrySchema);

  const onSave = (stats: Stats | null | undefined) => {
    if (!userProvider.user) return;

    repo.journalEntry.put(
      { uid: userProvider.user.uid, journalEntryId: journalEntry.id },
      { ...journalEntry, createdIsoDateUtc: DateTime.now().toISO() ?? '' }
    );

    ToastAndroid.show('Journal entry added!', ToastAndroid.SHORT);
    dismiss();

    const currentDateTime = DateTime.now();

    // if no stats saved yet
    if (!stats) {
      repo.stats.put(
        { uid: userProvider.user.uid },
        {
          currentStreak: 1,
          longestStreak: 1,
          lastUpdatedIsoDateUtc: currentDateTime.toISODate() ?? '',
        }
      );
      return;
    }

    // if streak last updated today, no-op
    if (stats.lastUpdatedIsoDateUtc === currentDateTime.toISODate()) return;

    // if streak last updated yesterday
    if (
      stats.lastUpdatedIsoDateUtc ===
      currentDateTime.minus({ day: 1 }).toISODate()
    ) {
      const newCurrentStreak: number = stats.currentStreak + 1;
      const newStats: Partial<Stats> = {
        lastUpdatedIsoDateUtc: currentDateTime.toISODate() ?? '',
        currentStreak: newCurrentStreak,
        longestStreak:
          stats.longestStreak > newCurrentStreak
            ? stats.longestStreak
            : newCurrentStreak,
      };
      repo.stats.update({ uid: userProvider.user.uid }, newStats);
    }

    // if streak last updated at least 2 days ago
    if (
      stats.lastUpdatedIsoDateUtc <=
      (currentDateTime.minus({ day: 2 }).toISODate() ?? '')
    ) {
      const newStats: Partial<Stats> = {
        lastUpdatedIsoDateUtc: currentDateTime.toISODate() ?? '',
        currentStreak: 1,
      };
      repo.stats.update({ uid: userProvider.user.uid }, newStats);
    }
  };

  return (
    <View style={{ padding: 20, paddingTop: 0 }}>
      <Header style={{ fontSize: theme.fonts.titleLarge.fontSize }}>
        Add Journal Entry
      </Header>
      <Text style={styles.headerText}>Situation</Text>
      <TextInput
        label=""
        value={journalEntry.situation}
        onChangeText={(text: string) =>
          setJournalEntry({ ...journalEntry, situation: text })
        }
        numberOfLines={2}
        multiline={true}
        error={!validation.properties.situation.isValid}
        validation={validation.properties.situation}
        returnKeyType="next"
      />
      <Text style={[styles.headerText, { marginBottom: 12 }]}>Mood</Text>
      <View
        style={{
          flexDirection: 'row',
          gap: 8,
          flexWrap: 'wrap',
          marginBottom: 12,
        }}>
        {moods.map((mood, index) => (
          <Chip
            key={index}
            mode="outlined"
            onPress={() => setJournalEntry({ ...journalEntry, mood })}
            selected={journalEntry.mood === mood}
            showSelectedOverlay={true}
            selectedColor={getCircleColorFromMood(mood)}>
            {mood}
          </Chip>
        ))}
      </View>
      <Text style={styles.headerText}>Automatic Thoughts</Text>
      <TextInput
        label=""
        value={journalEntry.automaticThoughts}
        onChangeText={(text: string) =>
          setJournalEntry({ ...journalEntry, automaticThoughts: text })
        }
        numberOfLines={2}
        multiline={true}
        error={!validation.properties.automaticThoughts.isValid}
        validation={validation.properties.automaticThoughts}
        returnKeyType="next"
      />
      <Text style={styles.headerText}>Supportive Evidence</Text>
      <TextInput
        label=""
        value={journalEntry.supportiveEvidence}
        onChangeText={(text: string) =>
          setJournalEntry({ ...journalEntry, supportiveEvidence: text })
        }
        numberOfLines={2}
        multiline={true}
        error={!validation.properties.supportiveEvidence.isValid}
        validation={validation.properties.supportiveEvidence}
        returnKeyType="next"
      />
      <Text style={styles.headerText}>Contradictory Evidence</Text>
      <TextInput
        label=""
        value={journalEntry.contradictoryEvidence}
        onChangeText={(text: string) =>
          setJournalEntry({ ...journalEntry, contradictoryEvidence: text })
        }
        numberOfLines={2}
        multiline={true}
        error={!validation.properties.contradictoryEvidence.isValid}
        validation={validation.properties.contradictoryEvidence}
        returnKeyType="next"
      />
      <Text style={styles.headerText}>Balanced Thoughts</Text>
      <TextInput
        label=""
        value={journalEntry.balancedThoughts}
        onChangeText={(text: string) =>
          setJournalEntry({ ...journalEntry, balancedThoughts: text })
        }
        numberOfLines={2}
        multiline={true}
        error={!validation.properties.balancedThoughts.isValid}
        validation={validation.properties.balancedThoughts}
        returnKeyType="next"
      />
      <Button
        mode="contained"
        style={{ marginBottom: 20 }}
        onPress={() => onSave(stats)}
        disabled={!validation.isValid}>
        Save
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  headerText: {
    fontSize: theme.fonts.titleMedium.fontSize,
    fontFamily: theme.fonts.titleMedium.fontFamily,
    fontWeight: theme.fonts.titleMedium.fontWeight,
    color: theme.colors.onSurface,
  },
});

export default observer(JournalEntryEditModalWidget);
