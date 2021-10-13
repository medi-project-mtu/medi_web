import { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./Components/Login";
import Register from "./Components/Register";
import ResetPassword from "./Components/ResetPassword";
import Dashboard from "./Components/Dashboard";

class App extends Component {
  render(){
    return (
      <Router>
        <Switch>
            <main className="container-fluid p-0 flex-shrink-0">
                <Route exact path="/" component={Login}/>
                <Route exact path="/register" component={Register}/>
                <Route exact path="/reset" component={ResetPassword}/>
                <Route exact path="/dashboard" component={Dashboard}/>
            </main>
        </Switch>
      </Router>
      
    );
  }
  
}

export default App;
