import React from 'react';
import { FaHeart } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';
import axios from "axios";
import querystring from "querystring";
import ip from "../../common/EndPoints.js";


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
  Button,
  Col
} from "reactstrap";

class TableRow extends React.Component {
	
  constructor(props) {
    super(props);


      this.state = {
        Marks: '',
		ButtonColour:'green'
		
    };

	  this.handleChange = this.handleChange.bind(this);
	  this.handleSubmit = this.handleSubmit.bind(this);
   }
	
	
   
   
   handleChange(event) {    
    let newState = this.state
    newState[event.target.name] = event.target.value
    let prop = event.target.name
        this.setState({
          ...newState     
        });
		
	}
	
   
   
   
   
   
   handleSubmit(event){ 
      event.preventDefault();
		
		if(this.state.Marks===""){alert("Kindly fill in the mark");}else{
		
      axios.post(ip+"/update_student_specific_exam_papers_marks", querystring.stringify({ Marks: this.state.Marks,
	                                                                                      IsMarkSubmited: "1",
	                                                                                      ColumnOne: "AdmissionNo",
																						  ValueOne: this.props.data.AdmissionNo,
																						  ColumnTwo: "ExamPaperId",
	                                                                                      ValueTwo: this.props.data.ExamPaperId}))
		.then((response) => {
		  
		  //alert(response.data.results.message);
		  
		  this.setState({
          ...this.state,
          ButtonColour: 'red'
          });
		 
    
    } )
     .catch((response) => {
        //handle error
        console.log(response);
      });
  
			
	}		
 }
   
   
   
   
	
	
   render() {
      return (
		  
         <tr>
		    <td>{this.props.data.counter}</td>
            <td>{this.props.data.AdmissionNo}</td>
            <td>{this.props.data.FirstName}</td>
			<td>{this.props.data.MiddleName}</td>
            <td>{this.props.data.Surname}</td>
			<td><Input placeholder={this.props.data.Marks} type="text" name="Marks" value={this.state.Marks} type="text" onChange={this.handleChange} autofocus /></td>
			<td><Button className="btn-round" style={{background:this.state.ButtonColour}} type="submit" onClick={this.handleSubmit}>Submit</Button></td>
         </tr>
		  
            
      );
   }
}
export default TableRow;