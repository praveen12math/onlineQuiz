import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Home from "./Home"
import Test from "./Test";
import Result from './Result';
import { UserContext } from "./Context"
import "./App.css"


const App = () => {
  const [user, setUser] = useState({});
  return (
    <Router>
      <UserContext.Provider value={{ user, setUser }}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/test" component={Test} />
          <Route exact path="/result" component={Result} />
        </Switch>
      </UserContext.Provider>
    </Router>
  );
}

export default App;