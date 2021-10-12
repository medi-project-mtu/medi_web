import { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
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
