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


class ResultsSyncInitiator extends React.Component {
constructor(props) {
    super(props);
    
   this.state = {
        Exams: [],
		Students:[],
		Classes:[],
		SelectedExam:'',
		Fields:'',
		CurrentCurriculum:''
		
		
		
    };

      
	  this.handleSubmit = this.handleSubmit.bind(this);
	  this.checkIfAllMarksBeenSubmitted = this.checkIfAllMarksBeenSubmitted.bind(this);
	  
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
	  
	  
	  
      var StaffNo=window.sessionStorage.getItem("StaffNo");
	  
	  if(StaffNo===null){this.props.history.push('/tuition_admin_login');}else{
  
//Get all current year's configured exams***************************************************************************************************************  
           var CurrentYear=new Date().getFullYear();
	  axios.post(ip+"/get_all_current_year_configured_exams_by_full_reference", querystring.stringify({TableTwo: "exam_types",
															                                           JoiningKeyOne: "ExamTypeId",
															                                           TableThree: "actual_terms",
																		                               JoiningKeyTwo: "ActualTermId",
															                                           TableFour: "term_iterations",
															                                           JoiningKeyThree: "TermIterationId",
																		                               SearchColumn: "Year",
                                                                                                       SearchValue: CurrentYear}))
		.then((response) => {
        
		  var my_json=response.data.results;
		 
		  var jsonArray=[];
		  var jsonObject= null;
		  var exam_by_full_reference="";
		  
		  my_json.forEach((item) => {
		  
		      exam_by_full_reference=item.ExamTypeDescription+"  -  ("+item.IterationDescription+" - "+item.Year+")";
            
			  jsonObject={value:item.ExamId,label:exam_by_full_reference}
			  jsonArray.push(jsonObject);
			  
        });
		    
		this.setState({
          ...this.state,
          Exams: jsonArray
		  
        });
		  
		 
		  
        })
        
    
     .catch((response) => {
        //handle error
        console.log(response);
      });
/***************************************************************************************************************************************************************	  
 Second axios to get all fields
 */
    axios.post(ip+"/get_all_fields_")
		.then((response) => {
        
		  
		 this.setState({
          ...this.state,
          Fields: response.data.results
		  
         });
		    
		
        })
        
    
     .catch((response) => {
        //handle error
        console.log(response);
      });
  
/*********************************************************************************************************************************************************************
Third axios to check current curriculum
*/  
  
    axios.post(ip+"/get_specific_curriculum_config_table", querystring.stringify({ column_name: "id",
																		           search_value: "1"}))
		.then((response) => {
		   var CurrentCurriculum=response.data.results[0].Curriculum;
		   this.setState({
          ...this.state,
          CurrentCurriculum: CurrentCurriculum
		  
         });
		  
		  } )
     .catch((response) => {
        //handle error
        console.log(response);
      });
/************************************************************************************************************************************************************************
Fourth axios for students
*/  
  
   axios.post(ip+"/get_all_students")
		.then((response) => {
		   
		   this.setState({
          ...this.state,
          Students: response.data.results
		  
         });
		  
		  } )
     .catch((response) => {
        //handle error
        console.log(response);
      });
 
 
 
/************************************************************************************************************************************************************************
Fifth axios for classes
*/  
  
   axios.post(ip+"/get_all_class_by_full_reference", querystring.stringify({ TableTwo: "academic_class_levels",
															                    JoiningKeyOne: "AcademicClassLevelId",
															                    TableThree: "class_streams",
															                    JoiningKeyTwo: "ClassStreamId"}))
		.then((response) => {
        
		 
		    
		this.setState({
          ...this.state,
          Classes: response.data.results
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
	  if(this.state.SelectedExam===""){alert("Kindly fill in every field on the form");}else{
		this.checkIfAllMarksBeenSubmitted();
		
		
	}	
		
 }
   
	
 
 
 
/*SON/2018-11-06 00:29 - DEVELOPMENT
This function checks all exam papers ensuring teachers have submitted all the marks
*/
 checkIfAllMarksBeenSubmitted(){
 
   axios.post(ip+"/get_any_unsubmitted_marks", querystring.stringify({ExamId: this.state.SelectedExam.value}))
		.then((response) => {
		  
		  
		    if(response.data.results.length===0){
			
			    this.createTableRowObjects();
			
			}else{
			
			          var UnsubmittedMarks=response.data.results;
					  
			          this.props.history.push({
                          pathname: '/unsubmitted_results_table',
                          state: {UnsubmittedMarks:UnsubmittedMarks}
                      })
			
			}
		  
		 
    
     })
     .catch((response) => {
        //handle error
        console.log(response);
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
	   alert("Examination results have be processed succesfully");
   
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
																				ValueOne: this.state.SelectedExam.value,
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
		                                                                                      ValueOne: this.state.SelectedExam.value,
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
																				                  ValueOne: this.state.SelectedExam.value,
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
      <div>
		<Row style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
		 <Col md="6">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Process Results</CardTitle>
                </CardHeader>
                <CardBody>
                  <Form className="form-horizontal" >
				    
					<Row>
                      <Label md="3">Exam</Label>
                      <Col md="9">
                        <FormGroup>
		            <Select
                            className="react-select info"
                            classNamePrefix="react-select"
                            placeholder="Select Exam"
                            name="SelectExam"
                            closeMenuOnSelect={false}
                            value={this.state.SelectedExam}
                            onChange={value =>
                              this.setState({
                              ...this.state,
                                      SelectedExam: value
                              })
	  
                            }
                            options={this.state.Exams}
                          />
		            </FormGroup>
                      </Col>
                    </Row>
					<Row>
                    <Col md="3" />
                    <Col md="9">
                      <Button className="btn-round" style={{background:'red'}} type="submit" onClick={this.handleSubmit}>
                        Sync Results
                      </Button>
                    </Col>
                  </Row>
					
					
                  </Form>
                </CardBody>
                <CardFooter>
                  
                </CardFooter>
              </Card>
            </Col>
		</Row>
      
      </div>
    );
  }
}

export default ResultsSyncInitiator;