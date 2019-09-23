import React from "react";

import UnsubmittedResultsTableRow from "./UnsubmittedResultsTableRow.jsx";
import UnsubmittedResultsTableHeader from "./UnsubmittedResultsTableHeader.jsx";
import axios from "axios";
import querystring from "querystring";
import ip from "../../common/EndPoints.js";


class UnsubmittedResultsTable extends React.Component {
  constructor(props) {
    super(props);

	 
	 this.state = {
        
		
		UnsubmittedMarks: []
		
		
    };
	 
	 
	 
  }
	
   
   
   
   
  componentWillMount(){
     
	 var UnsubmittedMarks=this.props.location.state.UnsubmittedMarks;
	 
	 var counter=1;
	 UnsubmittedMarks.forEach((item) => {
		
		     item["counter"] = counter;
			 counter++;
		
		});
	 
	 this.setState({
          ...this.state,
          UnsubmittedMarks: UnsubmittedMarks
		  
        });
  
   } 
   
  
  render() {
    return (
      <div class="row">
        <div class="col-lg-12">
          <div class="panel panel-default">
            <div class="panel-heading"><h4>Unsubmitted Marks</h4></div>

            <div class="panel-body">
              <table
                width="100%"
                class="table table-striped table-bordered table-hover"
                id="dataTables-example"
		        
              >
                <tbody>
		        <UnsubmittedResultsTableHeader />
                  {this.state.UnsubmittedMarks.map((person, i) => (
                    <UnsubmittedResultsTableRow key={i} data={person} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default UnsubmittedResultsTable;