/* @flow */

'use strict';

import type {Action} from './Action';
var Dispatcher = require('./Dispatcher');
var {TreeStoreAction} = require('./AppAction');

export type TreeNode = {
  label: string,
  weight: number,
  idx: number,
};

class TreeState {
  _nodes: Array<TreeNode>;

  changeValues(newValues: Array<number>): void {
    this._nodes = newValues.map((val, index) => {
      return {
        label: 'Label ' + val,
        weight: val,
        idx: index,
      };
    });
  }

  getNodes(): Array<TreeNode> {
    return this._nodes.slice();
  }

  increase(idx: number): void {
    this._nodes[idx].weight += 1;
    this._nodes[idx].label = 'Label ' + this._nodes[idx].weight;
  }
};

class TreeStoreClass {
  _state: TreeState;
  constructor() {
    Dispatcher.registerStore(this);
    this._state = new TreeState();
  }

  informUpdate(): void {
    Dispatcher.informUpdate();
  }

  getState(): Array<TreeNode> {
    return this._state.getNodes();
  }

  handleAction({type, payload}: Action): void {
    switch (type) {
      case TreeStoreAction.NODES_CHANGED:
        this._state.changeValues(payload.values);
        this.informUpdate();
        return;
      case TreeStoreAction.INCREASE_WEIGHT_OF_NODE:
        this._state.increase(payload.idx);
        this.informUpdate();
        return;
    }
  }
}

module.exports = new TreeStoreClass();
