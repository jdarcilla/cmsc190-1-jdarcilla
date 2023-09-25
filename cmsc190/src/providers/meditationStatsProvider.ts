import { repo } from 'client';
import { MeditationStat } from 'core';
import { computed, makeAutoObservable } from 'mobx';
import { IResource } from 'mobx-utils';
import { dateTimeProvider } from './dateTimeProvider';
import { userProvider } from './userProvider';

class MeditationStatsProvider {
  get meditationStats(): IResource<MeditationStat[]> | undefined {
    if (!userProvider.user) return;
    const dateTime = dateTimeProvider.dateTime;

    return repo.meditationStats.bindCollectionQuery({
      key: { uid: userProvider.user.uid },
      where: ['createdIsoDateUtc', '>=', dateTime.toISODate() ?? ''],
      where2: ['createdIsoDateUtc','<=',(dateTime.plus({ day: 1 }).toISODate() ?? '')], // prettier-ignore
      orderByDirection: 'asc',
      orderByField: 'createdIsoDateUtc',
    });
  }

  constructor() {
    makeAutoObservable(this, {
      meditationStats: computed,
    });
  }
}

export const meditationStatsProvider = new MeditationStatsProvider();
