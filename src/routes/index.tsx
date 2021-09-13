import { Switch } from "react-router-dom";

import Route from "./route";

import Home from "../pages/Home";
import AboutUs from "../pages/AboutUs";
import AdminEditParams from "../pages/AdminEditParams";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/aboutUs" component={AboutUs} />
      <Route exact path={`/classes/:id`} component={AdminEditParams} />
    </Switch>
  );
};

export default Routes;
