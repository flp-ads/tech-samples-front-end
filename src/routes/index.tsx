import { Switch } from "react-router-dom";

import Route from "./route";

import Home from "../pages/Home";
import AboutUs from "../pages/AboutUs";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/aboutUs" component={AboutUs} />
    </Switch>
  );
};

export default Routes;
