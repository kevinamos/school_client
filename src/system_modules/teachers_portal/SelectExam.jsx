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


class SelectExam extends React.Component {
constructor(props) {
    super(props);
    this.state = {
        Exams: [],
		MySubjects: [],
		SelectedExam:'',
		SelectedClassSubject:''
		
		
		
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
	  
	  
	  
	  //Second axios for my subjects
	  
	  
	  axios.post(ip+"/get_a_teachers_specific_subjects_by_full_reference", querystring.stringify({JoiningKeyOne: "ClassSpecificSubjectId",
															                                      TableTwo: "class_specific_subjects",
															                                      JoiningKeyTwo: "SubjectId",
																		                          TableThree: "subjects",
																								  JoiningKeyThree: "ClassId",
															                                      TableFour: "classes",
															                                      JoiningKeyFour: "AcademicClassLevelId",
																		                          TableFive: "academic_class_levels",
															                                      JoiningKeyFive: "ClassStreamId",
															                                      TableSix: "class_streams",
																		                          SearchColumn: "StaffNo",
                                                                                                  SearchValue: StaffNo}))
		.then((response) => {
        
		  var my_json=response.data.results;
		 
		  var jsonArray=[];
		  var jsonObject= null;
		  var my_subjects_by_full_reference="";
		  
		  my_json.forEach((item) => {
		  
		      my_subjects_by_full_reference=item.SubjectName+"  -  ("+item.AcademicClassLevelName+"  "+item.ClassStreamName+")";
            
			  jsonObject={value:item.ClassSpecificSubjectId,label:my_subjects_by_full_reference}
			  jsonArray.push(jsonObject);
			  
        });
		    
		this.setState({
          ...this.state,
          MySubjects: jsonArray,
		  
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
		
		if(this.state.SelectedExam===""){alert("Kindly fill in every field on the form");}else{
		
		var ClassSpecificSubjectId = this.state.SelectedClassSubject.value;
	    var ExamId = this.state.SelectedExam.value;
	    var SubjectTitle = this.state.SelectedClassSubject.label+" - "+this.state.SelectedExam.label;
		
           this.props.history.push({
               pathname: '/class_exam_papers_table',
               state: { ClassSpecificSubjectId: ClassSpecificSubjectId,ExamId: ExamId,SubjectTitle :SubjectTitle}
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
                  <CardTitle tag="h4">Submit Marks</CardTitle>
                </CardHeader>
                <CardBody>
                  <Form className="form-horizontal" >
				    <Row>
                      <Label md="3">Subject</Label>
                      <Col md="9">
                        <FormGroup>
		            <Select
                            className="react-select info"
                            classNamePrefix="react-select"
                            placeholder="Select Subject"
                            name="SelectedClassSubject"
                            closeMenuOnSelect={false}
                            value={this.state.SelectedClassSubject}
                            onChange={value =>
                              this.setState({
                              ...this.state,
                                      SelectedClassSubject: value
                              })
	  
                            }
                            options={this.state.MySubjects}
                          />
		            </FormGroup>
                      </Col>
                    </Row>
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

export default SelectExam;