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


class StudentIndividualQualities extends React.Component {
constructor(props) {
    super(props);
    this.state = {
        StudentTypeCategories: [],
		StudentTypes: [],
		SelectedStudentTypeCategory:'',
		SelectedStudentType:'',
		AdmissionNo:''
		
		
		
    };

      
	  this.handleSubmit = this.handleSubmit.bind(this);
	  this.handleChange = this.handleChange.bind(this);
	  this.handleParentDropDownChanged = this.handleParentDropDownChanged.bind(this);
	  
  }

  componentWillMount(){
	  
	  
	  
      var StaffNo=window.sessionStorage.getItem("StaffNo");
	  
	  if(StaffNo===null){this.props.history.push('/student_admin_login');}else{
    
		  
	//First axios for class streams	  
	  axios.post(ip+'/get_all_student_type_categories')
		.then((response) => {
        
		  var my_json=response.data.results;
		 
		  var jsonArray=[];
		  var jsonObject= null;
		  
		  my_json.forEach((item) => {
            
			  jsonObject={value:item.StudentTypeCategoryId,label:item.CategoryDescription}
			  jsonArray.push(jsonObject);
			  
        });
		    
		this.setState({
          ...this.state,
          StudentTypeCategories: jsonArray
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
		
		if(this.state.SelectedStudentTypeCategory===""||this.state.SelectedStudentType===""||this.state.AdmissionNo===""){alert("Kindly fill in every field on the form");}else{
		
		this.state.SelectedStudentType.forEach((item) => {	
			
      axios.post(ip+"/add_student_individual_qualities", querystring.stringify({ StudentTypeId: item.value,
															                     AdmissionNo: this.state.AdmissionNo}))
		.then((response) => {
        
		  
		  
		  
		  
    } )
     .catch((response) => {
        //handle error
        console.log(response);
      });
			
		});
											   
											   
		this.setState({
          ...this.state,
          SelectedStudentTypeCategory:'',
		  SelectedStudentType:'',
		  AdmissionNo:''
        });									   
		
		alert("Qualities added succesfully");
											   
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
	
	
	
	
	handleParentDropDownChanged(value){
		
	  this.setState({
                      ...this.state,
                         SelectedStudentTypeCategory: value,
		                 SelectedStudentType:''
		                 
                    })
		
		
	  var selectedParentObject=value;
		
		
	axios.post(ip+"/get_specific_student_types", querystring.stringify({ column_name: "StudentTypeCategoryId",
															             search_value: selectedParentObject.value}))
		.then((response) => {
        
		  var my_json=response.data.results;
		 
		  var jsonArray=[];
		  var jsonObject= null;
		  
		  my_json.forEach((item) => {
            
			  
			  jsonObject={value:item.StudentTypeId,label:item.StudentTypeDescription}
			  jsonArray.push(jsonObject);
			  
        });
		    
		this.setState({
          ...this.state,
          StudentTypes: jsonArray
        });
		  
		 
		  
        })
        
    
     .catch((response) => {
        //handle error
        console.log(response);
});
	}
	
    

  render() {
    return (
      <div>
		<Row style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
		 <Col md="6">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Student Qualities</CardTitle>
                </CardHeader>
                <CardBody>
                  <Form className="form-horizontal" >
		
		             <Row>
                      <Label md="3">Admission No.</Label>
                      <Col md="9">
                        <FormGroup>
                          <Input placeholder="Admission Number" type="text" name="AdmissionNo" value={this.state.AdmissionNo} type="text" onChange={this.handleChange} autofocus />
                        </FormGroup>
                      </Col>
                    </Row>
		
		            <Row>
                      <Label md="3">Category</Label>
                      <Col md="9">
                        <FormGroup>
		            <Select
                            className="react-select info"
                            classNamePrefix="react-select"
                            placeholder="Select Category"
                            name="SelectCategory"
                            closeMenuOnSelect={false}
                            value={this.state.SelectedStudentTypeCategory}
                            onChange={this.handleParentDropDownChanged}
                            options={this.state.StudentTypeCategories}
                          />
		            </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Label md="3">Student Type</Label>
                      <Col md="9">
                        <FormGroup>
		            <Select
                            className="react-select info"
                            classNamePrefix="react-select"
                            placeholder="Select Student Type"
                            name="SelectStudentType"
                            closeMenuOnSelect={false}
		                    isMulti
                            value={this.state.SelectedStudentType}
                            onChange={value =>
                              this.setState({
                              ...this.state,
                                      SelectedStudentType: value
                              })
	  
                            }
                            options={this.state.StudentTypes}
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

export default StudentIndividualQualities;