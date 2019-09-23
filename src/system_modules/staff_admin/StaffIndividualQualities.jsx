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


class StaffIndividualQualities extends React.Component {
constructor(props) {
    super(props);
    this.state = {
        StaffTypes: [],
		    SelectedStaffType:'',
		    StaffNo:''
		
		
		
    };

      
	  this.handleSubmit = this.handleSubmit.bind(this);
	  this.handleChange = this.handleChange.bind(this);
	  
  }

  componentWillMount(){
	  
	  
	  
      var StaffNo=window.sessionStorage.getItem("StaffNo");
	  
	  if(StaffNo===null){this.props.history.push('/staff_admin_login');}else{
    
	  axios.post(ip+'/get_all_staff_types')
		.then((response) => {
        
		  var my_json=response.data.results;
		 
		  var jsonArray=[];
		  var jsonObject= null;
		  
		  my_json.forEach((item) => {
            
			  jsonObject={value:item.StaffTypeId,label:item.StaffTypeDescription}
			  jsonArray.push(jsonObject);
			  
        });
		    
		this.setState({
          ...this.state,
          StaffTypes: jsonArray
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
		
		if(this.state.SelectedStaffType===""||this.state.StaffNo===""){alert("Kindly fill in every field on the form");}else{
		
      
      this.state.SelectedStaffType.forEach((item) => {
      
      
      axios.post(ip+"/add_staff_individual_qualities", querystring.stringify({ StaffTypeId: item.value,
															                   StaffNo: this.state.StaffNo}))
		.then((response) => {
        
		  
		  
		  this.setState({
          ...this.state,
          StaffTypes: [],
		      SelectedStaffType:'',
		      StaffNo:''
          });
		  
    } )
     .catch((response) => {
        //handle error
        console.log(response);
      });
        
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
	
	
	
	
    

  render() {
    return (
      <div>
		<Row style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
		 <Col md="6">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Staff Qualities</CardTitle>
                </CardHeader>
                <CardBody>
                  <Form className="form-horizontal" >
		
		            <Row>
                      <Label md="3">Staff No</Label>
                      <Col md="9">
                        <FormGroup>
                          <Input placeholder="Staff Number" type="text" name="StaffNo" value={this.state.StaffNo} type="text" onChange={this.handleChange} autofocus />
                        </FormGroup>
                      </Col>
                    </Row>
		
		            <Row>
                      <Label md="3">Quality</Label>
                      <Col md="9">
                        <FormGroup>
		            <Select
                            className="react-select info"
                            classNamePrefix="react-select"
                            placeholder="Select Quality"
                            name="SelectStaffType"
                            closeMenuOnSelect={false}
		                    isMulti
                            value={this.state.SelectedStaffType}
                            onChange={value =>
                              this.setState({
                              ...this.state,
                                      SelectedStaffType: value
                              })
	  
                            }
                            options={this.state.StaffTypes}
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

export default StaffIndividualQualities;