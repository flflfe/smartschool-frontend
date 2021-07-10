import React, { createContext, useState, useEffect } from "react";
import Axios from "axios";

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
	const [userData, setUserData] = useState([]);
	useEffect(() => {
		Axios({
			method: "get",
			url: "http://localhost:4000/user/me",
			headers: {
				"Content-Type": "application/json",
				Authorization: `${window.localStorage.getItem("token")}`,
			},
		}).then(
			(res) => {
				// console.log(res.data);
				setUserData(res.data);
			},

			(err) => {
				console.log(err);
			}
		);
	}, []);

	return (
		<UserContext.Provider value={userData}>{children}</UserContext.Provider>
	);
};

export { UserContextProvider, UserContext };
