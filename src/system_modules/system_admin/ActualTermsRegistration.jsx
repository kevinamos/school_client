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


class ActualTermsRegistration extends React.Component {
constructor(props) {
    super(props);
    this.state = {
        TermIterations: [],
		SelectedTermIteration:'',
		TermStartDate:'',
		TermEndDate:''
		
		
    };

      
	  this.handleSubmit = this.handleSubmit.bind(this);
	  this.handleChange = this.handleChange.bind(this);
	  
	  
  }

  componentWillMount(){
	  
	  
	  
      var StaffNo=window.sessionStorage.getItem("StaffNo");
	  
	  if(StaffNo===null){this.props.history.push('/tuition_admin_login');}else{
    
	  axios.post(ip+'/get_all_term_iterations')
		.then((response) => {
        
		  var my_json=response.data.results;
		 
		  var jsonArray=[];
		  var jsonObject= null;
		  
		  my_json.forEach((item) => {
            
			  jsonObject={value:item.TermIterationId,label:item.IterationDescription}
			  jsonArray.push(jsonObject);
			  
        });
		    
		this.setState({
          ...this.state,
          TermIterations: jsonArray
        });
		  
		 console.log(jsonArray);
		  
        })
        
    
     .catch((response) => {
        //handle error
        console.log(response);
      });
	  
	  }  

  }
	
	handleSubmit(event){ 
      event.preventDefault();
		
		
		
		if(this.state.SelectedTermIteration===""||this.state.TermStartDate===""||this.state.TermEndDate===""){alert("Kindly fill in every field on the form");}else{
		
	  var TermStartDate=this.state.TermStartDate._d.getFullYear()+"-"+(this.state.TermStartDate._d.getMonth()+1)+"-"+this.state.TermStartDate._d.getDate();
	  var TermEndDate=this.state.TermEndDate._d.getFullYear()+"-"+(this.state.TermEndDate._d.getMonth()+1)+"-"+this.state.TermEndDate._d.getDate();	
	  var year=new Date().getFullYear();	
			
      axios.post(ip+"/add_actual_terms", querystring.stringify({ TermIterationId: this.state.SelectedTermIteration.value,
															    TermStartDate: TermStartDate,
															    TermEndDate: TermEndDate,
															    Year: year}))
		.then((response) => {
        
		  alert(response.data.results.message);
		  
		  this.setState({
          ...this.state,
          SelectedTermIteration:'',
		  TermStartDate:'',
		  TermEndDate:''
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
                  <CardTitle tag="h4">Term Registration</CardTitle>
                </CardHeader>
                <CardBody>
                  <Form className="form-horizontal" >
		            <Row>
                      <Label md="3">Iteration</Label>
                      <Col md="9">
                        <FormGroup>
		            <Select
                            className="react-select info"
                            classNamePrefix="react-select"
                            placeholder="Select Iteration"
                            name="SelectTermIteration"
                            closeMenuOnSelect={false}
                            value={this.state.SelectedTermIteration}
                            onChange={value =>
                              this.setState({
                              ...this.state,
                                      SelectedTermIteration: value
                              })
	  
                            }
                            options={this.state.TermIterations}
                          />
		            </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Label md="3">Start Date</Label>
                      <Col md="9">
                        <FormGroup>
                          <ReactDatetime
                            name="TermStartDate"
                            value={this.state.TermStartDate}
                            onChange={value =>
                              this.setState({
                              ...this.state,
                                      TermStartDate: value
                              })
	  
                            }
                            inputProps={{
                             className: "form-control",
                             placeholder: "Term Start Date"
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
                            name="TermEndDate"
                            value={this.state.TermEndDate}
                            onChange={value =>
                              this.setState({
                              ...this.state,
                                      TermEndDate: value
                              })
	  
                            }
                            inputProps={{
                             className: "form-control",
                             placeholder: "Term End Date"
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

export default ActualTermsRegistration;