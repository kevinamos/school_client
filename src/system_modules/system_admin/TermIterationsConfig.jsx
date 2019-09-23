import React from "react";
import axios from "axios";
import querystring from "querystring";
import  { Redirect } from 'react-router-dom'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ip from "../../common/EndPoints.js";
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


class TermIterationsConfig extends React.Component {
constructor(props) {
    super(props);
    this.state = {
        IterationDescription: ''
		
    };

      
	  this.handleSubmit = this.handleSubmit.bind(this);
	  this.handleChange = this.handleChange.bind(this);
	  
  }

  componentWillMount() {
	  
	  
      var StaffNo=window.sessionStorage.getItem("StaffNo");
	  
	  if(StaffNo===null){this.props.history.push('/tuition_admin_login');}
	  
	  

  }
	
	handleSubmit(event){ 
      event.preventDefault();
		
		if(this.state.IterationDescription===""){alert("Kindly fill in every field on the form");}else{
		
      axios.post(ip+"/add_term_iterations", querystring.stringify({ IterationDescription: this.state.IterationDescription}))
		.then((response) => {
		  
		  alert(response.data.results.message);
		  
		  this.setState({
          ...this.state,
          IterationDescription: ''
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
                  <CardTitle tag="h4">Term Iterations</CardTitle>
                </CardHeader>
                <CardBody>
                  <Form className="form-horizontal" >
                    <Row>
                      <Label md="3">Name</Label>
                      <Col md="9">
                        <FormGroup>
                          <Input placeholder="E.g First Term/Semester" type="text" name="IterationDescription" value={this.state.IterationDescription} type="text" onChange={this.handleChange} autofocus />
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

export default TermIterationsConfig;