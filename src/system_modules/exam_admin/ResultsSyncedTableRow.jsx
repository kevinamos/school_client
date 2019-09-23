import React from 'react';
import { FaHeart } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';
import axios from "axios";
import querystring from "querystring";
class ResultsSyncedTableRow extends React.Component {
	
  constructor(props) {
    super(props);

	  
   }
	
	
   
	
	
   render() {
      return (
		  
         <tr>
            <td>{this.props.data.counter}</td>
			<td>{this.props.data.AcademicClassLevelName+" "+this.props.data.ClassStreamName}</td>
			<td><FaHeart style={{color:'green'}} /></td>
			
         </tr>
		  
            
      );
   }
}
export default ResultsSyncedTableRow;