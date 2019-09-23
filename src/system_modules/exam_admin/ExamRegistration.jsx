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


class ExamRegistration extends React.Component {
constructor(props) {
    super(props);
    this.state = {
        ExamTypes: [],
		Terms: [],
		SelectedTerm:'',
		SelectedExamType:'',
		ExamStartDate:'',
		ExamEndDate:''
		
		
		
    };

      
	  this.handleSubmit = this.handleSubmit.bind(this);
	  this.handleChange = this.handleChange.bind(this);
	  
  }

  componentWillMount(){
	  
	  
	  
      var StaffNo=window.sessionStorage.getItem("StaffNo");
	  
	  if(StaffNo===null){this.props.history.push('/exam_admin_login');}else{
    
	
	/**************************************************************************************
	 First Axios for Exam Types
	*/
	  axios.post(ip+'/get_all_exam_types')
		.then((response) => {
        
		  var my_json=response.data.results;
		 
		  var jsonArray=[];
		  var jsonObject= null;
		  
		  my_json.forEach((item) => {
            
			  jsonObject={value:item.ExamTypeId,label:item.ExamTypeDescription}
			  jsonArray.push(jsonObject);
			  
        });
		    
		this.setState({
          ...this.state,
          ExamTypes: jsonArray
        });
		  
		 
		  
        })
        
    
     .catch((response) => {
        //handle error
        console.log(response);
      });
	  
	  /**************************************************************************************
	 Second Axios for Terms
	*/
	var year=new Date().getFullYear();
	axios.post(ip+"/get_all_current_year_terms", querystring.stringify({ TableOne: "term_iterations",
															             JoiningKey: "TermIterationId",
															             SearchColumn: "Year",
                                                                         SearchValue: year}))
		.then((response) => {
        
		  var my_json=response.data.results;
		 
		  var jsonArray=[];
		  var jsonObject= null;
		  var term_full_reference="";
		  
		  my_json.forEach((item) => {
            
			  term_full_reference=item.IterationDescription+"("+item.Year+")";
			
			  jsonObject={value:item.ActualTermId,label:term_full_reference}
			  jsonArray.push(jsonObject);
			  
        });
		    
		this.setState({
          ...this.state,
          Terms: jsonArray
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
		
		if(this.state.SelectedTerm===""||this.state.SelectedExamType===""||this.state.DepartmentDescription===""||this.state.ExamStartDate===""||this.state.ExamEndDate===""){alert("Kindly fill in every field on the form");}else{
		
		var CurrentSessionId=window.sessionStorage.getItem("StaffNo");
		var ExamStartDate=this.state.ExamStartDate._d.getFullYear()+"-"+(this.state.ExamStartDate._d.getMonth()+1)+"-"+this.state.ExamStartDate._d.getDate();
		var ExamEndDate=this.state.ExamEndDate._d.getFullYear()+"-"+(this.state.ExamEndDate._d.getMonth()+1)+"-"+this.state.ExamEndDate._d.getDate();
      
	  axios.post(ip+"/add_exams", querystring.stringify({ ExamTypeId: this.state.SelectedExamType.value,
														  ActualTermId: this.state.SelectedTerm.value,
														  ExamStartDate: ExamStartDate,
														  ExamEndDate: ExamEndDate,
														  ConfiguredBy: CurrentSessionId}))
		.then((response) => {
        
		  alert(response.data.results.message);
		  
		  this.setState({
          ...this.state,
          SelectedDepartmentType:'',
		  DepartmentName:'',
		  DepartmentDescription:'',
		  DepartmentRefNo:'',
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
                  <CardTitle tag="h4">Examination Registration</CardTitle>
                </CardHeader>
                <CardBody>
                  <Form className="form-horizontal" >
		            <Row>
                      <Label md="3">Type</Label>
                      <Col md="9">
                        <FormGroup>
		            <Select
                            className="react-select info"
                            classNamePrefix="react-select"
                            placeholder="Select Exam Type"
                            name="SelectedExamType"
                            closeMenuOnSelect={false}
                            value={this.state.SelectedExamType}
                            onChange={value =>
                              this.setState({
                              ...this.state,
                                      SelectedExamType: value
                              })
	  
                            }
                            options={this.state.ExamTypes}
                          />
		            </FormGroup>
                      </Col>
                    </Row>
					
					 <Row>
                      <Label md="3">Term</Label>
                      <Col md="9">
                        <FormGroup>
		            <Select
                            className="react-select info"
                            classNamePrefix="react-select"
                            placeholder="Select Term"
                            name="SelectTerm"
                            closeMenuOnSelect={false}
                            value={this.state.SelectedTerm}
                            onChange={value =>
                              this.setState({
                              ...this.state,
                                      SelectedTerm: value
                              })
	  
                            }
                            options={this.state.Terms}
                          />
		            </FormGroup>
                      </Col>
                    </Row>
					
                    <Row>
                      <Label md="3">Start Date</Label>
                      <Col md="9">
                        <FormGroup>
                          <ReactDatetime
                            name="ExamStartDate"
                            value={this.state.ExamStartDate}
                            onChange={value =>
                              this.setState({
                              ...this.state,
                                      ExamStartDate: value
                              })
	  
                            }
                            inputProps={{
                             className: "form-control",
                             placeholder: "Exam Start Date"
                          }}
                           timeFormat={false}
                         />
                        </FormGroup>
                      </Col>
                    </Row>
		           <Row>
                      <Label md="3">Start Date</Label>
                      <Col md="9">
                        <FormGroup>
                          <ReactDatetime
                            name="ExamEndDate"
                            value={this.state.ExamEndDate}
                            onChange={value =>
                              this.setState({
                              ...this.state,
                                      ExamEndDate: value
                              })
	  
                            }
                            inputProps={{
                             className: "form-control",
                             placeholder: "Exam End Date"
                          }}
                           timeFormat={false}
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

export default ExamRegistration;