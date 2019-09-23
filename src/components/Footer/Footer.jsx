/*eslint-disable*/
import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
import { List, ListItem, withStyles } from "@material-ui/core";

// @material-ui/icons
import Favorite from "@material-ui/icons/Favorite";

import footerStyle from "assets/jss/material-kit-react/components/footerStyle.jsx";

function Footer({ ...props }) {
  const { classes, whiteFont } = props;
  const footerClasses = classNames({
    [classes.footer]: true,
    [classes.footerWhiteFont]: whiteFont
  });
  const aClasses = classNames({
    [classes.a]: true,
    [classes.footerWhiteFont]: whiteFont
  });
  return (
    <footer className={footerClasses}>
      <div className={classes.container}>
        <div className={classes.left}>
          <List className={classes.list}>
            <ListItem className={classes.inlineBlock}>
              <a
                href="http://127.0.0.1:3000/tuition_admin_login"
                className={classes.block}
                target="_blank"
              >
                System Admin
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a
                href="http://127.0.0.1:3000/student_admin_login"
                className={classes.block}
                target="_blank"
              >
                Student Admin
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a
                href="http://127.0.0.1:3000/staff_admin_login"
                className={classes.block}
                target="_blank"
              >
                Staff Admin
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a
                href="http://127.0.0.1:3000/exam_admin_login"
                className={classes.block}
                target="_blank"
              >
                Exams Admin
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a
                href="http://127.0.0.1:3000/teachers_portal_login"
                className={classes.block}
                target="_blank"
              >
                Teachers' Portal
              </a>
            </ListItem>
          </List>
        </div>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
  whiteFont: PropTypes.bool
};

export default withStyles(footerStyle)(Footer);
