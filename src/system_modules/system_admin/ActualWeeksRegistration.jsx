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


class ActualWeeksRegistration extends React.Component {
constructor(props) {
    super(props);
    this.state = {
        WeekIterations: [],
		ActualTerms: [],
		SelectedWeekIteration:'',
		SelectedActualTerm:'',
		WeekStartDate:'',
		WeekEndDate:''
		
		
		
    };

      
	  this.handleSubmit = this.handleSubmit.bind(this);
	  this.handleChange = this.handleChange.bind(this);
	  
  }

  componentWillMount(){
	  
	  
	  
      var StaffNo=window.sessionStorage.getItem("StaffNo");
	  
	  if(StaffNo===null){this.props.history.push('/tuition_admin_login');}else{
    
		  
	//First axios for terms	  
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
          ActualTerms: jsonArray
        });
		  
		 
		  
        })
        
    
     .catch((response) => {
        //handle error
        console.log(response);
      });
	  
	//**********************************************************************************************
		  
		//Second axios for Week iterations	  
	  axios.post(ip+'/get_all_week_iterations')
		.then((response) => {
        
		  var my_json=response.data.results;
		 
		  var jsonArray=[];
		  var jsonObject= null;
		  
		  my_json.forEach((item) => {
            
			  jsonObject={value:item.WeekIterationId,label:item.WeekIterationDescription}
			  jsonArray.push(jsonObject);
			  
        });
		    
		this.setState({
          ...this.state,
          WeekIterations: jsonArray
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
		
		if(this.state.SelectedWeekIteration===""||this.state.SelectedActualTerm===""||this.state.WeekStartDate===""||this.state.WeekEndDate===""){alert("Kindly fill in every field on the form");}else{
		
	  var WeekStartDate=this.state.WeekStartDate._d.getFullYear()+"-"+(this.state.WeekStartDate._d.getMonth()+1)+"-"+this.state.WeekStartDate._d.getDate();
	  var WeekEndDate=this.state.WeekEndDate._d.getFullYear()+"-"+(this.state.WeekEndDate._d.getMonth()+1)+"-"+this.state.WeekEndDate._d.getDate();	
			
      axios.post(ip+"/add_actual_weeks", querystring.stringify({ WeekIterationId: this.state.SelectedWeekIteration.value,
															     ActualTermId: this.state.SelectedActualTerm.value,
															     WeekStartDate: WeekStartDate,
															     WeekEndDate: WeekEndDate}))
		.then((response) => {
        
		  alert(response.data.results.message);
		  
		  this.setState({
          ...this.state,
          SelectedWeekIteration:'',
		  SelectedActualTerm:'',
		  WeekStartDate:'',
		  WeekEndDate:''
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
                  <CardTitle tag="h4">Week Registration</CardTitle>
                </CardHeader>
                <CardBody>
                  <Form className="form-horizontal" >
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
                            value={this.state.SelectedActualTerm}
                            onChange={value =>
                              this.setState({
                              ...this.state,
                                      SelectedActualTerm: value
                              })
	  
                            }
                            options={this.state.ActualTerms}
                          />
		            </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Label md="3">Iteration</Label>
                      <Col md="9">
                        <FormGroup>
		            <Select
                            className="react-select info"
                            classNamePrefix="react-select"
                            placeholder="SelectIteration"
                            name="SelectWeekIteration"
                            closeMenuOnSelect={false}
                            value={this.state.SelectedWeekIteration}
                            onChange={value =>
                              this.setState({
                              ...this.state,
                                      SelectedWeekIteration: value
                              })
	  
                            }
                            options={this.state.WeekIterations}
                          />
		            </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Label md="3">Start Date</Label>
                      <Col md="9">
                        <FormGroup>
                          <ReactDatetime
                            name="WeekStartDate"
                            value={this.state.WeekStartDate}
                            onChange={value =>
                              this.setState({
                              ...this.state,
                                      WeekStartDate: value
                              })
	  
                            }
                            inputProps={{
                             className: "form-control",
                             placeholder: "Week Start Date"
                          }}
                           timeFormat={false}
                         />
                        </FormGroup>
                      </Col>
                    </Row>
		            <Row>
                      <Label md="3">End Date</Label>
                      <Col md="9">
                        <FormGroup>
                          <ReactDatetime
                            name="WeekEndDate"
                            value={this.state.WeekEndDate}
                            onChange={value =>
                              this.setState({
                              ...this.state,
                                      WeekEndDate: value
                              })
	  
                            }
                            inputProps={{
                             className: "form-control",
                             placeholder: "Week End Date"
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

export default ActualWeeksRegistration;