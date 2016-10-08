import React from 'react';

/*
 Header component
*/
var Header = React.createClass({
  render: function() {
    return (
      <header className="top">
        <h1>Catch
          <span className="ofThe">
            <span className="of">of</span>
            <span className="the">the</span>
          </span>
          Day
        </h1>
        <h3 className="tagLine"><span>{this.props.tagLine}</span></h3>
      </header>
    );
  },
  propTypes: {
    tagLine: React.PropTypes.string.isRequired
  }
});

export default Header;
