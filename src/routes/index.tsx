import { Switch } from "react-router-dom";

import Route from "./route";

import Home from "../pages/Home";
import AdminAllUsers from "../pages/AdminAllUsers";
import AboutUs from "../pages/AboutUs";
import AdminProductClass from "../pages/AdminProductClass";
import AdminEditParams from "../pages/AdminEditParams";
import AnalistDashboard from "../pages/AnalistDashboard";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/users" component={AdminAllUsers} isPrivate />
      <Route exact path="/aboutUs" component={AboutUs} />
      <Route exact path="/adminProductClass" component={AdminProductClass} />

      <Route exact path={`/classes/:id`} component={AdminEditParams} />
      <Route exact path={"/analistdashboard"} component={AnalistDashboard} />
    </Switch>
  );
};

export default Routes;
