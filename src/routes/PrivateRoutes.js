import { useContext } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import SLUGS from "../resources/slugs";
import { UserContext } from "../contexts/UserContext";

import SuperAdminDashboard from "../components/userDashboards/SuperAdminDashboard";
import TeacherDashboard from "../components/userDashboards/TeacherDashboard";
import StudentDashboard from "../components/userDashboards/StudentDashboard";

function PrivateRoutes() {
	const { role } = useContext(UserContext);

	// console.log(role);
	return (
		<Switch>
			<Route
				exact
				path={SLUGS.dashboard}
				component={
					role === "role.superAdmin"
						? SuperAdminDashboard
						: role === "role.teacher"
						? TeacherDashboard
						: role === "role.student"
						? StudentDashboard
						: null
				}
			/>

			<Redirect to={SLUGS.dashboard} />
		</Switch>
	);
}

export default PrivateRoutes;
