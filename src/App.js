import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import './App.css';
import { DashboardView } from "./views/dashboard/DashboardView";
import { LoginView } from "./views/login/LoginView";
import { SecureRoute } from "./routes/SecureRoute";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          {/* Public Routes - accessible without credentials */}
          <Route exact path="/">
            <LoginView />
          </Route>

          {/* Secure Routes - accessible only for logged in user */}
          <SecureRoute exact path="/dashboard">
            <DashboardView />
          </SecureRoute>

          {/* Any other route */}
          <Route path="*">
            <h1>404 Page not found</h1>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
