import { Switch } from "react-router-dom";

import Route from "./route";

import Home from "../pages/Home";
import AboutUs from "../pages/AboutUs";
import AdminProductClass from "../pages/AdminProductClass";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/aboutUs" component={AboutUs} />
      <Route exact path="/adminProductClass" component={AdminProductClass} />
      
    </Switch>
  );
};

export default Routes;
