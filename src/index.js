import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "react-jss";
import Routes from "./routes";
import Theme from "./resources/theme";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
	<ThemeProvider theme={Theme}>
		<Router>
			<Routes />
		</Router>
	</ThemeProvider>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
