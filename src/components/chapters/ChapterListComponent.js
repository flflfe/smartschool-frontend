import React, { useState, useEffect } from "react";
import { createUseStyles, useTheme } from "react-jss";
import Axios from "axios";
import ChapterCard from "./ChapterCard";

import LoadingComponent from "../LoadingComponent";

const useStyles = createUseStyles((theme) => ({
	container: {
		display: "flex",
		paddingLeft: "2em",
		height: "auto",
	},

	chapterlist: {
		justifyContent: "center",
		width: "96vw",
		height: "auto",
	},
	header: {
		display: "flex",
		padding: "5em 0px 1em 0",
	},
	headerText: {
		flex: 1,

		fontSize: "1.5em",
		fontWeight: "400",
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
	classroomCardList: {
		margin: "0.5em",
	},
}));

const ChapterListComponent = ({ match }) => {
	const theme = useTheme();
	const classes = useStyles(theme);
	const subjectID = match.params.subjectid;

	const [isLoading, setIsLoading] = useState(true);

	const [chapterList, setchapterList] = useState([]);

	async function fetchClassrooms() {
		try {
			let response = await Axios({
				method: "get",

				url: `http://localhost:4000/subjects/${subjectID}/chapters`,
				headers: {
					"Content-Type": "application/json",
					Authorization: `${window.localStorage.getItem("token")}`,
				},
			});
			let chapters = await response.data.chapters;
			setchapterList(chapters);

			setIsLoading(false);
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		fetchClassrooms();
	}, []);

	return (
		<div className={classes.container}>
			<div className={classes.chapterlist}>
				{isLoading ? (
					<LoadingComponent />
				) : (
					<div className={classes.listMain}>
						{chapterList.map((chapter) => (
							<div className={classes.classroomCardList}>
								<ChapterCard name={chapter.name} />
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default ChapterListComponent;
