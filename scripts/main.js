import React from 'react';
import ReactDOM from 'react-dom';

var StorePicker = React.createClass({

  render: function() {
    return (
      <form className="store-selector">
        <h2>Please Enter A Store</h2>
        <input type="text" ref="storeId" />
        <input type="submit" />
      </form>
    )
  }

});

ReactDOM.render(<StorePicker/>, document.getElementById('main'));
