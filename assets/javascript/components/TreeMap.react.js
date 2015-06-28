/* @flow */

var React = require('React');
var Dispatcher = require('../stores/Dispatcher');
var {TreeStoreAction} = require('../stores/AppAction');
var Tiling = require('../utils/Tiling');
var TreeTile = require('./TreeTile.react');
var d3 = require('d3');

var colors = d3.scale.category20();

var {PropTypes} = React;

var TreeMap = React.createClass({
  propTypes: {
    nodes: PropTypes.array.isRequired,
  },

  onClick(idx: number): void {
    console.log(idx);
    Dispatcher.handleAction({
      type: TreeStoreAction.INCREASE_WEIGHT_OF_NODE,
      payload: {
        idx,
      }
    });
  },

  render(): Object {
    var rects = Tiling.getRectangles(
      500,
      500,
      this.props.nodes
    );
    return (
      <svg width="500" height="500" viewBox="0 0 500 500">
      {
        rects.map((rect, idx) =>
          <TreeTile
            key={"rect-id-" + idx}
            id={rect.idx}
            rect={rect}
            color={colors(rect.idx)}
            onClick={this.onClick}
          />
        )
      }
      </svg>
    );
  },
});

module.exports = TreeMap;
