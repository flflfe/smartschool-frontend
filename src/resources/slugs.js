/* eslint-disable import/no-anonymous-default-export */
export default {
	home: "/home",
	// private
	dashboard: "/dashboard",
	classroom: `/classrooms/:classid`,
	subjectdashboard: `/classrooms/:classid/:subjectid`,
	chapterlist: `/classrooms/:classid/:subjectid/chapters`,

	error: "/error",
	register: "/register",

	// auth
	login: "/login",
};
