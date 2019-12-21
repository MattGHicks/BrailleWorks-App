import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import CreateWorkOrder from "./components/create-workorder.component";
import EditWorkOrder from "./components/edit-workorder.component";
import WorkOrdersList from "./components/workorders-list.component";
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import logo from "./logo.svg";
import Grid from '@material-ui/core/Grid';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';





class App extends Component {
  render() {
  
    return (
      <Router>
        <AppBar style={{ marginBottom: 20 }} color="default" position="static">
          <Toolbar>
            <Grid item xs={2}>
              <a href="/">
                <img src={logo} width="160" height="60" alt="" />
              </a>
            </Grid>
            <Grid item xs={2}>
            <Button href="/" color="primary" size="small" variant="contained" >Home</Button>

            </Grid>
            <Grid item xs={2}>
              
            </Grid>
            <Grid item xs={2}>
              
            </Grid>
            <Grid item xs={2}>
            </Grid>             

            <Grid item xs={2}>
              <Button href="/create" color="primary" size="small" startIcon={<AddCircleOutlineIcon />} variant="contained">Add Work Order</Button>
            </Grid>
           </Toolbar>
        </AppBar>

        <Route path="/" exact component={WorkOrdersList} />
        <Route path="/edit/:id" component={EditWorkOrder} />
        <Route path="/create" component={CreateWorkOrder} />
      </Router>
    );
  }
}

export default App;