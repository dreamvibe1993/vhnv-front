import React from "react";

import { Route, Switch } from "react-router-dom";
import { appRoutes } from "./configs/app-routes/app-routes";
import { Home } from "./pages/Home/Home";
import { Song } from "./pages/Song/Song";

export const Routes = () => {
  return (
    <Switch>
      <Route path={appRoutes.home.root} exact={true} component={Home} />
      <Route path={appRoutes.song.root} exact={true} component={Song} />
    </Switch>
  );
};
