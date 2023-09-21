import { JournalEntryEvent, getJournalEntryEvent, theme } from 'core';
import { DateTime } from 'luxon';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import Timeline from 'react-native-timeline-flatlist';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Card from '../components/Card';
import { dateTimeProvider } from '../providers/dateTimeProvider';
import { journalEntriesProvider } from '../providers/journalEntriesProvider';
import { modalApi } from '../providers/modalApi';
import JournalEntryEditModalWidget from './JournalEntryEditModalWidget';
import JournalEntryModalWidget from './JournalEntryModalWidget';

const JournalEntriesCardWidget = () => {
  const handlePresentModalPress = (journalEntryEvent: JournalEntryEvent) => {
    modalApi.show(dismiss => (
      <JournalEntryModalWidget
        journalEntryEvent={journalEntryEvent}
        dismiss={() => dismiss()}
      />
    ));
  };

  const journalEntries = journalEntriesProvider.journals?.current();

  const onAddJournalEntry = () => {
    modalApi.show(dismiss => (
      <JournalEntryEditModalWidget dismiss={() => dismiss()} />
    ));
  };

  const renderHeader = (): React.ReactNode => {
    const dateTime = dateTimeProvider.dateTime;
    const currentIsoDate = DateTime.now().toISODate();
    return (
      <View style={styles.journalsHeader}>
        <Text style={styles.journalsHeaderText}>JOURNAL</Text>
        {dateTime.toISODate() === currentIsoDate && (
          <TouchableOpacity onPress={onAddJournalEntry}>
            <MaterialCommunityIcons
              name="plus-box-outline"
              color={theme.colors.outline}
              size={20}
            />
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const renderJournalEntries = (): React.ReactNode => {
    if (!journalEntries?.length)
      return (
        <Text style={styles.emptyState}>
          Empty. Hit the plus sign to add one.
        </Text>
      );

    return (
      <Timeline
        data={journalEntries.map(journalEntry =>
          getJournalEntryEvent(journalEntry)
        )}
        circleSize={24}
        lineColor={theme.colors.outlineVariant}
        style={styles.timelineContainerStyle}
        showTime={false}
        isUsingFlatlist={false}
        renderDetail={renderDetail}
      />
    );
  };

  const renderDetail = (
    rowData: JournalEntryEvent,
    sectionId: number,
    rowId: number
  ) => {
    let title = <Text>{rowData.title}</Text>;
    var desc = null;
    if (rowData.description)
      desc = (
        <View>
          <Text>{rowData.description}</Text>
        </View>
      );

    return (
      <TouchableOpacity onPress={() => handlePresentModalPress(rowData)}>
        <View style={{ flex: 1 }}>
          {title}
          {desc}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Card mode="elevated">
      {renderHeader()}
      {renderJournalEntries()}
    </Card>
  );
};

const styles = StyleSheet.create({
  journalsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: theme.colors.outline,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    paddingBottom: 8,
  },
  journalsHeaderText: {
    color: theme.colors.onSurface,
    fontSize: theme.fonts.labelLarge.fontSize,
    fontFamily: theme.fonts.labelLarge.fontFamily,
  },
  timelineContainerStyle: {
    padding: 8,
    marginTop: 8,
  },
  emptyState: {
    textAlign: 'center',
    color: theme.colors.onSurfaceVariant,
    padding: 20,
  },
});

export default observer(JournalEntriesCardWidget);
