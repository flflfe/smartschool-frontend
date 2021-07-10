import React from "react";
import { createUseStyles, useTheme } from "react-jss";

const useStyles = createUseStyles((theme) => ({
	modal: {
		position: "fixed",
		top: "0",
		left: "0",
		width: "100vw",
		height: "100vh",
		background: `${theme.color.colorOpacityBlack}`,
		zIndex: "100",
	},
	modalMmain: {
		position: "relative",
		background: `${theme.color.colorOpacityBlack2}`,
		border: `1px solid  ${theme.color.colorWhite}`,
		borderRadius: "2rem",
		width: "50%",
		height: "65%",
		top: "49%",
		left: "50%",
		transform: "translate(-50%,-50%)",
		paddingTop: "2rem",
		alignItems: "center",
		justifyContent: "center",
	},
	modalDisplayBlock: {
		display: "block",
	},
	modalDisplayNone: {
		display: "none",
	},
	closebtn: {
		position: "absolute",
		bottom: "-1.9em",
		right: "24%",

		width: "20em",
		border: "none",
		borderRadius: "0 0 2rem 2rem",

		background: `${theme.color.colorWhite}`,
		color: `${theme.color.colorRed}`,
		transition: "all ease 200ms",

		"&:hover": {
			background: `${theme.color.colorRed}`,
			color: `${theme.color.colorWhite}`,
		},
	},
}));

const Modal = ({ show, handleClose, children }) => {
	const theme = useTheme();
	const classes = useStyles(theme);
	const showHideClassName = show
		? "classes.modalDisplayBlock"
		: "classes.modalDisplayNone";

	return show ? (
		<div className={showHideClassName}>
			<div className={classes.modal}>
				<section className={classes.modalMmain}>
					{children}
					<button
						className={classes.closebtn}
						type="button"
						onClick={handleClose}>
						Close
					</button>
				</section>
			</div>
		</div>
	) : null;
};

export default Modal;
