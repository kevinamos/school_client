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


class ClassRegistration extends React.Component {
constructor(props) {
    super(props);
    this.state = {
        AcademicClassLevels: [],
		ClassStreams: [],
		Lots: [],
		SelectedAcademicClassLevel:'',
		SelectedClassStream:'',
		SelectedLot:'',
		ClassNickName:'',
		ClassDescription:'',
		PhysicalAddress:'',
		ClassRefNo:''
		
		
    };

      
	  this.handleSubmit = this.handleSubmit.bind(this);
	  this.handleChange = this.handleChange.bind(this);
	  
  }

  componentWillMount(){
	  
	  
	  
      var StaffNo=window.sessionStorage.getItem("StaffNo");
	  
	  if(StaffNo===null){this.props.history.push('/tuition_admin_login');}else{
    
		  
	//First axios for class streams	  
	  axios.post(ip+'/get_all_class_streams')
		.then((response) => {
        
		  var my_json=response.data.results;
		 
		  var jsonArray=[];
		  var jsonObject= null;
		  
		  my_json.forEach((item) => {
            
			  jsonObject={value:item.ClassStreamId,label:item.ClassStreamName}
			  jsonArray.push(jsonObject);
			  
        });
		    
		this.setState({
          ...this.state,
          ClassStreams: jsonArray
        });
		  
		 
		  
        })
        
    
     .catch((response) => {
        //handle error
        console.log(response);
      });
	  
	//**********************************************************************************************
		  
		//Second axios for Academic class levels	  
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
		  
		//Third axios for lots  
	  axios.post(ip+"/get_all_lots_by_full_reference", querystring.stringify({ TableOne: "lot_description",
															                   JoiningKey: "LotDescriptionId"}))
		.then((response) => {
        
		  var my_json=response.data.results;
		 
		  var jsonArray=[];
		  var jsonObject= null;
		  
		  my_json.forEach((item) => {
            
			  jsonObject={value:item.LotId,label:item.Description}
			  jsonArray.push(jsonObject);
			  
        });
		    
		this.setState({
          ...this.state,
          Lots: jsonArray
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
		
		if(this.state.SelectedAcademicClassLevel===""||this.state.ClassStreamId===""||this.state.ClassNickName===""||this.state.ClassDescription===""||this.state.PhysicalAddress===""||this.state.ClassRefNo===""){alert("Kindly fill in every field on the form");}else{
		
      axios.post(ip+"/add_classes", querystring.stringify({ AcademicClassLevelId: this.state.SelectedAcademicClassLevel.value,
															ClassStreamId: this.state.SelectedClassStream.value,
															LotId: this.state.SelectedLot.value,
															ClassNickName: this.state.ClassNickName,
															ClassDescription: this.state.ClassDescription,
															PhysicalAddress: this.state.PhysicalAddress,
															ClassRefNo: this.state.ClassRefNo}))
		.then((response) => {
        
		  alert(response.data.results.message);
		  
		  this.setState({
          ...this.state,
          SelectedAcademicClassLevel:'',
		  SelectedClassStream:'',
		  ClassNickName:'',
		  ClassDescription:'',
		  PhysicalAddress:'',
		  SelectedLot:'',
		  ClassRefNo:''
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
                  <CardTitle tag="h4">Class Registration</CardTitle>
                </CardHeader>
                <CardBody>
                  <Form className="form-horizontal" >
				  
				    <Row>
                      <Label md="3">Lot</Label>
                      <Col md="9">
                        <FormGroup>
		            <Select
                            className="react-select info"
                            classNamePrefix="react-select"
                            placeholder="Select which lot"
                            name="SelectLot"
                            closeMenuOnSelect={false}
                            value={this.state.SelectedLot}
                            onChange={value =>
                              this.setState({
                              ...this.state,
                                      SelectedLot: value
                              })
	  
                            }
                            options={this.state.Lots}
                          />
		            </FormGroup>
                      </Col>
                    </Row>
				  
		            <Row>
                      <Label md="3">Level</Label>
                      <Col md="9">
                        <FormGroup>
		            <Select
                            className="react-select info"
                            classNamePrefix="react-select"
                            placeholder="Choose Level"
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
                      <Label md="3">Stream</Label>
                      <Col md="9">
                        <FormGroup>
		            <Select
                            className="react-select info"
                            classNamePrefix="react-select"
                            placeholder="Choose Stream"
                            name="SelectClassStream"
                            closeMenuOnSelect={false}
                            value={this.state.SelectedClassStream}
                            onChange={value =>
                              this.setState({
                              ...this.state,
                                      SelectedClassStream: value
                              })
	  
                            }
                            options={this.state.ClassStreams}
                          />
		            </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Label md="3">Nickname</Label>
                      <Col md="9">
                        <FormGroup>
                          <Input placeholder="Nickname" type="text" name="ClassNickName" value={this.state.ClassNickName} type="text" onChange={this.handleChange} autofocus />
                        </FormGroup>
                      </Col>
                    </Row>
		            <Row>
                      <Label md="3">Description</Label>
                      <Col md="9">
                        <FormGroup>
                          <Input placeholder="Description" type="text" name="ClassDescription" value={this.state.ClassDescription} type="text" onChange={this.handleChange} autofocus />
                        </FormGroup>
                      </Col>
                    </Row>
		            <Row>
                      <Label md="3">Physical Address</Label>
                      <Col md="9">
                        <FormGroup>
                          <Input placeholder="Physical Address" type="text" name="PhysicalAddress" value={this.state.PhysicalAddress} type="text" onChange={this.handleChange} autofocus />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Label md="3">Reference No.</Label>
                      <Col md="9">
                        <FormGroup>
                          <Input placeholder="Reference Number" type="text" name="ClassRefNo" value={this.state.ClassRefNo} type="text" onChange={this.handleChange} autofocus />
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

export default ClassRegistration;