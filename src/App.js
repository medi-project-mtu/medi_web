import { Component } from "react";
import { Route } from "react-router";
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import Login from "./Components/Login";

class App extends Component {
  render(){
    return (
      <Router>
        <Switch>
            <main className="container-fluid p-0 flex-shrink-0">
                <Route exact path="/" component={Login}/>
            </main>
        </Switch>
      </Router>
      
    );
  }
  
}

export default App;
