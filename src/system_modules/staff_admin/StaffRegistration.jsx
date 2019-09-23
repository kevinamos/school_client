import React from "react";
import axios from "axios";
import querystring from "querystring";
import  { Redirect } from 'react-router-dom'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ip from "../../common/EndPoints.js";
import Button from "components/CustomButtons/Button.jsx";
import Select from "react-select";
import ReactDatetime from "react-datetime";



// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Label,
  FormGroup,
  Form,
  Input,
  FormText,
  Row,
  Col
} from "reactstrap";


class StaffRegistration extends React.Component {
constructor(props) {
    super(props);
    this.state = {
        StaffNo: '',
		FirstName: '',
		MiddleName: '',
		Surname: '',
		SelectedGender: '',
		DOB: '',
		NationalId: '',
		Email: '',
		PhysicalAddress: '',
		Password: ''
		
    };

      
	  this.handleSubmit = this.handleSubmit.bind(this);
	  this.handleChange = this.handleChange.bind(this);
	  
  }

  componentWillMount() {
	  
	  
      var StaffNo=window.sessionStorage.getItem("StaffNo");
	  
	  if(StaffNo===null){this.props.history.push('/staff_admin_login');}
	  
	  

  }
	
	handleSubmit(event){ 
      event.preventDefault();
		
		if(this.state.StaffNo===""||this.state.FirstName===""||this.state.MiddleName===""||this.state.Surname===""||this.state.SelectedGender===""||this.state.DOB===""||this.state.NationalId===""||this.state.Email===""||this.state.PhysicalAddress===""||this.state.Password===""){alert("Kindly fill in every field on the form");}else{
		
	  var DateOfBirth=this.state.DOB._d.getFullYear()+"-"+(this.state.DOB._d.getMonth()+1)+"-"+this.state.DOB._d.getDate();	
			
      axios.post(ip+"/user_registration", querystring.stringify({ StaffNo: this.state.StaffNo,
																  FirstName: this.state.FirstName,
																  MiddleName: this.state.MiddleName,
																  Surname: this.state.Surname,
																  Gender: this.state.SelectedGender.value,
																  DOB: DateOfBirth,
																  NationalId: this.state.NationalId,
																  Email: this.state.Email,
																  PhysicalAddress: this.state.PhysicalAddress,
																  Password: this.state.Password}))
		.then((response) => {
		  
		  alert(response.data.results.message);
		  
		  this.setState({
          ...this.state,
          StaffNo: '',
		  FirstName: '',
		  MiddleName: '',
		  Surname: '',
		  SelectedGender: '',
		  DOB: '',
		  NationalId: '',
		  Email: '',
		  PhysicalAddress: '',
		  Password: ''
          });
		 
    
    } )
     .catch((response) => {
        //handle error
        console.log(response);
      });
  
			
	}		
 }
   
	
	
	handleChange(event) {    
    let newState = this.state
    newState[event.target.name] = event.target.value
    let prop = event.target.name
        this.setState({
          ...newState     
        });
		
	}
	
	
	
	
    

  render() {
    return (
      <div>
		<Row style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
		 <Col md="6">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Staff Registration</CardTitle>
                </CardHeader>
                <CardBody>
                  <Form className="form-horizontal" >
                    <Row>
                      <Label md="3">Staff No</Label>
                      <Col md="9">
                        <FormGroup>
                          <Input placeholder="Staff Number" type="text" name="StaffNo" value={this.state.StaffNo} onChange={this.handleChange} autofocus />
                        </FormGroup>
                      </Col>
                    </Row>
		
		            <Row>
                      <Label md="3">First</Label>
                      <Col md="9">
                        <FormGroup>
                          <Input placeholder="First Name" type="text" name="FirstName" value={this.state.FirstName} onChange={this.handleChange} autofocus />
                        </FormGroup>
                      </Col>
                    </Row>
		
		            <Row>
                      <Label md="3">Middle</Label>
                      <Col md="9">
                        <FormGroup>
                          <Input placeholder="Middle Name" type="text" name="MiddleName" value={this.state.MiddleName} onChange={this.handleChange} autofocus />
                        </FormGroup>
                      </Col>
                    </Row>
		
		            <Row>
                      <Label md="3">Surname</Label>
                      <Col md="9">
                        <FormGroup>
                          <Input placeholder="Surname" type="text" name="Surname" value={this.state.Surname} onChange={this.handleChange} autofocus />
                        </FormGroup>
                      </Col>
                    </Row>
		
		            <Row>
                      <Label md="3">D.O.B</Label>
                      <Col md="9">
                        <FormGroup>
                          <ReactDatetime
                            name="DOB"
                            value={this.state.DOB}
                            onChange={value =>
                              this.setState({
                              ...this.state,
                                      DOB: value
                              })
	  
                            }
                            inputProps={{
                             className: "form-control",
                             placeholder: "Date Of Birth"
                          }}
                           timeFormat={false}
                         />
                        </FormGroup>
                      </Col>
                    </Row>
		
		
		            <Row>
                      <Label md="3">Gender</Label>
                      <Col md="9">
                        <FormGroup>
                          <Select
                            className="react-select info"
                            classNamePrefix="react-select"
                            placeholder="Select Gender"
                            name="SelectedGender"
                            closeMenuOnSelect={false}
                            value={this.state.SelectedGender}
                            onChange={value =>
                              this.setState({ SelectedGender: value })
                            }
                            options={[
                              
                              { value: "Male", label: "Male" },
                              { value: "Female", label: "Female" }
                            ]}
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Label md="3">National ID</Label>
                      <Col md="9">
                        <FormGroup>
                          <Input placeholder="National ID" type="text" name="NationalId" value={this.state.NationalId} onChange={this.handleChange} autofocus />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Label md="3">Email</Label>
                      <Col md="9">
                        <FormGroup>
                          <Input placeholder="Email Address" type="text" name="Email" value={this.state.Email} type="text" onChange={this.handleChange} autofocus />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Label md="3">Address</Label>
                      <Col md="9">
                        <FormGroup>
                          <Input placeholder="Physical Address" type="text" name="PhysicalAddress" value={this.state.PhysicalAddress} onChange={this.handleChange} autofocus />
                        </FormGroup>
                      </Col>
                    </Row>


                    <Row>
                      <Label md="3">Password</Label>
                      <Col md="9">
                        <FormGroup>
                          <Input placeholder="User Password" type="password" name="Password" value={this.state.Password} onChange={this.handleChange} autofocus />
                        </FormGroup>
                      </Col>
                    </Row>
                    
                  </Form>
                </CardBody>
                <CardFooter>
                  <Row>
                    <Col md="3" />
                    <Col md="9">
                      <Button className="btn-round" color="info" type="submit" onClick={this.handleSubmit}>
                        Submit
                      </Button>
                    </Col>
                  </Row>
                </CardFooter>
              </Card>
            </Col>
		</Row>
      
      </div>
    );
  }
}

export default StaffRegistration;