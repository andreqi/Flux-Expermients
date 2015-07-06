/* @flow */

var React = require('React');
var {HOSTNAME} = require('../config');

var {PropTypes} = React;

var TreeTile = React.createClass({
  propTypes: {
    rect: PropTypes.object.isRequired,
  },

  render(): Object {
    var tickHandler = () => this.props.onClick(this.props.rect.idx);
    var size = 2;
    var width = this.props.rect.width;
    if (width < 30) {
      size = 0;
    } else if (width < 60) {
      size = 1;
    }
    console.log(width, size);
    return (
      <span
        style= {{
          position: 'absolute',
          width: this.props.rect.width,
          height: this.props.rect.height,
          top: this.props.rect.y,
          left: this.props.rect.x,
          'background-color': this.props.color,
        }}
        onClick={tickHandler}
      >
        <img
          style={{
            overflow: 'hidden',
            width: this.props.rect.width,
            height: 'auto',
            display: 'block',
          }}
          src={`${HOSTNAME}/${this.props.rect.idx}/${size}`}
        />
      </span>
    );
  },
});

module.exports = TreeTile;
