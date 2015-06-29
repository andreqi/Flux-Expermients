/* @flow */

'use strict';

import type {Action} from './Action';
var Dispatcher = require('./Dispatcher');
var {TreeStoreAction} = require('./AppAction');

export type TreeNode = {
  label: string,
  weight: number,
  idx: string,
  aux?: Object,
};

class TreeState {
  _nodes: Array<TreeNode>;

  changeValues(newValues: Array<{weight: number, idx: string, aux: Object}>): void {
    this._nodes = newValues.map((val, index) => {
      return {
        label: 'Label ' + val.weight,
        weight: val.weight,
        idx: val.idx,
        aux: val.aux,
      };
    });
  }

  getNodes(): Array<TreeNode> {
    return this._nodes.slice();
  }

  increase(idx: string): void {
    this._nodes.forEach(node => {
      if (node.idx != idx) return;
      node.weight += 100;
      node.label = 'Label ' + node.weight;
    });
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
