import { Component } from "react";
import { Route } from "react-router";
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import Login from "./components/login/Login";

class App extends Component {
  render(){
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Login}></Route>
        </Switch>
      </Router>
      
    );
  }
  
}

export default App;
