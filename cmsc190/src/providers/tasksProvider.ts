import { repo } from 'client';
import { Task } from 'core';
import { computed, makeAutoObservable } from 'mobx';
import { IResource } from 'mobx-utils';
import { dateTimeProvider } from './dateTimeProvider';
import { userProvider } from './userProvider';

class TasksProvider {
  get tasks(): IResource<Task[]> | undefined {
    if (!userProvider.user) return;
    const dateTime = dateTimeProvider.dateTime;

    return repo.tasks.bindCollectionQuery({
      key: { uid: userProvider.user.uid },
      where: ['createdIsoDateUtc', '>=', dateTime.toISODate() ?? ''],
      where2: ['createdIsoDateUtc','<=',dateTime.plus({ day: 1 }).toISODate() ?? ''], // prettier-ignore
      orderByDirection: 'asc',
      orderByField: 'createdIsoDateUtc',
    });
  }

  constructor() {
    makeAutoObservable(this, {
      tasks: computed,
    });
  }
}

export const tasksProvider = new TasksProvider();
