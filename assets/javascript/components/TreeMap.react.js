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

  onClick(idx: string): void {
    window.open('http://imgur.com/'+idx,'_blank');
  },

  render(): Object {
    var rects = Tiling.getRectangles(
      1000,
      1000,
      this.props.nodes,
    );
    return (
      <div
        style={{
          width: 1000,
          height: 1000,
          position: 'relative',
        }}
      >
      {
        rects.map((rect, idx) =>
          <TreeTile
            key={"rect-id-" + idx}
            id={rect.idx}
            rect={rect}
            color={colors(rect.idx)}
            onClick={this.onClick}
            src={rect.aux && rect.aux.link}
          />
        )
      }
      </div>
    );
  },
});

module.exports = TreeMap;
