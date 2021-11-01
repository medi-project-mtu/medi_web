import { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Signingup from "./Components/Signingup";
import Dashboard from "./Components/Dashboard";
import NotFound from "./Components/ErrorPages/NotFound";

class App extends Component {
  render() {
    return (
      <main className="container-fluid p-0 flex-shrink-0">
        <Router>
          <Switch>
            <Route exact path="/" component={Signingup} />
            <Route exact path="/register" component={Signingup} />
            <Route exact path="/reset" component={Signingup} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/profile" component={Dashboard} />
            <Route exact path="/profile/:patientId" component={Dashboard} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </main>
    );
  }
}

export default App;
