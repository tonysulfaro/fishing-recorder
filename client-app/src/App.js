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

import { useAuth0 } from "@auth0/auth0-react";

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
        <PrivateRoute path="/protected">
          <Protected></Protected>
        </PrivateRoute>
        <Route path="/">
          <LoginPage></LoginPage>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
