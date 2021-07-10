import React, { useState, useEffect } from "react";

import { useLocation } from "react-router-dom";
import Axios from "axios";

import useWindowSize from "../hooks/useWindowSize";
import PrivateSection from "./PrivateSection";
import PublicRoutes from "./PublicRoutes";
import LoadingComponent from "../components/LoadingComponent";
import { UserContextProvider } from "../contexts/UserContext";
function Routes() {
	const { pathname } = useLocation();

	// eslint-disable-next-line no-unused-vars
	const [width, height] = useWindowSize();
	const [isVerified, setIsVerified] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		window.scrollTo(0, 0);
		Axios({
			method: "get",
			url: "http://localhost:4000/verify-token",

			headers: {
				"Content-Type": "application/json",
				Authorization: window.localStorage.getItem("token"),
			},
		}).then((res) => {
			setIsVerified(res.data?.Auth);
			setIsLoading(false);
			// console.log(isVerified);
		});
	}, [pathname, isVerified]);

	return isLoading ? (
		<LoadingComponent />
	) : isVerified ? (
		<UserContextProvider>
			<PrivateSection />
		</UserContextProvider>
	) : (
		<PublicRoutes />
	);
}

export default Routes;
