import React from 'react';
import ReactDOM from 'react-dom';
import { ReactRouter, History } from 'react-router';
import { Router, Route } from 'react-router';
import { createHistory } from 'history';
import h from './helpers';


// Main app component
var App = React.createClass({
  getInitialState: function() {
    return {
      fishes: {},
      order: {}
    }
  },

  addFish: function(fish) {
    var timestamp = (new Date()).getTime();
    this.state.fishes['fish-' + timestamp] = fish;
    this.setState({fishes: this.state.fishes});
  },

  loadSamples: function() {
    this.setState({
      fishes: require('./sample-foods')
    });
  },

  renderFish: function(key) {
    return <Fish key={key} index={key} details={this.state.fishes[key]}></Fish>
  },

  render: function() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagLine="Fresh Seafood Market"></Header>
          <ul className="list-of-fishes">
            {Object.keys(this.state.fishes).map(this.renderFish)}
          </ul>
        </div>
        <Order fishes={this.state.fishes} order={this.state.order}></Order>
        <Inventory addFish={this.addFish} loadSamples={this.loadSamples}></Inventory>
      </div>
    )
  }

});

// Fish component
var Fish = React.createClass({

  render: function() {
    var details = this.props.details;
    return (
      <li className="menu-fish">
        <img src={details.image} alt="" />
        <h3 className="fish-name">
          {details.name}
          <span className="price">{h.formatPrice(details.price)}</span>
        </h3>
        <p>{details.desc}</p>
      </li>
    )
  }
})

// Add fish form
var AddFishForm = React.createClass({
  createFish: function(event) {
    event.preventDefault();

    var fish = {
      name: this.refs.name.value,
      price: this.refs.price.value,
      status: this.refs.status.value,
      desc: this.refs.desc.value,
      image: this.refs.image.value
    };

    this.props.addFish(fish);
    this.refs.fishForm.reset();
  },

  render: function() {
    return (
      <form className="fish-edit" ref="fishForm" onSubmit={this.createFish}>
        <input type="text" ref="name" placeholder="Fish Name" />
        <input type="text" ref="price" placeholder="Fish Price" />
        <select ref="status">
          <option value="available">Available</option>
          <option value="unavailable">Sold out</option>
        </select>
        <textarea type="text" ref="desc" placeholder="Description"></textarea>
        <input type="text" ref="image" placeholder="URL to Image" />
        <button type="submit">+ Add Item</button>
      </form>
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
      <div>
        <h2>Inventory</h2>

        <AddFishForm {...this.props} ></AddFishForm>
        <button onClick={this.props.loadSamples}>Load Sample Fishes</button>
      </div>
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
