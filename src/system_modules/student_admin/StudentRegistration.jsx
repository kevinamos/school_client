import React from "react";
import axios from "axios";
import querystring from "querystring";
import  { Redirect } from 'react-router-dom'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ip from "../../common/EndPoints.js";
import Select from "react-select";
import Button from "components/CustomButtons/Button.jsx";
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


class StudentRegistration extends React.Component {
constructor(props) {
    super(props);
    this.state = {
        Classes: [],
		SelectedClass:'',
		AdmissionNo:'',
		FirstName:'',
		MiddleName:'',
		Surname:'',
		SelectedGender:'',
		DOB:'',
		CurrentClassSubjects:''
		
		
		
    };

      
	  this.handleSubmit = this.handleSubmit.bind(this);
	  this.handleChange = this.handleChange.bind(this);
	  this.getSelectedClassSubjects = this.getSelectedClassSubjects.bind(this);
	  this.assignSubjects = this.assignSubjects.bind(this);
	  
  }

  componentWillMount(){
	  
	  
	  
      var StaffNo=window.sessionStorage.getItem("StaffNo");
	  
	  if(StaffNo===null){this.props.history.push('/student_admin_login');}else{
    
	  //First axios for classes  
	  axios.post(ip+"/get_all_class_by_full_reference", querystring.stringify({ TableTwo: "academic_class_levels",
															                    JoiningKeyOne: "AcademicClassLevelId",
															                    TableThree: "class_streams",
															                    JoiningKeyTwo: "ClassStreamId"}))
		.then((response) => {
        
		  var my_json=response.data.results;
		 
		  var jsonArray=[];
		  var jsonObject= null;
		  var full_class_reference="";
		  
		  my_json.forEach((item) => {
            
			  full_class_reference=item.AcademicClassLevelName+" "+item.ClassStreamName
			  
			  jsonObject={value:item.ClassId,label:full_class_reference}
			  jsonArray.push(jsonObject);
			  
        });
		    
		this.setState({
          ...this.state,
          Classes: jsonArray
        });
		  
		 
		  
        })
        
    
     .catch((response) => {
        //handle error
        console.log(response);
      });
	  
	  }  

  }
	
	handleSubmit(event){ 
      event.preventDefault();
		
		if(this.state.SelectedClass===""||this.state.AdmissionNo===""||this.state.FirstName===""||this.state.MiddleName===""||this.state.Surname===""||this.state.SelectedGender===""||this.state.DOB===""){alert("Kindly fill in every field on the form");}else{
		
	  var DateOfBirth=this.state.DOB._d.getFullYear()+"-"+(this.state.DOB._d.getMonth()+1)+"-"+this.state.DOB._d.getDate();
      axios.post(ip+"/add_students", querystring.stringify({ ClassId: this.state.SelectedClass.value,
															 Gender: this.state.SelectedGender.value,
															 AdmissionNo: this.state.AdmissionNo,
															 FirstName: this.state.FirstName,
															 MiddleName: this.state.MiddleName,
															 Surname: this.state.Surname,
															 AdmissionDate: this.state.AdmissionDate,
															 DOB: DateOfBirth}))
		.then((response) => {
        
		  
		  
		  alert(response.data.results.message);
		  if(response.data.results.success===true){this.getSelectedClassSubjects();}
		  
		  
		  
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
	
	
	
	getSelectedClassSubjects(){
	
	
	axios.post(ip+"/get_a_specific_class_subjects_by_full_reference", querystring.stringify({ TableOne: "subjects",
															                                  JoiningKey: "SubjectId",
															                                  SearchColumn: "ClassId",
															                                  SearchValue: this.state.SelectedClass.value}))
		.then((response) => {
        
		  var my_json=response.data.results;
		 
		    
		this.setState({
          ...this.state,
          CurrentClassSubjects: my_json
        });
		  
		 this.assignSubjects();
		  
        })
        
    
     .catch((response) => {
        //handle error
        console.log(response);
      });
	
	
	}
	
	
	
	
	
	assignSubjects(){
		
		
	this.state.CurrentClassSubjects.forEach((item) => {	
	
	axios.post(ip+"/add_student_class_specific_subject_rship", querystring.stringify({ AdmissionNo: this.state.AdmissionNo,
															                           ClassSpecificSubjectId: item.ClassSpecificSubjectId,
															                           AssignedBy: "0"}))
		.then((response) => {
        
		
		this.setState({
          ...this.state,
          SelectedClass:'',
		  AdmissionNo:'',
		  FirstName:'',
		  MiddleName:'',
		  Surname:'',
		  SelectedGender:'',
		  DOB:''
          });
		
		  
        })
        
    
     .catch((response) => {
        //handle error
        console.log(response);
      });
		
		
		
		
	 });
	
	}
	
	
	
	
	
    

  render() {
    return (
      <div>
		<Row style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
		 <Col md="6">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Register Student</CardTitle>
                </CardHeader>
                <CardBody>
                  <Form className="form-horizontal" >
		            <Row>
                      <Label md="3">Class</Label>
                      <Col md="9">
                        <FormGroup>
		            <Select
                            className="react-select info"
                            classNamePrefix="react-select"
                            placeholder="Select Class"
                            name="SelectClass"
                            closeMenuOnSelect={false}
                            value={this.state.SelectedClass}
                            onChange={value =>
                              this.setState({
                              ...this.state,
                                      SelectedClass: value
                              })
	  
                            }
                            options={this.state.Classes}
                          />
		            </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Label md="3">Admission No.</Label>
                      <Col md="9">
                        <FormGroup>
                          <Input placeholder="Admission Number" type="text" name="AdmissionNo" value={this.state.AdmissionNo} type="text" onChange={this.handleChange} autofocus />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Label md="3">First</Label>
                      <Col md="9">
                        <FormGroup>
                          <Input placeholder="First Name" type="text" name="FirstName" value={this.state.FirstName} type="text" onChange={this.handleChange} autofocus />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Label md="3">Middle</Label>
                      <Col md="9">
                        <FormGroup>
                          <Input placeholder="Middle Name" type="text" name="MiddleName" value={this.state.MiddleName} type="text" onChange={this.handleChange} autofocus />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Label md="3">Surname</Label>
                      <Col md="9">
                        <FormGroup>
                          <Input placeholder="Surname" type="text" name="Surname" value={this.state.Surname} type="text" onChange={this.handleChange} autofocus />
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

export default StudentRegistration;