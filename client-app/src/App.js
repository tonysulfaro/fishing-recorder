import React from "react";
import "./App.css";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Protected from "./Pages/Protected";
import LoginPage from "./Pages/LoginPage";
import NotFound from "./Pages/NotFound";

import { useAuth0 } from "@auth0/auth0-react";
import Report from "./Pages/Report";

function PrivateRoute({ children, ...rest }) {
  const { isAuthenticated } = useAuth0();

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

function App() {
  return (
    <Router>
      <Switch>
        <PrivateRoute exact path="/protected">
          <Protected></Protected>
        </PrivateRoute>
        <PrivateRoute exact path="/report">
          <Report></Report>
        </PrivateRoute>
        <Route exact path="/">
          <LoginPage></LoginPage>
        </Route>
        <Route>
          <NotFound></NotFound>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
