import React from "react";
import { Router, Switch, Route } from "react-router-dom";

import {history} from './helpers.js';

import { DashboardView } from "./views/dashboard/DashboardView";
import { LoginView } from "./views/login/LoginView";
import { SecureRoute } from "./routes/SecureRoute";
import Sidebar from "./components/Sidebar";
import Deliveries from "./views/Deliveries";
import Boxes from "./views/Boxes";
import Users from "./views/Users";
import {Header} from "./layout/Header";
import {Footer} from "./layout/Footer";
import {Container, Row, Col} from "react-bootstrap";

function App() {

  return (
    <div className="App">
      <Router history={history}>
        <Switch>
          {/* Public Routes - accessible without credentials */}
          <Route exact path="/">
            <LoginView />
          </Route>

          <div>
            <Header/>

            {/* Secure Routes - accessible only for logged in user */}
              <Container fluid>
                <Row>
                  <Col xs={3} style={{paddingLeft: 0, marginRight: 0, paddingRight: 0}}>
                    <Sidebar/>
                  </Col>
                  <Col xs={9} style={{display: "flex", justifyContent: "center"}}>
                    <SecureRoute exact path="/dashboard" allowedRoles={["CUSTOMER", "DELIVERER", "DISPATCHER"]}>
                      <DashboardView />
                    </SecureRoute>

                    <SecureRoute exact path="/users" allowedRoles={["DISPATCHER"]}>
                      <Users/>
                    </SecureRoute>

                    <SecureRoute exact path="/deliveries" allowedRoles={["CUSTOMER", "DELIVERER", "DISPATCHER"]}>
                      <Deliveries/>
                    </SecureRoute>

                    <SecureRoute exact path="/boxes" allowedRoles={["DISPATCHER"]}>
                      <Boxes/>
                    </SecureRoute>
                  </Col>
                </Row>
              </Container>
            <Footer/>
          </div>

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
