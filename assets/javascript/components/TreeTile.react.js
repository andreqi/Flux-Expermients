/* @flow */

var React = require('React');

var {PropTypes} = React;

var TreeTile = React.createClass({
  propTypes: {
    rect: PropTypes.object.isRequired,
  },

  render(): Object {
    return (
      <rect
        width={String(this.props.rect.width)}
        height={String(this.props.rect.height)}
        x={String(this.props.rect.x)}
        y={String(this.props.rect.y)}
        fill={this.props.color}
        onClick={() => this.props.onClick(this.props.rect.idx)}
      />
    );
  },
});

module.exports = TreeTile;
