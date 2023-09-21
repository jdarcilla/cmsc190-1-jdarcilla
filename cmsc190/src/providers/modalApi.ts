import { idFactory } from 'core';
import { action, makeAutoObservable, observable, toJS } from 'mobx';

export type ModalInfo = {
  id: string;
  component: React.ReactNode;
  dismiss: Function;
};

class ModalApi {
  modals: ModalInfo[] = [];

  constructor() {
    makeAutoObservable(this, {
      modals: observable,
      show: action,
    });
  }

  hide = (id: string) => {
    this.modals = this.modals.filter(modal => modal.id !== id);
  };

  show = (fn: (dismiss: Function) => JSX.Element) => {
    const id = idFactory.id();
    const dismiss = () => this.hide(id);
    this.modals = [
      ...toJS(this.modals),
      { id, component: fn(dismiss), dismiss },
    ];
  };
}

export const modalApi = new ModalApi();
