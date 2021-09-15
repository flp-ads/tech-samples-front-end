import { Switch } from "react-router-dom";

import Route from "./route";

import Home from "../pages/Home";
import AdminAllUsers from "../pages/AdminAllUsers";
import AboutUs from "../pages/AboutUs";
import AdminEditParams from "../pages/AdminEditParams";
import NewSamples from "../pages/AnalistNewSamples";
import NewClass from "../pages/AdminNewClass";
import AdminUserRegistration from "../pages/AdminUserRegistration";
import AnalistDashboard from "../pages/AnalistDashboard";
import AdminDashboard from "../pages/AdminDashboard";
import AnalysesPending from "../pages/AnalysesPending";
import AnalysisDetails from "../pages/AnalysisDetails";
import AnalysesConcluded from "../pages/AnalysesConcluded";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/users" component={AdminAllUsers} isPrivate />
      <Route path="/register" component={AdminUserRegistration} isPrivate />
      <Route exact path="/aboutUs" component={AboutUs} />
      <Route exact path="/classes" component={NewClass} />
      <Route exact path="/analyses" component={NewSamples} />

      <Route exact path={"/admindashboard"} component={AdminDashboard} />
      <Route exact path={`/classes/:id`} component={AdminEditParams} />
      <Route exact path={"/analistdashboard"} component={AnalistDashboard} />
      <Route exact path="/analysespending" component={AnalysesPending} />
      <Route exact path="/analysespending/:id" component={AnalysisDetails} />
      <Route exact path="/analysesconcluded" component={AnalysesConcluded} />
    </Switch>
  );
};

export default Routes;
