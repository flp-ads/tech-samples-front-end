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
import Certificate from "../pages/Certificate";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/about" component={AboutUs} />
      <Route exact path="/search" component={SearchAnalysis} />
      <Route exact path="/certificate/:id" component={Certificate} />

      <Route exact path="/admin" component={AdminDashboard} isPrivate admin />
      <Route
        exact
        path="/admin/users"
        component={AdminAllUsers}
        isPrivate
        admin
      />
      <Route
        exact
        path="/admin/user_register"
        component={AdminUserRegistration}
        isPrivate
        admin
      />
      <Route exact path="/admin/classes" component={NewClass} isPrivate admin />
      <Route
        exact
        path="/admin/classes/:id"
        component={AdminEditParams}
        isPrivate
        admin
      />

      <Route
        exact
        path="/analyst/sample_register"
        component={NewSamples}
        isPrivate
      />
      <Route exact path="/analyst" component={AnalistDashboard} isPrivate />
      <Route
        exact
        path="/analyst/pending"
        component={AnalysesPending}
        isPrivate
      />
      <Route
        exact
        path="/analyst/pending/:id"
        component={AnalysisDetails}
        isPrivate
      />
      <Route
        exact
        path="/analyst/concluded"
        component={AnalysesConcluded}
        isPrivate
      />
    </Switch>
  );
};

export default Routes;
