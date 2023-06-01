import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Leftsidebar from "./components/sidebar/Leftsidebar";
import Header from './components/sidebar/Header';
import Home from './components/dashboard/Home';
import Orders from './components/Orders';
import ShippingQueue from './components/shipping/ShippingQueue';
import Inventory from "./components/Inventory";
import Messages from './components/Messages';
import Reports from './components/Reports';
import Settings from './components/Settings';
import Help from './components/Help';
import $ from "jquery";
import OnGoingOrders from "./components/shipping/OnGoingOrders";
class App extends Component {
  constructor() {
    super();
    this.state = {
      headerTitle: "",
    };
  }

  componentDidMount() {
    $(window).scroll(function () {
      if (
        document.body.scrollTop > 50 ||
        document.documentElement.scrollTop > 50
      ) {
        $(".header").css("box-shadow", "rgb(212 212 212) 7px 3px 23px 3px")
      } else {
        $(".header").css("box-shadow", "none");
      }
    });

  }

  handleUserLogin = (credentials) => {
    this.setState({ isLoggedIn: parseInt(credentials) });
  };

  handleCallback = (childData) => {
    this.setState({ headerTitle: childData })
  }


  render() {
    const { headerTitle } = this.state;
    return (
      <Router>
        <Leftsidebar data={headerTitle} />
        <Header data={headerTitle} />
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route exact path="/home" element={<Home parentCallback={this.handleCallback} />} />
          <Route exact path="/orders" element={<Orders parentCallback={this.handleCallback} />} />
          <Route exact path="/shipping" element={<ShippingQueue parentCallback={this.handleCallback} />} />
          <Route exact path="/inventory" element={<Inventory parentCallback={this.handleCallback} />} />
          <Route exact path="/messages" element={<Messages parentCallback={this.handleCallback} />} />
          <Route exact path="/report" element={<Reports parentCallback={this.handleCallback} />} />
          <Route exact path="/setting" element={<Settings parentCallback={this.handleCallback} />} />
          <Route exact path="/help" element={<Help parentCallback={this.handleCallback} />} />

          <Route exact path="/ongoingorders" element={<OnGoingOrders parentCallback={this.handleCallback} />} />
        </Routes>
      </Router>
    );
  }
}

export default App;
