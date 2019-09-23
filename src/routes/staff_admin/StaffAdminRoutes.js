import StaffTypeConfig from "../../system_modules/staff_admin/StaffTypeConfig.jsx";
import StaffRegistration from "../../system_modules/staff_admin/StaffRegistration.jsx";
import StaffIndividualQualities from "../../system_modules/staff_admin/StaffIndividualQualities.jsx";
import AssignTeachersSubjects from "../../system_modules/staff_admin/AssignTeachersSubjects.jsx";


const routes = [
  {
    path: "/admin_home",
    name: "Home",
    icon: "nc-icon nc-bank",
    layout: "/student_admin"
  },
  {
    collapse: true,
    name: "Configuration",
    icon: "nc-icon nc-book-bookmark",
    state: "pagesCollapse",
    views: [
      {
        path: "/staff_types_config",
        name: "Staff Types",
        mini: "ST",
        component: StaffTypeConfig,
        layout: "/staff_admin"
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
        path: "/staff_registration",
        name: "Staff Registration",
        mini: "SR",
        component: StaffRegistration,
        layout: "/staff_admin"
      },
	  {
        path: "/staff_qualities",
        name: "Staff Qualities",
        mini: "SQ",
        component: StaffIndividualQualities,
        layout: "/staff_admin"
      },
	  {
        path: "/assign_teachers_subjects",
        name: "Assign Subjects",
        mini: "AS",
        component: AssignTeachersSubjects,
        layout: "/staff_admin"
      }
    ]
  }
];

export default routes;
