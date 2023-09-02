import { DateTime } from 'luxon';
import { action, makeAutoObservable, observable } from 'mobx';

class DateTimeProvider {
  dateTime: DateTime = DateTime.now();

  constructor() {
    makeAutoObservable(this, {
      dateTime: observable,
      setDateTime: action,
    });
  }

  setDateTime(dateTime: DateTime) {
    this.dateTime = dateTime;
  }
}

export const dateTimeProvider = new DateTimeProvider();
