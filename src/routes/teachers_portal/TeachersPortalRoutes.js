import SelectExam from "../../system_modules/teachers_portal/SelectExam.jsx";



const routes = [
  {
    path: "/admin_home",
    name: "Home",
    icon: "nc-icon nc-bank",
    layout: "/admin"
  },
  {
    collapse: true,
    name: "Examination",
    icon: "nc-icon nc-book-bookmark",
    state: "pagesCollapse",
    views: [
      {
        path: "/teacher_select_exam",
        name: "Submit Marks",
        mini: "SM",
        component: SelectExam,
        layout: "/teachers_portal"
      }
    ]
  }
];

export default routes;
