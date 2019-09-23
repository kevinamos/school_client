import React from "react";
import ResultsSyncedTableRow from "./ResultsSyncedTableRow.jsx";
import ResultsSyncedTableHeader from "./ResultsSyncedTableHeader.jsx";
import axios from "axios";
import querystring from "querystring";
import ip from "../../common/EndPoints.js";


class SyncResults extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
	   
	   
	   Fields:[],
	   Students:[],
	   Classes:[],
	   ExamId:'',
	   CurrentCurriculum:'',
	   FinalResults:[]
	
	
	
	
	};
    
	  
	 
	 
	 this.createTableRowObjects = this.createTableRowObjects.bind(this);
	 this.getAcademicClassLevelId = this.getAcademicClassLevelId.bind(this);
	 this.AssignGrade = this.AssignGrade.bind(this);
	 this.UpdateStudentsFieldResult = this.UpdateStudentsFieldResult.bind(this);
	 this.PrimaryAssignSumTotalMeanAndMeanGrade = this.PrimaryAssignSumTotalMeanAndMeanGrade.bind(this);
	 this.getMeanGrade = this.getMeanGrade.bind(this);
	 this.UpdateSumTotalAverageAndMeanGradeForTheStudent = this.UpdateSumTotalAverageAndMeanGradeForTheStudent.bind(this);
	 this.studentsAcademicClassLevel = this.studentsAcademicClassLevel.bind(this);
	 this.workoutParticularStudentsMean = this.workoutParticularStudentsMean.bind(this);
	 
	 
  }
	
   
   
   
   
  componentWillMount(){
  
     
	 var ExamId=this.props.location.state.ExamId;
	 var Fields=this.props.location.state.Fields;
	 var CurrentCurriculum=this.props.location.state.CurrentCurriculum;
	 var AllStudents=this.props.location.state.AllStudents;
	 var Classes=this.props.location.state.Classes;
	 
     var counter=1;
	 Classes.forEach((item) => {
		
		     item["counter"] = counter;
			 counter++;
		
		});
	 
	 this.setState({Fields:Fields,ExamId:ExamId,CurrentCurriculum:CurrentCurriculum,Students:AllStudents,Classes:Classes}, () => { 
	  
	        this.createTableRowObjects();
    
          });
	 
	 
	  
  
   } 
   
   
   
   

   
   
   
   
   
   
   createTableRowObjects(){
       var ResultsArray=[];
	   
	   
	   this.state.Students.forEach((student_item) => {
   
//Inside the student's forEach*************************************************************************************************************************   
   
       
	  
	   
       this.state.Fields.forEach((field_item) => {
	   
//Inside the fields's forEach*************************************************************************************************************************   	   
   
   
   
       axios.post(ip+"/get_a_specific_student_specific_subject_results", querystring.stringify({ AdmissionNo: student_item.AdmissionNo,
		                                                                                         FieldId: field_item.fieldId}))
		.then((response) => {
		  
		  var TotalFieldMarks=0;
		  
		  
		  response.data.results.forEach((subject_item) => {
		      
		      TotalFieldMarks=TotalFieldMarks+subject_item.Marks;
			  
		  
		  });
		  
		  
		  
		  
		 this.getAcademicClassLevelId(field_item.fieldId,student_item.AdmissionNo,TotalFieldMarks,field_item.FieldDescription,field_item.GradeRef);
    
    } )
     .catch((response) => {
        //handle error
        console.log(response);
      });
    
	
	
	
	
	
//Inside the fields's forEach*************************************************************************************************************************	
	
	});
	
	
	if(this.state.CurrentCurriculum===1.1){
	
	   this.PrimaryAssignSumTotalMeanAndMeanGrade(student_item.AdmissionNo);
	   
	
	}
	
	
	
//Inside the student's forEach*************************************************************************************************************************  	
   });
   
       //Sync Successful
   
   }
   
   
   
   
   getAcademicClassLevelId(FieldId,AdmissionNo,TotalFieldMarks,FieldDescription,GradeRef){
   
       axios.post(ip+"/get_a_specific_students_class_by_full_reference", querystring.stringify({ AdmissionNo: AdmissionNo}))
		.then((response) => {
		  
		 
	      
	      this.AssignGrade(FieldId,response.data.results[0].AcademicClassLevelId,AdmissionNo,TotalFieldMarks,FieldDescription,GradeRef);
    
   
    
    } )
     .catch((response) => {
        //handle error
        console.log(response);
      });
   
   }
   
   
   
   
   
   AssignGrade(FieldId,AcademicClassLevelId,AdmissionNo,TotalFieldMarks,FieldDescription,GradeRef){
   
        axios.post(ip+"/get_grade", querystring.stringify({ ColumnNameOne: "fieldId",
	                                                        ValueOne: FieldId,
															ColumnNameTwo: "AcademicClassLevelId",
															ValueTwo: AcademicClassLevelId,
															ValueThree: TotalFieldMarks,
															ColumnThree: "LowerBound",
		                                                    ColumnFour: "UpperBound"}))
		.then((response) => {
		  
		  
		     this.UpdateStudentsFieldResult(response.data.results[0].Grade,AdmissionNo,TotalFieldMarks,FieldDescription,GradeRef);
		  
		 
    
    } )
     .catch((response) => {
        //handle error
        console.log(response);
      });
   
   }
   
   
   
   
   
   
   UpdateStudentsFieldResult(Grade,AdmissionNo,TotalFieldMarks,FieldDescription,GradeRef){
   
   
        axios.post(ip+"/update_a_field_with_its_grade", querystring.stringify({ ColumnOneToBeSet: FieldDescription,
	                                                                            ValueOneToBeSet: TotalFieldMarks,
																				ColumnTwoToBeSet: GradeRef,
	                                                                            ValueTwoToBeSet: Grade,
																				ColumnOne: "ExamId",
																				ValueOne: this.state.ExamId,
																				ColumnTwo: "AdmissionNo",
		                                                                        ValueTwo: AdmissionNo}))
		.then((response) => {
		  
		  
		  
		  
		 
    
    } )
     .catch((response) => {
        //handle error
        console.log(response);
      });
   
   
   
   }
   
   
   
   
   
   
   
   PrimaryAssignSumTotalMeanAndMeanGrade(AdmissionNo){
   
         
		 
		 axios.post(ip+"/getAspecifRecordForAspecificStudentAndExam", querystring.stringify({ ColumnNameOne: "ExamId",
		                                                                                      ValueOne: this.state.ExamId,
																							  ColumnNameTwo: "AdmissionNo",
		                                                                                      ValueTwo: AdmissionNo}))
		.then((response) => {
		  
		  
		  var result_object=response.data.results[0];
		  
		  var SumTotal=result_object.MAT+result_object.ENG+result_object.KIS+result_object.SCI+result_object.SOC;
		  
		  
		  
		  this.workoutParticularStudentsMean(SumTotal,AdmissionNo);
		  
		 
    
    } )
     .catch((response) => {
        //handle error
        console.log(response);
      });
   
   
   }
   
   
   
   
   
   getMeanGrade(SumTotal,Average,AdmissionNo,AcademicClassLevelId){
   
       axios.post(ip+"/select_mean_grade_for_particular_mean_for_particular_class_level", querystring.stringify({ ColumnNameOne: "AcademicClassLevelId",
	                                                                                                              ValueOne: AcademicClassLevelId,
																												  ValueTwo: Average,
																												  ColumnTwo: "LowerBound",
		                                                                                                          ColumnThree: "UpperBound"}))
		.then((response) => {
		  
		  
		  
		    this.UpdateSumTotalAverageAndMeanGradeForTheStudent(response.data.results[0].MeanGrade,SumTotal,Average,AdmissionNo);
		 
    
    } )
     .catch((response) => {
        //handle error
        console.log(response);
      });
   
   }
   
   
   
   
   
   
   UpdateSumTotalAverageAndMeanGradeForTheStudent(MeanGrade,SumTotal,Average,AdmissionNo){
   
   
       axios.post(ip+"/update_a_row_with_sumtotal_average_and_meangrade", querystring.stringify({ ColumnOneToBeSet: "TOTAL",
	                                                                                              ValueOneToBeSet: SumTotal,
																				                  ColumnTwoToBeSet: "MEAN",
	                                                                                              ValueTwoToBeSet: Average,
																				                  ColumnThreeToBeSet: "MEAN_GRADE",
																								  ValueThreeToBeSet: MeanGrade,
																								  ColumnOne: "ExamId",
																				                  ValueOne: this.state.ExamId,
																				                  ColumnTwo: "AdmissionNo",
		                                                                                          ValueTwo: AdmissionNo}))
		.then((response) => {
		  
		  
		  
		  
		 
    
    } )
     .catch((response) => {
        //handle error
        console.log(response);
      });
   
   
   }
   
   
   
   
   
   
   studentsAcademicClassLevel(SumTotal,Average,AdmissionNo){
   
       axios.post(ip+"/get_a_specific_students_class_by_full_reference", querystring.stringify({ AdmissionNo: AdmissionNo}))
		.then((response) => {
		  
		  this.getMeanGrade(SumTotal,Average,AdmissionNo,response.data.results[0].AcademicClassLevelId);
		  
    
    
      })
     .catch((response) => {
        //handle error
        console.log(response);
      });
   
   }
   
   
   
   
   
   
   
   
 /*  getFinalResults(){
   
   
       axios.post(ip+"/get_final_results_for_particular_exam_and_class", querystring.stringify({ TableOne: "students",
															                                     JoiningKey: "AdmissionNo",
															                                     SearchColumnOne: "ClassId",
															                                     SearchValueOne: this.state.ClassId,
															                                     SearchColumnTwo: "ExamId",
		                                                                                         SearchValueTwo: this.state.ExamId}))
		.then((response) => {
		  
		  
		     this.setState({
                   ...this.state,
                     FinalResults:response.data.results
              });
		  
		 
    
    } )
     .catch((response) => {
        //handle error
        console.log(response);
      });
   
   
   }
   
   
   
 */  
   
   
  
  
  
  
  
  
  workoutParticularStudentsMean(SumTotal,AdmissionNo){
  
  
      axios.post(ip+"/get_a_students_Fields", querystring.stringify({ AdmissionNo: AdmissionNo}))
		.then((response) => {
            
			var NoOfSubjectsTakenByThisStudent=response.data.results.length;
			var Average=(SumTotal/NoOfSubjectsTakenByThisStudent);
		    
		    this.studentsAcademicClassLevel(SumTotal,Average,AdmissionNo);
		
        })
        
    
     .catch((response) => {
        //handle error
        console.log(response);
      });
  
  
  }
  
  
  
  
   
   
	
  render() {
    return (
      <div class="row">
        <div class="col-lg-12">
          <div class="panel panel-default">
            <div class="panel-heading"><h5>Results have been synced for the following classes</h5></div>

            <div class="panel-body">
              <table
                width="100%"
                class="table table-striped table-bordered table-hover"
                id="dataTables-example"
		        
              >
                <tbody>
		        <ResultsSyncedTableHeader />
                  {this.state.Classes.map((person, i) => (
                    <ResultsSyncedTableRow key={i} data={person} />
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
export default SyncResults;