import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import CreateWorkOrder from "./components/create-workorder.component";
import EditWorkOrder from "./components/edit-workorder.component";
import WorkOrdersList from "./components/workorders-list.component";

import logo from "./logo.svg";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          
          <nav className="navbar navbar-expand-lg navbar-light">
            <a className="navbar-brand" href="/">
              <img src={logo} width="160" height="60" alt="" />
            </a>
            
            <div className="collpase nav-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">Active Work Orders</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/create" className="nav-link">Enter NEW Work Order</Link>
                </li>
              </ul>
            </div>
          </nav>

          <Route path="/" exact component={WorkOrdersList} />
          <Route path="/edit/:id" component={EditWorkOrder} />
          <Route path="/create" component={CreateWorkOrder} />
        </div>
      </Router>
    );
  }
}

export default App;