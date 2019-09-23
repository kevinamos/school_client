import React from "react";
import TableRow from "./TableRow.js";
import TableHeader from "./TableHeader.js";
class Table extends React.Component {
  constructor(props) {
    super(props);

    this.state = { data: this.props.dataProps
	             };
    console.log(this.props.dataProp)
	  
	  
  }
	
   
 
   
   
	
  render() {
    return (
      <div class="row">
        <div class="col-lg-12">
          <div class="panel panel-default">
            <div class="panel-heading">Submit Marks</div>

            <div class="panel-body">
              <table
                width="100%"
                class="table table-striped table-bordered table-hover"
                id="dataTables-example"
		        
              >
                <tbody style={{margin:2}}>
		        <TableHeader />
                  {this.props.dataProp.map((person, i) => (
                    <TableRow key={i} data={person} />
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
export default Table;