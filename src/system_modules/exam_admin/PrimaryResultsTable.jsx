import React from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import PrimaryResultsTableRow from "./PrimaryResultsTableRow.jsx";
import PrimaryResultsTableHeader from "./PrimaryResultsTableHeader.jsx";
import axios from "axios";
import querystring from "querystring";
import ip from "../../common/EndPoints.js";
import { CSVLink, CSVDownload } from "react-csv";



class PrimaryResultsTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
	 
	 FinalResults:[],
	 Results:[],
	 csvData : [
  ["firstname", "lastname", "email"],
  ["Ahmed", "Tomi", "ah@smthing.co.com"],
  ["Raed", "Labes", "rl@smthing.co.com"],
  ["Yezzi", "Min l3b", "ymin@cocococo.com"]
]
	
	};
    
	this.myRef = React.createRef(); 
  }
	
   
   
   
   
  componentWillMount(){
     
	 
	 
	 
	 
	 var ExamId=this.props.location.state.ExamId;
	 var AcademicClassLevelId=this.props.location.state.AcademicClassLevelId;
	 
	 
	 axios.post(ip+"/get_results_for_a_particular_class_level", querystring.stringify({AcademicClassLevelId: AcademicClassLevelId,
                                                                                       ExamId: ExamId}))
		.then((response) => {
          
		  var TheFinalResults=response.data.results;
		  var counter=1;
	      TheFinalResults.forEach((item) => {
		
		     item["counter"] = counter;
			 counter++;
		
		});   
			
		this.setState({
          ...this.state,
          FinalResults: TheFinalResults
		  
        });
		  
		 
		  
        })
        
    
     .catch((response) => {
        //handle error
        console.log(response);
      });
	  
    
  
   } 
   
 
 
 
   printDocument() {
    const input = document.getElementById('divToPrint');
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'JPEG', 0, 0);
        // pdf.output('dataurlnewwindow');
        pdf.save("download.pdf");
      })
    ;
  }
 
 
 
 
	
  render() {
    return (
      <div class="row" >
	  
	  <CSVLink data={this.state.csvData}>Download me</CSVLink>;
        <div class="col-lg-12">
          <div class="panel panel-default">
            <div class="panel-heading col-lg-12" ><h6>Examination Results</h6></div>

            <div class="panel-body  col-lg-12" id="divToPrint">
              <table
			    onClick={this.printDocument}
                width="100%"
                class="table table-striped table-bordered table-hover"
                
		        
              >
                <tbody>
		        <PrimaryResultsTableHeader />
                  {this.state.FinalResults.map((person, i) => (
                    <PrimaryResultsTableRow key={i} data={person} />
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
export default PrimaryResultsTable;