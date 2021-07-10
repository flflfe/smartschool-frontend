import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player/lazy";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import PauseCircleFilledIcon from "@material-ui/icons/PauseCircleFilled";
import Replay10Icon from "@material-ui/icons/Replay10";
import Forward10Icon from "@material-ui/icons/Forward10";
import Slider from "@material-ui/core/Slider";

import { createUseStyles, useTheme } from "react-jss";
const useStyles = createUseStyles((theme) => ({
	videoWrapper: {
		height: "100%",
		width: "100%",
		justifyContent: "center",
		overflow: "hidden",
		padding: "0.3em",
	},

	controls: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-between",
		alignItems: "center",
		borderRadius: "1rem",

		backgroundColor: `${theme.color.colorOpacityBlack2}`,

		overflowX: "hidden",

		width: "100%",
		height: "100%",
		position: "absolute",
		top: "0",
		bottom: "0",
		left: "0",
		right: "0",
	},

	topcontrols: {
		width: "100%",
		paddingTop: "0.5em",

		paddingLeft: "1em",
	},
	centercontrols: {
		width: "100%",
		height: "2em",
		textAlign: "center",
	},
	playbtn: {
		marginLeft: "2em",
		marginRight: "2em",
	},
	bottomcontrols: {
		border: `1px solid  ${theme.color.colorWhite}`,
		width: "100%",
	},
	videoDurationSlider: {},
	seekcontrol: {
		paddingLeft: "1em",
		paddingRight: "1em",
	},
}));
const VideoPlayer = ({
	title,
	recordingUrl,
	transcriptionSeek,
	setBufferDone,
}) => {
	console.log(recordingUrl);

	// const classid = match.params.classid;
	const theme = useTheme();
	const classes = useStyles(theme);
	const [isLoading, setIsLoading] = useState(true);

	const [showControl, setShowControl] = useState(false);
	const playerRef = useRef(null);
	const [playing, setPlaying] = useState(true);
	const [volume, setVolume] = useState(0.8);
	const [muted, setMuted] = useState(false);
	const [played, setPlayed] = useState(0);
	const [duration, setDuration] = useState(0);

	useEffect(() => {
		const transcriptionSeekinSeconds = transcriptionSeek / 1000;
		console.log(transcriptionSeekinSeconds);
		console.log(playerRef.current.getCurrentTime());
		setPlayed(transcriptionSeekinSeconds);
		// console.log(
		// 	playerRef.current.seekTo(transcriptionSeekinSeconds - 1, "seconds")
		// );

		playerRef.current.seekTo(transcriptionSeekinSeconds, "seconds");
	}, [transcriptionSeek]);

	const showControls = () => {
		setShowControl(true);
	};
	const hideControls = () => {
		setShowControl(false);
	};

	const handleRewind = () => {
		console.log(playerRef.current.getCurrentTime());
		playerRef.current.seekTo(
			playerRef.current.getCurrentTime() - 10,
			"seconds"
		);
		console.log(playerRef.current.getCurrentTime());
	};

	const handleFastForward = () => {
		console.log(playerRef.current.getCurrentTime());
		playerRef.current.seekTo(
			playerRef.current.getCurrentTime() + 10,
			"seconds"
		);
	};

	const handlePlayVideo = () => {
		console.log("Player  NOT Playing");
		setPlaying(false);
	};
	const handlePauseVideo = () => {
		setPlaying(true);
		console.log("Player  Playing");
	};

	return (
		<div
			className={classes.videoWrapper}
			onMouseEnter={showControls}
			onMouseLeave={hideControls}>
			<ReactPlayer
				ref={playerRef}
				className="reactplayer"
				width="100%"
				height="100%"
				controls={false}
				url={recordingUrl}
				playing={playing}
				volume={volume}
				muted={muted}
				played={played}
				onReady={() => setIsLoading(false)}
				onBufferEnd={() => setBufferDone(true)}
			/>

			{showControl ? (
				<div className={classes.controls}>
					{console.log(played)}
					<div className={classes.topcontrols}>
						<div>{title}</div>
					</div>
					<div className={classes.centercontrols}>
						<Replay10Icon fontSize="large" onClick={handleRewind} />

						{playing ? (
							<PauseCircleFilledIcon
								className={classes.playbtn}
								fontSize="large"
								onClick={handlePlayVideo}
							/>
						) : (
							<PlayCircleFilledIcon
								className={classes.playbtn}
								fontSize="large"
								onClick={handlePauseVideo}
							/>
						)}

						<Forward10Icon fontSize="large" onClick={handleFastForward} />
					</div>
					<div className={classes.bottomcontrols}>
						<div className={classes.bottomControlcolumn}>
							<div className={classes.seekcontrol}></div>
						</div>
					</div>
				</div>
			) : // <div> Loading.. Please Wait</div>
			null}
		</div>
	);
};

export default VideoPlayer;
