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


class FieldsGradeConfiguration extends React.Component {
constructor(props) {
    super(props);
    this.state = {
        AcademicClassLevels: [],
		Fields: [],
		SelectedAcademicClassLevel:'',
		SelectedField:'',
		LowerBound:'',
		UpperBound:'',
		Grade:''
		
		
		
    };

      
	  this.handleSubmit = this.handleSubmit.bind(this);
	  this.handleChange = this.handleChange.bind(this);
	  
  }

  componentWillMount(){
	  
	  
	  
      var StaffNo=window.sessionStorage.getItem("StaffNo");
	  
	  if(StaffNo===null){this.props.history.push('/tuition_admin_login');}else{
    
		  
	//First axios for academic class levels	  
	  axios.post(ip+'/get_all_academic_class_levels')
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
		  
		//Second axios for fields	  
	  axios.post(ip+'/get_all_fields_')
		.then((response) => {
        
		  var my_json=response.data.results;
		 
		  var jsonArray=[];
		  var jsonObject= null;
		  
		  my_json.forEach((item) => {
            
			  jsonObject={value:item.fieldId,label:item.FieldName}
			  jsonArray.push(jsonObject);
			  
        });
		    
		this.setState({
          ...this.state,
          Fields: jsonArray
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
		
		if(this.state.SelectedAcademicClassLevel===""||this.state.SelectedField===""||this.state.LowerBound===""||this.state.UpperBound===""||this.state.Grade===""){alert("Kindly fill in every field on the form");}else{
		
      axios.post(ip+"/add_field_grade_configuration", querystring.stringify({ FieldId: this.state.SelectedField.value,
															                  AcademicClassLevelId: this.state.SelectedAcademicClassLevel.value,
															                  LowerBound: this.state.LowerBound,
															                  UpperBound: this.state.UpperBound,
															                  Grade: this.state.Grade}))
		.then((response) => {
        
		  alert(response.data.results.message);
		  
		  this.setState({
          ...this.state,
          
		  LowerBound:'',
		  UpperBound:'',
		  Grade:''
		  
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
                  <CardTitle tag="h4">Grades Configuration</CardTitle>
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
                            name="SelectClassLevel"
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
				    <Row>
                      <Label md="3">Field</Label>
                      <Col md="9">
                        <FormGroup>
		            <Select
                            className="react-select info"
                            classNamePrefix="react-select"
                            placeholder="Select the field"
                            name="SelectField"
                            closeMenuOnSelect={false}
                            value={this.state.SelectedField}
                            onChange={value =>
                              this.setState({
                              ...this.state,
                                      SelectedField: value
                              })
	  
                            }
                            options={this.state.Fields}
                          />
		            </FormGroup>
                      </Col>
                    </Row>
				  
		            
                    <Row>
                      <Label md="3">LowerBound</Label>
                      <Col md="9">
                        <FormGroup>
                          <Input placeholder="Lower Bound Mark" type="text" name="LowerBound" value={this.state.LowerBound} type="text" onChange={this.handleChange} autofocus />
                        </FormGroup>
                      </Col>
                    </Row>
		            <Row>
                      <Label md="3">UpperBound</Label>
                      <Col md="9">
                        <FormGroup>
                          <Input placeholder="Upper Bound Mark" type="text" name="UpperBound" value={this.state.UpperBound} type="text" onChange={this.handleChange} autofocus />
                        </FormGroup>
                      </Col>
                    </Row>
		            <Row>
                      <Label md="3">Grade</Label>
                      <Col md="9">
                        <FormGroup>
                          <Input placeholder="Grade" type="text" name="Grade" value={this.state.Grade} type="text" onChange={this.handleChange} autofocus />
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

export default FieldsGradeConfiguration;