import { Switch } from "react-router-dom";

import Route from "./route";

import Home from "../pages/Home";
import AdminAllUsers from "../pages/AdminAllUsers";
import AboutUs from "../pages/AboutUs";
import AdminEditParams from "../pages/AdminEditParams";
import AdminUserRegistration from "../pages/AdminUserRegistration";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/users" component={AdminAllUsers} isPrivate />
      <Route path="/register" component={AdminUserRegistration} isPrivate />
      <Route exact path="/aboutUs" component={AboutUs} />
      <Route exact path={`/classes/:id`} component={AdminEditParams} />
    </Switch>
  );
};

export default Routes;
