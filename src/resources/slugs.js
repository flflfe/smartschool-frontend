/* eslint-disable import/no-anonymous-default-export */
export default {
	home: "/home",
	// private
	dashboard: "/dashboard",
	classrooms: "/classrooms",
	classroom: `/classrooms/:classid`,
	subjectdashboard: `/classrooms/:classid/:subjectid`,
	chapterlist: `/classrooms/:classid/:subjectid/chapters`,
	chapterdashboard: `/classrooms/:classid/:subjectid/chapters/:chapterid`,
	recordingdashboard: `/classrooms/:classid/:subjectid/chapters/:chapterid/:recordingid`,

	error: "/error",
	register: "/register",

	// auth
	login: "/login",
};
