import {
  Stats,
  getEnergyLevelFromMood,
  getPleasantnessLevelFromMood,
  repo,
} from 'core';
import { computed, makeAutoObservable } from 'mobx';
import { IResource } from 'mobx-utils';
import { journalEntriesProvider } from './journalEntriesProvider';
import { userProvider } from './userProvider';

class StatsProvider {
  get stats(): IResource<Stats | null | undefined> | undefined {
    if (!userProvider.user) return;
    return repo.stats.bind({ uid: userProvider.user.uid });
  }

  get energyLevelData(): number[] | undefined {
    const journalsToday = journalEntriesProvider.journalsToday?.current();
    const journalsTodayMinus1Day =
      journalEntriesProvider.journalsTodayMinus1Day?.current();
    const journalsTodayMinus2Days =
      journalEntriesProvider.journalsTodayMinus2Days?.current();
    const journalsTodayMinus3Days =
      journalEntriesProvider.journalsTodayMinus3Days?.current();
    const journalsTodayMinus4Days =
      journalEntriesProvider.journalsTodayMinus4Days?.current();
    const journalsTodayMinus5Days =
      journalEntriesProvider.journalsTodayMinus5Days?.current();
    const journalsTodayMinus6Days =
      journalEntriesProvider.journalsTodayMinus6Days?.current();

    if (
      !journalsToday ||
      !journalsTodayMinus1Day ||
      !journalsTodayMinus2Days ||
      !journalsTodayMinus3Days ||
      !journalsTodayMinus4Days ||
      !journalsTodayMinus5Days ||
      !journalsTodayMinus6Days
    )
      return;

    const averageLevelToday = journalsToday.length
      ? journalsToday.reduce(
          (t, journalEntry) => t + getEnergyLevelFromMood(journalEntry.mood),
          0
        ) / journalsToday.length
      : 0;
    const averageLevelTodayMinus1Day = journalsTodayMinus1Day.length
      ? journalsTodayMinus1Day.reduce(
          (t, journalEntry) => t + getEnergyLevelFromMood(journalEntry.mood),
          0
        ) / journalsTodayMinus1Day.length
      : 0;
    const averageLevelTodayMinus2Days = journalsTodayMinus2Days.length
      ? journalsTodayMinus2Days.reduce(
          (t, journalEntry) => t + getEnergyLevelFromMood(journalEntry.mood),
          0
        ) / journalsTodayMinus2Days.length
      : 0;
    const averageLevelTodayMinus3Days = journalsTodayMinus3Days.length
      ? journalsTodayMinus3Days.reduce(
          (t, journalEntry) => t + getEnergyLevelFromMood(journalEntry.mood),
          0
        ) / journalsTodayMinus3Days.length
      : 0;
    const averageLevelTodayMinus4Days = journalsTodayMinus4Days.length
      ? journalsTodayMinus4Days.reduce(
          (t, journalEntry) => t + getEnergyLevelFromMood(journalEntry.mood),
          0
        ) / journalsTodayMinus4Days.length
      : 0;
    const averageLevelTodayMinus5Days = journalsTodayMinus5Days.length
      ? journalsTodayMinus5Days.reduce(
          (t, journalEntry) => t + getEnergyLevelFromMood(journalEntry.mood),
          0
        ) / journalsTodayMinus5Days.length
      : 0;
    const averageLevelTodayMinus6Days = journalsTodayMinus6Days.length
      ? journalsTodayMinus6Days.reduce(
          (t, journalEntry) => t + getEnergyLevelFromMood(journalEntry.mood),
          0
        ) / journalsTodayMinus6Days.length
      : 0;

    return [
      averageLevelTodayMinus6Days,
      averageLevelTodayMinus5Days,
      averageLevelTodayMinus4Days,
      averageLevelTodayMinus3Days,
      averageLevelTodayMinus2Days,
      averageLevelTodayMinus1Day,
      averageLevelToday,
    ];
  }

  get pleasantnessLevelData(): number[] | undefined {
    const journalsToday = journalEntriesProvider.journalsToday?.current();
    const journalsTodayMinus1Day =
      journalEntriesProvider.journalsTodayMinus1Day?.current();
    const journalsTodayMinus2Days =
      journalEntriesProvider.journalsTodayMinus2Days?.current();
    const journalsTodayMinus3Days =
      journalEntriesProvider.journalsTodayMinus3Days?.current();
    const journalsTodayMinus4Days =
      journalEntriesProvider.journalsTodayMinus4Days?.current();
    const journalsTodayMinus5Days =
      journalEntriesProvider.journalsTodayMinus5Days?.current();
    const journalsTodayMinus6Days =
      journalEntriesProvider.journalsTodayMinus6Days?.current();

    if (
      !journalsToday ||
      !journalsTodayMinus1Day ||
      !journalsTodayMinus2Days ||
      !journalsTodayMinus3Days ||
      !journalsTodayMinus4Days ||
      !journalsTodayMinus5Days ||
      !journalsTodayMinus6Days
    )
      return;

    const averageLevelToday = journalsToday.length
      ? journalsToday.reduce(
          (t, journalEntry) =>
            t + getPleasantnessLevelFromMood(journalEntry.mood),
          0
        ) / journalsToday.length
      : 0;
    const averageLevelTodayMinus1Day = journalsTodayMinus1Day.length
      ? journalsTodayMinus1Day.reduce(
          (t, journalEntry) =>
            t + getPleasantnessLevelFromMood(journalEntry.mood),
          0
        ) / journalsTodayMinus1Day.length
      : 0;
    const averageLevelTodayMinus2Days = journalsTodayMinus2Days.length
      ? journalsTodayMinus2Days.reduce(
          (t, journalEntry) =>
            t + getPleasantnessLevelFromMood(journalEntry.mood),
          0
        ) / journalsTodayMinus2Days.length
      : 0;
    const averageLevelTodayMinus3Days = journalsTodayMinus3Days.length
      ? journalsTodayMinus3Days.reduce(
          (t, journalEntry) =>
            t + getPleasantnessLevelFromMood(journalEntry.mood),
          0
        ) / journalsTodayMinus3Days.length
      : 0;
    const averageLevelTodayMinus4Days = journalsTodayMinus4Days.length
      ? journalsTodayMinus4Days.reduce(
          (t, journalEntry) =>
            t + getPleasantnessLevelFromMood(journalEntry.mood),
          0
        ) / journalsTodayMinus4Days.length
      : 0;
    const averageLevelTodayMinus5Days = journalsTodayMinus5Days.length
      ? journalsTodayMinus5Days.reduce(
          (t, journalEntry) =>
            t + getPleasantnessLevelFromMood(journalEntry.mood),
          0
        ) / journalsTodayMinus5Days.length
      : 0;
    const averageLevelTodayMinus6Days = journalsTodayMinus6Days.length
      ? journalsTodayMinus6Days.reduce(
          (t, journalEntry) =>
            t + getPleasantnessLevelFromMood(journalEntry.mood),
          0
        ) / journalsTodayMinus6Days.length
      : 0;

    return [
      averageLevelTodayMinus6Days,
      averageLevelTodayMinus5Days,
      averageLevelTodayMinus4Days,
      averageLevelTodayMinus3Days,
      averageLevelTodayMinus2Days,
      averageLevelTodayMinus1Day,
      averageLevelToday,
    ];
  }

  constructor() {
    makeAutoObservable(this, {
      stats: computed,
      energyLevelData: computed,
      pleasantnessLevelData: computed,
    });
  }
}

export const statsProvider = new StatsProvider();
