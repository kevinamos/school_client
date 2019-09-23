import React from 'react';
import { FaHeart } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';
import axios from "axios";
import querystring from "querystring";
class PrimaryResultsTableRow extends React.Component {
	
  constructor(props) {
    super(props);

	  
   }
	
	
   
	
	
   render() {
      return (
		  
         <tr>
		    <td>{this.props.data.counter}</td>
            <td>{this.props.data.AdmissionNo}</td>
            <td>{this.props.data.FirstName}</td>
            <td>{this.props.data.MiddleName}</td>
			<td>{this.props.data.MAT}</td>
			<td>{this.props.data.MAT_GRADE}</td>
			<td></td>
			<td>{this.props.data.ENG}</td>
			<td>{this.props.data.ENG_GRADE}</td>
			<td></td>
			<td>{this.props.data.KIS}</td>
			<td>{this.props.data.KIS_GRADE}</td>
			<td></td>
			<td>{this.props.data.SCI}</td>
			<td>{this.props.data.SCI_GRADE}</td>
			<td></td>
			<td>{this.props.data.SOC}</td>
			<td>{this.props.data.SOC_GRADE}</td>
			<td></td>
			<td>{this.props.data.TOTAL}</td>
			<td>{this.props.data.MEAN}</td>
			<td>{this.props.data.MEAN_GRADE}</td>
			
         </tr>
		  
            
      );
   }
}
export default PrimaryResultsTableRow;