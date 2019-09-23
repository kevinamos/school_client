import React from 'react';
import { FaHeart } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';
import axios from "axios";
import querystring from "querystring";
class UnsubmittedResultsTableRow extends React.Component {
	
  constructor(props) {
    super(props);

	  
   }
	
	
   
	
	
   render() {
      return (
		  
         <tr>
            <td>{this.props.data.counter}</td>
			<td>{this.props.data.StaffFirstName+" "+this.props.data.StaffSurname}</td>
            <td>{this.props.data.FirstName+" "+this.props.data.Surname}</td>
            <td>{this.props.data.AdmissionNo}</td>
			<td>{this.props.data.AcademicClassLevelName+" "+this.props.data.ClassStreamName}</td>
			<td>{this.props.data.SubjectName}</td>
			
         </tr>
		  
            
      );
   }
}
export default UnsubmittedResultsTableRow;