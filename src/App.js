import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

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
      <Router>
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
                    <SecureRoute exact path="/dashboard">
                      <DashboardView />
                    </SecureRoute>

                    <SecureRoute exact path="/users">
                      <Users/>
                    </SecureRoute>

                    <SecureRoute exact path="/deliveries">
                      <Deliveries/>
                    </SecureRoute>

                    <SecureRoute exact path="/boxes">
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
