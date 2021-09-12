import { Switch } from "react-router-dom";

import Route from "./route";

import Home from "../pages/Home";
import AboutUs from "../pages/AboutUs";
import AdminDashboard from "../pages/AdminDashboard";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/aboutUs" component={AboutUs} />
      <Route path="/admindashboard" component={AdminDashboard} />
    </Switch>
  );
};

export default Routes;
