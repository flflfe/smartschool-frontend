import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import SLUGS from "../resources/slugs";
import HomeComponent from "../components/HomeComponent";

function PublicRoutes() {
	return (
		<Switch>
			<Route path={SLUGS.home} component={HomeComponent} />

			<Redirect to={SLUGS.home} />
		</Switch>
	);
}

export default PublicRoutes;
