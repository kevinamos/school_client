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


class LotRegistration extends React.Component {
constructor(props) {
    super(props);
    this.state = {
        LotDescriptions: [],
		SelectedLotDescription:'',
		LotNickName:''
		
		
		
		
    };

      
	  this.handleSubmit = this.handleSubmit.bind(this);
	  this.handleChange = this.handleChange.bind(this);
	  
  }

  componentWillMount(){
	  
	  
	  
      var StaffNo=window.sessionStorage.getItem("StaffNo");
	  
	  if(StaffNo===null){this.props.history.push('/tuition_admin_login');}else{
    
	  axios.post(ip+'/get_all_lot_description')
		.then((response) => {
        
		  var my_json=response.data.results;
		 
		  var jsonArray=[];
		  var jsonObject= null;
		  
		  my_json.forEach((item) => {
            
			  jsonObject={value:item.LotDescriptionId,label:item.Description}
			  jsonArray.push(jsonObject);
			  
        });
		    
		this.setState({
          ...this.state,
          LotDescriptions: jsonArray
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
		
		if(this.state.SelectedLotDescription===""||this.state.LotNickName===""){alert("Kindly fill in every field on the form");}else{
		
      axios.post(ip+"/add_lot", querystring.stringify({ LotDescriptionId: this.state.SelectedLotDescription.value,
													    LotNickName: this.state.LotNickName}))
		.then((response) => {
        
		  alert(response.data.results.message);
		  
		  this.setState({
          ...this.state,
          SelectedLotDescription:'',
		  LotNickName:''
		  
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
                  <CardTitle tag="h4">Lot Registration</CardTitle>
                </CardHeader>
                <CardBody>
                  <Form className="form-horizontal" >
		            <Row>
                      <Label md="3">Description</Label>
                      <Col md="9">
                        <FormGroup>
		            <Select
                            className="react-select info"
                            classNamePrefix="react-select"
                            placeholder="Select Description"
                            name="SelectLotDescription"
                            closeMenuOnSelect={false}
                            value={this.state.SelectedLotDescription}
                            onChange={value =>
                              this.setState({
                              ...this.state,
                                      SelectedLotDescription: value
                              })
	  
                            }
                            options={this.state.LotDescriptions}
                          />
		            </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Label md="3">NickName</Label>
                      <Col md="9">
                        <FormGroup>
                          <Input placeholder="E.g Lot NickName" type="text" name="LotNickName" value={this.state.LotNickName} type="text" onChange={this.handleChange} autofocus />
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

export default LotRegistration;