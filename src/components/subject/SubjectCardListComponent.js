import React, { useState, useEffect, useContext } from "react";
import { createUseStyles, useTheme } from "react-jss";

import Axios from "axios";
import { UserContext } from "../../contexts/UserContext";

const useStyles = createUseStyles((theme) => ({
	container: {
		display: "flex",

		height: "auto",
	},

	subjectList: {
		justifyContent: "center",
		width: "96vw",
		height: "auto",
	},

	listMain: {
		height: "auto",

		width: "auto",

		display: "grid",
		justifyItems: "stretch",
		alignItems: "start",
		overflow: "scroll",
		overflowX: "hidden",

		gridTemplateRows: "repeat(auto, 50px)",
		gridTemplateColumns: "1fr 1fr 1fr",

		gridAutoFlow: "row",
	},
	subjectCardList: {
		margin: "0.5em",
	},
}));
const SubjectCardListComponent = ({ classroomID, reload }) => {
	const theme = useTheme();
	const classes = useStyles(theme);

	const { role, classroom } = useContext(UserContext);
	console.log(role, classroom, classroomID);

	const [subjectList, setSubjectList] = useState();
	let url;

	async function fetchSubjects() {
		role === "role.student"
			? (url = `http://localhost:4000/subjects/`)
			: role === "role.superAdmin"
			? (url = `http://localhost:4000/classrooms/${classroomID}`)
			: (url = null);

		try {
			let response = await Axios({
				method: "get",
				// url: url,
				url:
					role === "role.student" || role === "role.teacher"
						? (url = `http://localhost:4000/subjects/`)
						: role === "role.superAdmin"
						? (url = `http://localhost:4000/classrooms/${classroomID}`)
						: (url = null),

				headers: {
					"Content-Type": "application/json",
					Authorization: `${window.localStorage.getItem("token")}`,
				},
			});
			console.log(url);
			let responseData = await response.data;
			console.log(responseData);
			let subjectsList;

			role === "role.student"
				? (subjectsList = responseData.subjects)
				: role === "role.teacher"
				? (subjectsList = responseData.subjects)
				: role === "role.superAdmin"
				? (subjectsList = responseData.classroom.subjects)
				: (subjectList = responseData);

			// let subjectList = await response.data.classroom;

			setSubjectList(subjectsList);
			console.log(subjectsList);
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		fetchSubjects();
	}, [role, classroomID]);

	return (
		<div className={classes.container}>
			<div className={classes.subjectList}>
				<div className={classes.listMain}>
					{subjectList?.map((subject) => (
						<div className={classes.subjectCardList} key={subject._id}>
							{subject.name}
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default SubjectCardListComponent;
