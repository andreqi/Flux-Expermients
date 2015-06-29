/* @flow */

var React = require('React');

var {PropTypes} = React;

var TreeTile = React.createClass({
  propTypes: {
    rect: PropTypes.object.isRequired,
  },

  render(): Object {
    var tickHandler = () => this.props.onClick(this.props.rect.idx);
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
        <img style={{
          overflow: 'hidden',
          width: this.props.rect.width,
          height: 'auto',
          display: 'block',
        }} src={this.props.rect.aux &&
          this.props.rect.aux.link} />
      </span>
    );
  },
});

module.exports = TreeTile;
