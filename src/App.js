import { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Signingup from "./Components/Signingup";
import Dashboard from "./Components/Dashboard";

class App extends Component {
  render(){
    return (
      <Router>
        <Switch>
            <main className="container-fluid p-0 flex-shrink-0">
                <Route exact path="/" component={Signingup}/>
                <Route exact path="/register" component={Signingup}/>
                <Route exact path="/reset" component={Signingup}/>
                <Route exact path="/dashboard" component={Dashboard}/>
                <Route exact path="/profile" component={Dashboard}/>
            </main>
        </Switch>
      </Router>
    );
  }
  
}

export default App;
