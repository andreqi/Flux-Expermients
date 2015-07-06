var ContestStore = require('./javascript/stores/TreeStore');
var TreeMapContainer = require('./javascript/components/TreeMapContainer.react');
var Dispatcher = require('./javascript/stores/Dispatcher');
var {TreeStoreAction} = require('./javascript/stores/AppAction');

var InterwebsBuilder = require('./javascript/data-dispatchers/Interwebs');
var URI = require('./javascript/data-dispatchers/URI');
var {HOSTNAME} = require('./config');

var interweb = new InterwebsBuilder();
interweb
  .get(new URI(HOSTNAME))
  .then(
    txt => {
      Dispatcher.handleAction({
        type: TreeStoreAction.NODES_CHANGED,
        payload: {
          values: txt
            .data
            .filter(d => !!!d.images_count)
            .map(d => {
              return {
                weight: d.score,
                idx: d.imgurID,
                aux: d,
              };
            }),
        },
      });
      console.log(txt)
    },
    err => console.log(err),
    prg => console.log("progress " + prg),
  )
  .done();

var React = require('React');

var x = [];
for (var idx = 0; idx < 100; idx++) {
  x.push({
    weight: 10,
    idx: 'hei-' + idx,
  });
}

Dispatcher.handleAction({
  type: TreeStoreAction.NODES_CHANGED,
  payload: {
    values: x,
  },
});

React.render(
  <TreeMapContainer />,
  content,
);
