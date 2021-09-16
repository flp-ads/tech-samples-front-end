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
import SearchAnalysis from "../pages/SearchAnalysis";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/about" component={AboutUs} />
      <Route exact path="/search" component={SearchAnalysis} />

      <Route exact path={"/admin"} component={AdminDashboard} />
      <Route path="/admin/users" component={AdminAllUsers} isPrivate />
      <Route path="/admin/user_register" component={AdminUserRegistration} isPrivate />
      <Route exact path="/admin/classes" component={NewClass} />
      <Route exact path={`/admin/classes/:id`} component={AdminEditParams} />

      <Route exact path="/analyst/sample_register" component={NewSamples} />
      <Route exact path={"/analyst"} component={AnalistDashboard} />
      <Route exact path="/analyst/pending" component={AnalysesPending} />
      <Route exact path="/analyst/pending/:id" component={AnalysisDetails} />
      <Route exact path="/analyst/concluded" component={AnalysesConcluded} />
    </Switch>
  );
};

export default Routes;
