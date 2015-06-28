/* @flow */

'use strict';

import type {Action} from './Action';

class Dispatcher {
  _subscriptions: Array<Function>;
  _stores: Array<any>;
  constructor() {
    this._subscriptions = [];
    this._stores = [];
  }

  informUpdate(): void {
    this._subscriptions.forEach(subscription => subscription());
  }

  registerSubscription(subscription: Function): void {
    this._subscriptions.push(subscription);
  }

  registerStore(store: Object): void {
    this._stores.push(store);
  }

  handleAction(action: Action): void {
    this._stores.forEach(store => store.handleAction(action));
  }
}

module.exports = new Dispatcher();
