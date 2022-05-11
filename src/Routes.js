import React from "react";

import { Route, Switch } from "react-router-dom";
import { appRoutes } from "./configs/app-routes/app-routes";
import { Admin } from "./pages/Admin/Admin";
import { Home } from "./pages/Home/Home";
import { Song } from "./pages/Song/Song";
import { AdminLogin } from "./pages/AdminLogin/AdminLogin";

export const Routes = () => {
  return (
    <Switch>
      <Route path={appRoutes.home.root} exact={true} component={Home} />
      <Route path={appRoutes.song.root} exact={true} component={Song} />
      <Route path={appRoutes.admin.root} exact={true} component={Admin} />
      <Route path={appRoutes.login.root} exact={true} component={AdminLogin} />
    </Switch>
  );
};
