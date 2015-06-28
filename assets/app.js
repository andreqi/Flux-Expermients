var ContestStore = require('./javascript/stores/TreeStore');
var TreeMapContainer = require('./javascript/components/TreeMapContainer.react');
var Dispatcher = require('./javascript/stores/Dispatcher');
var {TreeStoreAction} = require('./javascript/stores/AppAction');

var React = require('React');

var b = 0;
var a = x => b * x;

Dispatcher.registerSubscription(() => {
  console.dir(ContestStore.getState());
});

Dispatcher.handleAction({
  type: TreeStoreAction.NODES_CHANGED,
  payload: {
    values: [1, 2, 3, 4, 5, 7],
  },
});


Dispatcher.handleAction({
  type: TreeStoreAction.NODES_CHANGED,
  payload: {
    values: [1, 1, 1, 1,1 ,1, 1, 1, 1, 1, 1, 1, 1,1],
  },
});

console.log('fuck');

React.render(
  <TreeMapContainer />,
  content,
);
