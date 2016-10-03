import React from 'react';
import ReactDOM from 'react-dom';
import { ReactRouter, History } from 'react-router';
import { Router, Route } from 'react-router';
import { createHistory } from 'history';
import h from './helpers';

// Main app component
var App = React.createClass({

  render: function() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagLine="Fresh Seafood Market"></Header>
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
  mixins: [History],
  goToStore: function(event) {
    event.preventDefault();

    // Get the data from the input
    var storeId = this.refs.storeId.value;

    this.history.pushState(null, '/store/' + storeId);
  },

  render: function() {
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        <h2>Please Enter A Store</h2>
        <input type="text" ref="storeId" defaultValue={h.getFunName()} required />
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
