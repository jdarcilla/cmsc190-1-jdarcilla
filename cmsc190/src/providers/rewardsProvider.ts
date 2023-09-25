import { repo } from 'client';
import { Reward } from 'core';
import { computed, makeAutoObservable } from 'mobx';
import { IResource } from 'mobx-utils';
import { dateTimeProvider } from './dateTimeProvider';
import { userProvider } from './userProvider';

class RewardsProvider {
  get rewards(): IResource<Reward[]> | undefined {
    if (!userProvider.user) return;
    const dateTime = dateTimeProvider.dateTime;

    return repo.rewards.bindCollectionQuery({
      key: { uid: userProvider.user.uid },
      where: ['createdIsoDateUtc', '>=', dateTime.toISODate() ?? ''],
      where2: ['createdIsoDateUtc','<=',dateTime.plus({ day: 1 }).toISODate() ?? ''], // prettier-ignore
      orderByDirection: 'asc',
      orderByField: 'createdIsoDateUtc',
    });
  }

  constructor() {
    makeAutoObservable(this, {
      rewards: computed,
    });
  }
}

export const rewardsProvider = new RewardsProvider();
