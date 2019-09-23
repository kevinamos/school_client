import React from "react";
import axios from "axios";
import querystring from "querystring";
import  { Redirect } from 'react-router-dom'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ip from "../../common/EndPoints.js";
import Select from "react-select";
import Button from "components/CustomButtons/Button.jsx";


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


class ClassSubjectsRegistration extends React.Component {
constructor(props) {
    super(props);
    this.state = {
        Classes: [],
		Subjects: [],
		SelectedClass:'',
		SelectedSubjects:""
		
    };

      
	  this.handleSubmit = this.handleSubmit.bind(this);
	  this.handleChange = this.handleChange.bind(this);
	  
  }

  componentWillMount(){
	  
	  
	  
      var StaffNo=window.sessionStorage.getItem("StaffNo");
	  
	  if(StaffNo===null){this.props.history.push('/tuition_admin_login');}else{
    
		  
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
	  
	//**********************************************************************************************
		  
		//Second axios for Subjects	  
	  axios.post(ip+'/get_all_subjects')
		.then((response) => {
        
		  var my_json=response.data.results;
		 
		  var jsonArray=[];
		  var jsonObject= null;
		  
		  my_json.forEach((item) => {
            
			  jsonObject={value:item.SubjectId,label:item.SubjectName}
			  jsonArray.push(jsonObject);
			  
        });
		    
		this.setState({
          ...this.state,
          Subjects: jsonArray
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
		//console.log(this.state.SelectedSubjects);
		if(this.state.SelectedClass===""||this.state.SelectedSubjects===""){alert("Kindly fill in every field on the form");}else{
		
		this.state.SelectedSubjects.forEach((item) => {
            
		axios.post(ip+"/add_class_specific_subjects", querystring.stringify({ ClassId: this.state.SelectedClass.value,
															                  SubjectId: item.value}))
		.then((response) => {
        
		  
		  
		  this.setState({
          ...this.state,
          SelectedClass:'',
		  SelectedSubjects:[]
          });
		  
    } )
     .catch((response) => {
        //handle error
        console.log(response);
      });	
			
			  
        });
			
	alert("Subjects added succesfully");
		
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
                  <CardTitle tag="h4">Class Subject Registration</CardTitle>
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
                      <Label md="3">Type</Label>
                      <Col md="9">
                        <FormGroup>
		            <Select
                            className="react-select info"
                            classNamePrefix="react-select"
                            placeholder="Select Subjects"
                            name="SelectSubjects"
                            closeMenuOnSelect={false}
                            isMulti
                            value={this.state.SelectedSubjects}
                            onChange={value =>
                              this.setState({
                              ...this.state,
                                      SelectedSubjects: value
                              })
	  
                            }
                            options={this.state.Subjects}
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

export default ClassSubjectsRegistration;