import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router';
import { createHistory } from 'history';

// Main app component
var App = React.createClass({

  render: function() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header></Header>
        </div>
        <Order></Order>
        <Inventory></Inventory>
      </div>
    )
  }

});

// Header component
var Header = React.createClass({

  render: function() {
    return (
      <p>Header</p>
    )
  }

});

var Order = React.createClass({

  render: function() {
    return (
      <p>Order</p>
    )
  }

});

var Inventory = React.createClass({

  render: function() {
    return (
      <p>Inventory</p>
    )
  }

});

// Form to create a store with a given name
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

// Not found component
var NotFound = React.createClass({

  render: function() {
    return (
      <h1>Not Found!</h1>
    )
  }

});

/*
  Routes
*/

var routes = (
  <Router history={createHistory()}>
    <Route path="/" component={StorePicker} />
    <Route path="/store/:storeId" component={App} />
    <Route path="*" component={NotFound } />
  </Router>
)

ReactDOM.render(routes, document.getElementById('main'));
