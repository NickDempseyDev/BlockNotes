import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Routing
import PrivateRoute from "./routing/PrivateRoute";

// Screens
import PrivateScreen from "./screens/PrivateScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";
import ResetPasswordScreen from "./screens/ResetPasswordScreen";
import HomeScreen from "./screens/HomeScreen";

const App = () => {
  return (
    <Router>
      <div className="app">
        <Switch>
          <PrivateRoute exact path="/" component={HomeScreen} />
          <Route exact path="/login" component={LoginScreen} />
          <Route exact path="/register" component={RegisterScreen} />
          <Route
            exact
            path="/forgotpassword"
            component={ForgotPasswordScreen}
          />
          <Route
            exact
            path="/passwordreset/:resetToken"
            component={ResetPasswordScreen}
          />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
