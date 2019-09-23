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


class SelectResults extends React.Component {
constructor(props) {
    super(props);
    this.state = {
        Exams: [],
		AcademicClassLevels: [],
		SelectedExam:'',
		SelectedAcademicClassLevel:'',
		
		
		
    };

      
	  this.handleSubmit = this.handleSubmit.bind(this);
	  this.handleChange = this.handleChange.bind(this);
	  
	  
  }

  componentWillMount(){
	  
	  
	  
      var StaffNo=window.sessionStorage.getItem("StaffNo");
	  
	  if(StaffNo===null){this.props.history.push('/tuition_admin_login');}else{
    
	  var CurrentYear=new Date().getFullYear();
	  axios.post(ip+"/get_all_current_year_configured_exams_by_full_reference", querystring.stringify({TableTwo: "exam_types",
															                                           JoiningKeyOne: "ExamTypeId",
															                                           TableThree: "actual_terms",
																		                               JoiningKeyTwo: "ActualTermId",
															                                           TableFour: "term_iterations",
															                                           JoiningKeyThree: "TermIterationId",
																		                               SearchColumn: "Year",
                                                                                                       SearchValue: CurrentYear}))
		.then((response) => {
        
		  var my_json=response.data.results;
		 
		  var jsonArray=[];
		  var jsonObject= null;
		  var exam_by_full_reference="";
		  
		  my_json.forEach((item) => {
		  
		      exam_by_full_reference=item.ExamTypeDescription+"  -  ("+item.IterationDescription+" - "+item.Year+")";
            
			  jsonObject={value:item.ExamId,label:exam_by_full_reference}
			  jsonArray.push(jsonObject);
			  
        });
		    
		this.setState({
          ...this.state,
          Exams: jsonArray
		  
        });
		  
		 
		  
        })
        
    
     .catch((response) => {
        //handle error
        console.log(response);
      });
	  
	  
	  
	 //******************************************************************************************************
	 //Second axios for classes
	  axios.post(ip+"/get_all_academic_class_levels")
		.then((response) => {
        
		  var my_json=response.data.results;
		 
		  var jsonArray=[];
		  var jsonObject= null;
		  
		  
		  my_json.forEach((item) => {
            
			  
			  
			  jsonObject={value:item.AcademicClassLevelId,label:item.AcademicClassLevelName}
			  jsonArray.push(jsonObject);
			  
        });
		    
		this.setState({
          ...this.state,
          AcademicClassLevels: jsonArray
        });
		  
		 
		  
        })
        
    
     .catch((response) => {
        //handle error
        console.log(response);
      });
	  
	//**********************************************************************************************
	  
	  }  

  }
	
	handleSubmit(event){ 
      event.preventDefault();
		
		if(this.state.SelectedExam===""){alert("Kindly fill in every field on the form");}else{
		
		var AcademicClassLevelId = this.state.SelectedAcademicClassLevel.value;
	    var ExamId = this.state.SelectedExam.value;
	    
		
           this.props.history.push({
               pathname: '/primary_results_table',
               state: {ExamId:ExamId,AcademicClassLevelId:AcademicClassLevelId}
           })
	  
	  
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
                  <CardTitle tag="h4">Select Exam and Class</CardTitle>
                </CardHeader>
                <CardBody>
                  <Form className="form-horizontal" >
				    
		            <Row>
                      <Label md="3">Exam</Label>
                      <Col md="9">
                        <FormGroup>
		            <Select
                            className="react-select info"
                            classNamePrefix="react-select"
                            placeholder="Select Exam"
                            name="SelectExam"
                            closeMenuOnSelect={false}
                            value={this.state.SelectedExam}
                            onChange={value =>
                              this.setState({
                              ...this.state,
                                      SelectedExam: value
                              })
	  
                            }
                            options={this.state.Exams}
                          />
		            </FormGroup>
                      </Col>
                    </Row>
                    
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
                            value={this.state.SelectedAcademicClassLevel}
                            onChange={value =>
                              this.setState({
                              ...this.state,
                                      SelectedAcademicClassLevel: value
                              })
	  
                            }
                            options={this.state.AcademicClassLevels}
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

export default SelectResults;