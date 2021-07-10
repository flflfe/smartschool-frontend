import React, { useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import Modal from "../components/Modal";
import UserProfile from "../components/UserProfile";
import CreateSubject from "../components/forms/CreateSubject";
import CreateClassroom from "./forms/CreateClassroom";
import CreateChapter from "./forms/CreateChapter";
import FileUpload from "./FileUpload";

import { createUseStyles, useTheme } from "react-jss";
const useStyles = createUseStyles((theme) => ({
	container: {
		height: "auto",
		width: "100%",
	},
	mainbox: {
		display: "flex",
		flexDirection: "column",
	},
	header: {
		display: "flex",
		padding: "5em 0 1em 0",
	},
	headerText: {
		flex: 1,
		marginLeft: "1em",
		fontSize: "1.5em",
	},

	showUserProfile: {
		border: "none",
		outline: "none",
		cursor: "pointer",
		background: "none",
		color: "#11AC2B",
		marginRight: "2em",
	},
}));

const Navbar = ({ title, subjectID, classroomID, chapterId, recordingId }) => {
	console.log(title, subjectID, classroomID, chapterId, recordingId);
	const theme = useTheme();
	// console.log(title, subjectID, classroomID);
	const classes = useStyles(theme);

	const userData = useContext(UserContext);
	const { _id, Name, Email, DOB, classroom, createdAt, updatedAt, role } =
		userData;

	const [show, setShow] = useState({
		showModal: false,
	});

	const showModal = () => {
		setShow({
			showModal: true,
		});
	};

	const hideModal = () => {
		setShow({
			showModal: false,
		});
		// console.log("hideModal Clicked");
	};

	const [showCreateModal, setShowCreateModal] = useState({
		showCreateModal: false,
	});

	const showCreateThisModal = () => {
		setShowCreateModal({
			showCreateModal: true,
		});
	};

	const hideCreateThisModal = () => {
		setShowCreateModal({
			showCreateModal: false,
		});
		// console.log("hideModal Clicked");
	};

	return (
		<div className={classes.container}>
			<div className={classes.mainbox}>
				<div className={classes.header}>
					<h1 className={classes.headerText}>{title}</h1>

					{role === "role.student" ||
					(role === "role.teacher" && title === "Subjects") ? null : (
						<input
							type="button"
							name="submit"
							className={classes.showUserProfile}
							defaultValue="Create One"
							onClick={showCreateThisModal}
						/>
					)}

					<input
						type="button"
						name="submit"
						className={classes.showUserProfile}
						defaultValue="Show Profile"
						onClick={showModal}
					/>
				</div>
			</div>
			<Modal
				className={classes.modalview}
				show={showCreateModal.showCreateModal}
				handleClose={hideCreateThisModal}>
				{role === "role.superAdmin" && title === "Subjects" ? (
					<CreateSubject classroomID={classroomID} />
				) : role === "role.superAdmin" && title === "Classrooms" ? (
					<CreateClassroom />
				) : (role === "role.superAdmin" || role === "role.teacher") &&
				  title === "Chapters" ? (
					<CreateChapter subjectID={subjectID} />
				) : (role === "role.superAdmin" || role === "role.teacher") &&
				  title === "Recordings" ? (
					<FileUpload
						subjectID={subjectID}
						chapterId={chapterId}
						recordingId={recordingId}
					/>
				) : null}
			</Modal>
			<Modal
				className={classes.modalview}
				show={show.showModal}
				handleClose={hideModal}>
				<UserProfile
					id={_id}
					name={Name}
					email={Email}
					DOB={DOB}
					classroom={classroom}
					createdAt={createdAt}
					updatedAt={updatedAt}
					role={role}
				/>
			</Modal>
		</div>
	);
};

export default Navbar;
