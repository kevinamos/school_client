import React from "react";
import axios from "axios";
import querystring from "querystring";
import { Redirect } from "react-router-dom";
import ip from "../../common/EndPoints.js";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
import Lock from "@material-ui/icons/Lock";
// core components
import Header from "components/Header/Header.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import Footer from "components/Footer/Footer.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import { FaFacebook } from "react-icons/fa";
import { FaGooglePlus } from "react-icons/fa";
import { FaCcVisa } from "react-icons/fa";

import loginPageStyle from "assets/jss/material-kit-react/views/loginPage.jsx";

import image from "assets/img/bg7.jpg";
import { Button as myButton } from "reactstrap";

import { Input, InputGroupAddon, InputGroupText, InputGroup } from "reactstrap";

class StaffAdminLogin extends React.Component {
  constructor(props) {
    super(props);
    // we use this to make the card to appear after the page has been rendered
    this.state = {
      AttemptedUserName: "",
      AttemptedPassword: "",
      login_error: true,
      response: null,
      login_credentials: [],
      cardAnimaton: "cardHidden"
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    // we add a hidden class to the card and after 700 ms we delete it and the transition appears
    setTimeout(
      function() {
        this.setState({ cardAnimaton: "" });
      }.bind(this),
      700
    );
  }

  handleSubmit(event) {
    event.preventDefault();

    axios
      .post(
        ip + "/user_login",
        querystring.stringify({
          AttemptedStaffNo: this.state.AttemptedUserName,
          AttemptedPassword: this.state.AttemptedPassword
        })
      )
      .then(response => {
        this.setState({
          ...this.state,
          login_credentials: response.data,
          login_error: response.data.error,
          response: response
        });
        console.log(this.state.AttemptedUserName);
        window.sessionStorage.setItem("StaffNo", response.data.StaffNo);
        window.sessionStorage.setItem("Surname", response.data.Surname);
        this.my_router();
      })
      .catch(response => {
        //handle error
        console.log(response);
      });
  }

  handleChange(event) {
    let newState = this.state;
    newState[event.target.name] = event.target.value;
    let prop = event.target.name;
    this.setState({
      ...newState
    });
  }

  my_router = () => {
    if (!this.state.login_error) {
      this.props.history.push("/staff_admin/staff_types_config");
    } else {
      alert(this.state.response.data.error_msg);
    }
  };

  render() {
    const { classes, ...rest } = this.props;
    return (
      <div>
        <Header
          absolute
          color="transparent"
          brand="SMS"
          rightLinks={<HeaderLinks />}
          {...rest}
        />
        <div
          className={classes.pageHeader}
          style={{
            backgroundImage: "url(" + image + ")",
            backgroundSize: "cover",
            backgroundPosition: "top center"
          }}
        >
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={4}>
                <Card className={classes[this.state.cardAnimaton]}>
                  <form className={classes.form}>
                    <CardHeader color="primary" className={classes.cardHeader}>
                      <h4>Staff Admin Login</h4>
                      <div className={classes.socialLine}>
                        <Button
                          justIcon
                          href="#pablo"
                          target="_blank"
                          color="transparent"
                          onClick={e => e.preventDefault()}
                        >
                          <FaFacebook />
                        </Button>
                        <Button
                          justIcon
                          href="#pablo"
                          target="_blank"
                          color="transparent"
                          onClick={e => e.preventDefault()}
                        >
                          <FaGooglePlus />
                        </Button>
                        <Button
                          justIcon
                          href="#pablo"
                          target="_blank"
                          color="transparent"
                          onClick={e => e.preventDefault()}
                        >
                          <FaCcVisa />
                        </Button>
                      </div>
                    </CardHeader>
                    <p className={classes.divider}>Or Be Classical</p>
                    <CardBody>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="nc-icon nc-single-02" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="Staff Number"
                          type="text"
                          name="AttemptedUserName"
                          value={this.state.AttemptedUserName}
                          onChange={this.handleChange}
                          autofocus
                        />
                      </InputGroup>

                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="nc-icon nc-key-25" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="Password"
                          type="password"
                          autoComplete="off"
                          name="AttemptedPassword"
                          value={this.state.AttemptedPassword}
                          onChange={this.handleChange}
                        />
                      </InputGroup>
                    </CardBody>
                    <CardFooter className={classes.cardFooter}>
                      <Button
                        round
                        color="primary"
                        size="lg"
                        onClick={this.handleSubmit}
                      >
                        SIGN IN
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
              </GridItem>
            </GridContainer>
          </div>
          <Footer whiteFont />
        </div>
      </div>
    );
  }
}

export default withStyles(loginPageStyle)(StaffAdminLogin);
