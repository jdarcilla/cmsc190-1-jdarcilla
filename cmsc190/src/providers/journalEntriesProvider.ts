import { JournalEntry, repo } from 'core';
import { DateTime } from 'luxon';
import { computed, makeAutoObservable } from 'mobx';
import { IResource } from 'mobx-utils';
import { dateTimeProvider } from './dateTimeProvider';
import { userProvider } from './userProvider';

class JournalEntriesProvider {
  get journals(): IResource<JournalEntry[]> | undefined {
    if (!userProvider.user) return;
    const dateTime = dateTimeProvider.dateTime;

    return repo.journalEntries.bindCollectionQuery({
      key: { uid: userProvider.user.uid },
      where: ['createdIsoDateUtc', '>=', dateTime.toISODate() ?? ''],
      where2: ['createdIsoDateUtc','<=',(dateTime.plus({ day: 1 }).toISODate() ?? ''),], // prettier-ignore
      orderByDirection: 'asc',
      orderByField: 'createdIsoDateUtc',
    });
  }

  get journalsToday(): IResource<JournalEntry[]> | undefined {
    if (!userProvider.user) return;
    const dateTime = DateTime.now();

    return repo.journalEntries.bindCollectionQuery({
      key: { uid: userProvider.user.uid },
      where: ['createdIsoDateUtc', '>=', dateTime.toISODate() ?? ''],
      where2: ['createdIsoDateUtc','<=',(dateTime.plus({ day: 1 }).toISODate() ?? ''),], // prettier-ignore
      orderByDirection: 'asc',
      orderByField: 'createdIsoDateUtc',
    });
  }

  get journalsTodayMinus1Day(): IResource<JournalEntry[]> | undefined {
    if (!userProvider.user) return;
    const dateTime = DateTime.now();

    return repo.journalEntries.bindCollectionQuery({
      key: { uid: userProvider.user.uid },
      where: [
        'createdIsoDateUtc',
        '>=',
        dateTime.minus({ day: 1 }).toISODate() ?? '',
      ],
      where2: ['createdIsoDateUtc','<=',(dateTime.toISODate() ?? ''),], // prettier-ignore
      orderByDirection: 'asc',
      orderByField: 'createdIsoDateUtc',
    });
  }

  get journalsTodayMinus2Days(): IResource<JournalEntry[]> | undefined {
    if (!userProvider.user) return;
    const dateTime = DateTime.now();

    return repo.journalEntries.bindCollectionQuery({
      key: { uid: userProvider.user.uid },
      where: [
        'createdIsoDateUtc',
        '>=',
        dateTime.minus({ day: 2 }).toISODate() ?? '',
      ],
      where2: ['createdIsoDateUtc','<=',(dateTime.minus({ day: 1 }).toISODate() ?? ''),], // prettier-ignore
      orderByDirection: 'asc',
      orderByField: 'createdIsoDateUtc',
    });
  }

  get journalsTodayMinus3Days(): IResource<JournalEntry[]> | undefined {
    if (!userProvider.user) return;
    const dateTime = DateTime.now();

    return repo.journalEntries.bindCollectionQuery({
      key: { uid: userProvider.user.uid },
      where: [
        'createdIsoDateUtc',
        '>=',
        dateTime.minus({ day: 3 }).toISODate() ?? '',
      ],
      where2: ['createdIsoDateUtc','<=',(dateTime.minus({ day: 2 }).toISODate() ?? '')], // prettier-ignore
      orderByDirection: 'asc',
      orderByField: 'createdIsoDateUtc',
    });
  }

  get journalsTodayMinus4Days(): IResource<JournalEntry[]> | undefined {
    if (!userProvider.user) return;
    const dateTime = DateTime.now();

    return repo.journalEntries.bindCollectionQuery({
      key: { uid: userProvider.user.uid },
      where: [
        'createdIsoDateUtc',
        '>=',
        dateTime.minus({ day: 4 }).toISODate() ?? '',
      ],
      where2: ['createdIsoDateUtc','<=',(dateTime.minus({ day: 3 }).toISODate() ?? '')], // prettier-ignore
      orderByDirection: 'asc',
      orderByField: 'createdIsoDateUtc',
    });
  }

  get journalsTodayMinus5Days(): IResource<JournalEntry[]> | undefined {
    if (!userProvider.user) return;
    const dateTime = DateTime.now();

    return repo.journalEntries.bindCollectionQuery({
      key: { uid: userProvider.user.uid },
      where: [
        'createdIsoDateUtc',
        '>=',
        dateTime.minus({ day: 5 }).toISODate() ?? '',
      ],
      where2: ['createdIsoDateUtc','<=',(dateTime.minus({ day: 4 }).toISODate() ?? ''),], // prettier-ignore
      orderByDirection: 'asc',
      orderByField: 'createdIsoDateUtc',
    });
  }

  get journalsTodayMinus6Days(): IResource<JournalEntry[]> | undefined {
    if (!userProvider.user) return;
    const dateTime = DateTime.now();

    return repo.journalEntries.bindCollectionQuery({
      key: { uid: userProvider.user.uid },
      where: [
        'createdIsoDateUtc',
        '>=',
        dateTime.minus({ day: 6 }).toISODate() ?? '',
      ],
      where2: ['createdIsoDateUtc','<=',(dateTime.minus({ day: 5 }).toISODate() ?? '')], // prettier-ignore
      orderByDirection: 'asc',
      orderByField: 'createdIsoDateUtc',
    });
  }

  constructor() {
    makeAutoObservable(this, {
      journals: computed,
      journalsToday: computed,
      journalsTodayMinus1Day: computed,
      journalsTodayMinus2Days: computed,
      journalsTodayMinus3Days: computed,
      journalsTodayMinus4Days: computed,
      journalsTodayMinus5Days: computed,
      journalsTodayMinus6Days: computed,
    });
  }
}

export const journalEntriesProvider = new JournalEntriesProvider();
