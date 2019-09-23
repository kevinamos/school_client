import StudentTypeCategories from "../../system_modules/student_admin/StudentTypeCategories.jsx";
import StudentTypesConfig from "../../system_modules/student_admin/StudentTypesConfig.jsx";
import StudentRegistration from "../../system_modules/student_admin/StudentRegistration.jsx";
import StudentIndividualQualities from "../../system_modules/student_admin/StudentIndividualQualities.jsx";

const routes = [
  {
    path: "/admin_home",
    name: "Home",
    icon: "nc-icon nc-bank",
    layout: "/student_admin"
  },
  {
    collapse: true,
    name: "Congiguration",
    icon: "nc-icon nc-book-bookmark",
    state: "pagesCollapse",
    views: [
      {
        path: "/student_type_categories_config",
        name: "Type Categories",
        mini: "TC",
        component: StudentTypeCategories,
        layout: "/student_admin"
      },
	  {
        path: "/student_type_config",
        name: "Student Types",
        mini: "ST",
        component: StudentTypesConfig,
        layout: "/student_admin"
      }
    ]
  },
  {
    collapse: true,
    name: "Registration",
    icon: "nc-icon nc-book-bookmark",
    state: "pagesCollapse",
    views: [
	  {
        path: "/register_student",
        name: "Register Student",
        mini: "RS",
        component: StudentRegistration,
        layout: "/student_admin"
      },
	  {
        path: "/add_student_individual_qualities",
        name: "Student Qualities",
        mini: "SQ",
        component: StudentIndividualQualities,
        layout: "/student_admin"
      }
    ]
  }
];

export default routes;
