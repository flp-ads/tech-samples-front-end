import { Switch } from "react-router-dom";

import Route from "./route";

import Home from "../pages/Home";
import AdminAllUsers from "../pages/AdminAllUsers";
import AboutUs from "../pages/AboutUs";
import AdminDashboard from "../pages/AdminDashboard";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/users" component={AdminAllUsers} isPrivate />
      <Route exact path="/aboutUs" component={AboutUs} />
      <Route path="/admindashboard" component={AdminDashboard} />
    </Switch>
  );
};

export default Routes;
