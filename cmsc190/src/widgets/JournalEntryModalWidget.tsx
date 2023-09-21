import { JournalEntryEvent, getCircleColorFromMood, repo, theme } from 'core';
import { observer } from 'mobx-react-lite';
import { ScrollView, StyleSheet, Text, ToastAndroid, View } from 'react-native';
import { Button, Chip } from 'react-native-paper';
import { journalEntriesProvider } from '../providers/journalEntriesProvider';
import { userProvider } from '../providers/userProvider';

type Props = {
  journalEntryEvent: JournalEntryEvent;
  dismiss: () => void;
};

const JournalEntryModalWidget = ({ journalEntryEvent, dismiss }: Props) => {
  const journalEntry = journalEntriesProvider.journals
    ?.current()
    ?.find(
      journalEntry => journalEntry.id === journalEntryEvent.journalEntryId
    );

  const onDelete = async () => {
    if (!userProvider.user) return;
    if (!journalEntry) return;
    await repo.journalEntry.delete({
      uid: userProvider.user.uid,
      journalEntryId: journalEntry.id,
    });
    dismiss();
    ToastAndroid.show(
      'Journal entry successfully deleted!',
      ToastAndroid.SHORT
    );
  };

  if (!journalEntry) return null;
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerText}>Situation</Text>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{journalEntry.situation}</Text>
      </View>

      <Text style={[styles.headerText, { marginBottom: 12 }]}>Mood</Text>
      <View
        style={{ flexDirection: 'row', marginBottom: 12, marginHorizontal: 8 }}>
        <Chip
          mode="outlined"
          selectedColor={getCircleColorFromMood(journalEntry.mood)}>
          {journalEntry.mood}
        </Chip>
      </View>
      <Text style={styles.headerText}>Automatic Thoughts</Text>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{journalEntry.automaticThoughts}</Text>
      </View>
      <Text style={styles.headerText}>Supportive Evidence</Text>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{journalEntry.supportiveEvidence}</Text>
      </View>
      <Text style={styles.headerText}>Contradictory Evidence</Text>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{journalEntry.contradictoryEvidence}</Text>
      </View>
      <Text style={styles.headerText}>Balanced Thoughts</Text>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{journalEntry.balancedThoughts}</Text>
      </View>
      <Button
        mode="contained"
        buttonColor={theme.colors.error}
        textColor={theme.colors.onError}
        style={{ marginVertical: 20 }}
        onPress={onDelete}>
        Delete Entry
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  headerText: {
    fontSize: theme.fonts.titleLarge.fontSize,
    fontFamily: theme.fonts.titleLarge.fontFamily,
    fontWeight: theme.fonts.titleLarge.fontWeight,
    color: theme.colors.onSurfaceVariant,
  },
  textContainer: {
    borderColor: theme.colors.outline,
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    margin: 8,
  },
  text: {
    color: theme.colors.onSurface,
  },
});

export default observer(JournalEntryModalWidget);
