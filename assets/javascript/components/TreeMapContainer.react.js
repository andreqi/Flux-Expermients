/* @flow */

'use strict';

var Dispatcher = require('../stores/Dispatcher');
var TreeStore = require('../stores/TreeStore');
var TreeMap = require('./TreeMap.react');
var React = require('React');

var TreeMapContainer = React.createClass({
  componentDidMount(): void {
    Dispatcher.registerSubscription(() => {
      this.setState(this.calculateState());
    });
  },

  calculateState(): Object {
    return {
      nodes: TreeStore.getState(),
    };
  },

  getInitialState(): Object {
    return this.calculateState();
  },

  render(): Object {
    return (
      <div>
        <div>
          Hai!
          {' '}
          {this.state.nodes.map(node => node.label).join(' ,')}
        </div>
        <TreeMap nodes={this.state.nodes} />
      </div>
    );
  },
});

module.exports = TreeMapContainer;
