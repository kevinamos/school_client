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



class SelectCurriculum extends React.Component {
constructor(props) {
    super(props);
this.state = {

      SelectedCurriculum:'',
	  CurriculaLevels:[],
	  SelectedCurriculumLevel:'',
	  IsCurriculumSet:false,
	
      Curricula:[
		 
		 {label:"8-4-4",value:"1"},
		 {label:"2-6-3-3-3",value:"2"},
		
		],
		
	  EightFourFourLevels:[
	  
	    {label:"Primary",value:"1.1"},
		{label:"Secondary",value:"1.2"}
	  
	  ],
	  
	  
	  NewKenyanCurriculumLevels:[
	  
	     {label:"Primary",value:"2.1"},
		 {label:"Secondary",value:"2.2"}
	  
	  ],
	  
	  
	  
	 PrimaryClassLevels:[
	 
	    {Name:"Pre-Kinder",Description:"4-year old pupils",HierarchyCode:"1"},
		{Name:"Pre-Care",Description:"5-year old pupils",HierarchyCode:"2"},
		{Name:"Pre-Unit",Description:"6-year old pupils",HierarchyCode:"3"},
		{Name:"Class 1",Description:"7-year old pupils",HierarchyCode:"4"},
		{Name:"Class 2",Description:"8-year old pupils",HierarchyCode:"5"},
		{Name:"Class 3",Description:"9-year old pupils",HierarchyCode:"6"},
		{Name:"Class 4",Description:"10-year old pupils",HierarchyCode:"7"},
		{Name:"Class 5",Description:"11-year old pupils",HierarchyCode:"8"},
		{Name:"Class 6",Description:"12-year old pupils",HierarchyCode:"9"},
		{Name:"Class 7",Description:"13-year old pupils",HierarchyCode:"10"},
		{Name:"Class 8",Description:"14-year old pupils",HierarchyCode:"11"},
	 
	 ],
	 
	 
	PrimarySubjects:[
	
	    {DepartmentName:"Mathematics Department",FieldCategoryId:"1",Field:"Mathematics",Subjects:[{Name:"Mathematics"}],Ref:"MAT",GradeRef:"MAT_GRADE"},
		{DepartmentName:"English Department",FieldCategoryId:"3",Field:"English",Subjects:[{Name:"English Gramar"},{Name:"English Composition"}],Ref:"ENG",GradeRef:"ENG_GRADE"},
		{DepartmentName:"Kiswahili Department",FieldCategoryId:"3",Field:"Kiswahili",Subjects:[{Name:"Kiswahili Lugha"},{Name:"Kiswahili Insha"}],Ref:"KIS",GradeRef:"KIS_GRADE"},
		{DepartmentName:"Science Department",FieldCategoryId:"2",Field:"Science",Subjects:[{Name:"Science"}],Ref:"SCI",GradeRef:"SCI_GRADE"},
		{DepartmentName:"Social Studies/CRE/IRE Department",FieldCategoryId:"4",Field:"Social Studies/CRE/IRE",Subjects:[{Name:"Social Studies"},{Name:"Christian Religious Education(CRE)"},{Name:"Islamic Religious Education(IRE)"}],Ref:"SOC",GradeRef:"SOC_GRADE"},
		
	
	],
	
	
	
	PrimaryDepartments:[
     {DepartmentTypeId:"1",DepartmentName:"Mathematics Department",DepartmentDescription:"This is a department for the Mathematics subject",DepartmentRefNo:"MD"},
	 {DepartmentTypeId:"1",DepartmentName:"Kiswahili Department",DepartmentDescription:"This is a department for the Kiswahili subject",DepartmentRefNo:"KD"},
	 {DepartmentTypeId:"1",DepartmentName:"English Department",DepartmentDescription:"This is a department for the English subject",DepartmentRefNo:"ED"},
	 {DepartmentTypeId:"1",DepartmentName:"Science Department",DepartmentDescription:"This is a department for the Science subject",DepartmentRefNo:"ScD"},
	 {DepartmentTypeId:"1",DepartmentName:"Social Studies/CRE/IRE Department",DepartmentDescription:"This is a department for the Social Studies/CRE/IRE subject",DepartmentRefNo:"SCID"}
  
  
  ],
	
	
	
   SecondaryClassLevels:[
   
       {Name:"Form 1",Description:"15-year old students",HierarchyCode:"1"},
	   {Name:"Form 2",Description:"16-year old students",HierarchyCode:"2"},
	   {Name:"Form 3",Description:"17-year old students",HierarchyCode:"3"},
	   {Name:"Form 4",Description:"18-year old students",HierarchyCode:"4"}
   
   ],
   
   
   
  SecondarySubjects:[
  
      {DepartmentName:"Mathematics Department",FieldCategoryId:"1",Field:"Mathematics",Subjects:[{Name:"Mathematics Paper 1"},{Name:"Mathematics Paper 2"}],Ref:"MAT",GradeRef:"MAT_GRADE"},
	  {DepartmentName:"English Department",FieldCategoryId:"3",Field:"English",Subjects:[{Name:"English Paper 1"},{Name:"English Paper 2"},{Name:"English Literature"}],Ref:"ENG",GradeRef:"ENG_GRADE"},
	  {DepartmentName:"Kiswahili Department",FieldCategoryId:"3",Field:"Kiswahili",Subjects:[{Name:"Kiswahili Paper 1"},{Name:"Kiswahili Paper 2"},{Name:"Kiswahili Fasihi"}],Ref:"KIS",GradeRef:"KIS_GRADE"},
	  {DepartmentName:"Physics Department",FieldCategoryId:"2",Field:"Physics",Subjects:[{Name:"Physics Paper 1"},{Name:"Physics Paper 2"},{Name:"Physics Practicals"}],Ref:"PHYC",GradeRef:"PHYC_GRADE"},
	  {DepartmentName:"Chemistry Department",FieldCategoryId:"2",Field:"Chemistry",Subjects:[{Name:"Chemistry Paper 1"},{Name:"Chemistry Paper 2"},{Name:"Chemistry Practicals"}],Ref:"CHEM",GradeRef:"CHEM_GRADE"},
	  {DepartmentName:"Biology Department",FieldCategoryId:"2",Field:"Biology",Subjects:[{Name:"Biology Paper 1"},{Name:"Biology Paper 2"},{Name:"Biology Practicals"}],Ref:"BIO",GradeRef:"BIO_GRADE"},
	  {DepartmentName:"Geography Department",FieldCategoryId:"4",Field:"Geography",Subjects:[{Name:"Geography Paper 1"},{Name:"Geography Paper 2"}],Ref:"GEO",GradeRef:"GEO_GRADE"},
	  {DepartmentName:"History Department",FieldCategoryId:"4",Field:"History",Subjects:[{Name:"History Paper 1"},{Name:"History Paper 2"}],Ref:"HIST",GradeRef:"HIST_GRADE"},
	  {DepartmentName:"CRE  Department",FieldCategoryId:"4",Field:"Christian Religious Education(CRE)",Subjects:[{Name:"CRE Paper 1"},{Name:"CRE Paper 2"}],Ref:"CRE",GradeRef:"CRE_GRADE"},
	  {DepartmentName:"Agriculture  Department",FieldCategoryId:"5",Field:"Agriculture",Subjects:[{Name:"Agriculture Paper 1"},{Name:"Agriculture Paper 2"},{Name:"Agriculture Practicals"}],Ref:"AGRIC",GradeRef:"AGRIC_GRADE"},
	  {DepartmentName:"Business Studies  Department",FieldCategoryId:"5",Field:"Business Studies",Subjects:[{Name:"Business Studies Paper 1"},{Name:"Business Studies Paper 2"},{Name:"Business Studies Paper 3"}],Ref:"BUST",GradeRef:"BUST_GRADE"},
	  {DepartmentName:"French  Department",FieldCategoryId:"5",Field:"French",Subjects:[{Name:"French Paper 1"},{Name:"French Paper 2"},{Name:"French Paper 3"}],Ref:"FRE",GradeRef:"FRE_GRADE"},
	  {DepartmentName:"Computer Studies  Department",FieldCategoryId:"5",Field:"Computer Studies",Subjects:[{Name:"Computer Studies Paper 1"},{Name:"Computer Studies Paper 2"},{Name:"Computer Studies Practicals"}],Ref:"COMP",GradeRef:"COMP_GRADE"},
	  {DepartmentName:"Home Science  Department",FieldCategoryId:"5",Field:"Home Science",Subjects:[{Name:"Home Science Paper 1"},{Name:"Home Science Paper 2"},{Name:"Home Science Practicals"}],Ref:"HSCI",GradeRef:"HSCI_GRADE"},
	  {DepartmentName:"Music Department",FieldCategoryId:"5",Field:"Music",Subjects:[{Name:"Music Paper 1"},{Name:"Music Paper 2"},{Name:"Music Practicals"}],Ref:"MUSC",GradeRef:"MUSC_GRADE"}
  
  ],
  
  SecondaryDepartments:[
  
     {DepartmentTypeId:"1",DepartmentName:"Mathematics Department",DepartmentDescription:"This is a department for the Mathematics subject",DepartmentRefNo:"MD"},
	 {DepartmentTypeId:"1",DepartmentName:"English Department",DepartmentDescription:"This is a department for the English subject",DepartmentRefNo:"ED"},
	 {DepartmentTypeId:"1",DepartmentName:"Kiswahili Department",DepartmentDescription:"This is a department for the Kiswahili subject",DepartmentRefNo:"KD"},
	 {DepartmentTypeId:"1",DepartmentName:"Physics Department",DepartmentDescription:"This is a department for the Physics subject",DepartmentRefNo:"PD"},
	 {DepartmentTypeId:"1",DepartmentName:"Chemistry Department",DepartmentDescription:"This is a department for the Chemistry subject",DepartmentRefNo:"CD"},
	 {DepartmentTypeId:"1",DepartmentName:"Biology Department",DepartmentDescription:"This is a department for the Biology subject",DepartmentRefNo:"BD"},
	 {DepartmentTypeId:"1",DepartmentName:"Geography Department",DepartmentDescription:"This is a department for the Geography subject",DepartmentRefNo:"GD"},
	 {DepartmentTypeId:"1",DepartmentName:"History Department",DepartmentDescription:"This is a department for the History subject",DepartmentRefNo:"HD"},
	 {DepartmentTypeId:"1",DepartmentName:"CRE  Department",DepartmentDescription:"This is a department for the CRE subject",DepartmentRefNo:"CRED"},
	 {DepartmentTypeId:"1",DepartmentName:"Agriculture  Department",DepartmentDescription:"This is a department for the Agriculture subject",DepartmentRefNo:"AgD"},
	 {DepartmentTypeId:"1",DepartmentName:"Business Studies  Department",DepartmentDescription:"This is a department for the Business Studies subject",DepartmentRefNo:"BSD"},
	 {DepartmentTypeId:"1",DepartmentName:"French  Department",DepartmentDescription:"This is a department for the French subject",DepartmentRefNo:"FrD"},
	 {DepartmentTypeId:"1",DepartmentName:"Computer Studies  Department",DepartmentDescription:"This is a department for the Computer Studies subject",DepartmentRefNo:"CSD"},
	 {DepartmentTypeId:"1",DepartmentName:"Home Science  Department",DepartmentDescription:"This is a department for the Home Science subject",DepartmentRefNo:"HSD"},
	 {DepartmentTypeId:"1",DepartmentName:"Music Department",DepartmentDescription:"This is a department for the Music subject",DepartmentRefNo:"MuD"}
  
  ]
  
		
		
};

      
	  this.handleSubmit = this.handleSubmit.bind(this);
	  this.handleChange = this.handleChange.bind(this);
	  this.handleCurriculumDropDownChanged = this.handleCurriculumDropDownChanged.bind(this);
	  this.setCurriculumLevels = this.setCurriculumLevels.bind(this);
	  this.insertAcademicClassLevels = this.insertAcademicClassLevels.bind(this);
	  this.getDepartmentName = this.getDepartmentName.bind(this);
	  this.configureDepartments = this.configureDepartments.bind(this);
	  this.insertFields = this.insertFields.bind(this);
	  this.insertSubjects = this.insertSubjects.bind(this);
	  this.getFieldNames = this.getFieldNames.bind(this);
	  this.configureDb = this.configureDb.bind(this);
	  this.checkIfCurriculumAlreadyConfigured = this.checkIfCurriculumAlreadyConfigured.bind(this);
	  this.proceedWithCurriculumEnvironmentSetup = this.proceedWithCurriculumEnvironmentSetup.bind(this);
	  
	  
	  
  }

  componentWillMount(){
	  
	  
	  
      var StaffNo=window.sessionStorage.getItem("StaffNo");
	  
	  if(StaffNo===null){this.props.history.push('/student_admin_login');}else{
    
		  
	  }  

  }
	
	handleSubmit(event){ 
      event.preventDefault();
	
	   this.checkIfCurriculumAlreadyConfigured(event);
		
		
 }
   
   
   
   
   
   
   proceedWithCurriculumEnvironmentSetup(event){
   
   
        if(this.state.SelectedCurriculum===""||this.state.SelectedCurriculumLevel===""){alert("Kindly fill in every field on the form");}else if(this.state.IsCurriculumSet){
		
		   alert("This operation is a system configuration operation and can only be performed once.\n\nHowever, if you wish to proceed with the operation, kindly contact the system's engineer(silas.onyango93@gmail.com)");
		
		}else{
		
				if(this.state.SelectedCurriculum.value==="1" && this.state.SelectedCurriculumLevel.value==="1.1"){
				
					     this.configureDepartments(this.state.PrimaryDepartments,this.state.PrimarySubjects);
						 
		                 this.insertAcademicClassLevels(this.state.PrimaryClassLevels);
		  
		                 this.configureDb(1,1.1);
		                 
		  
		                     
	
					  
				}else if(this.state.SelectedCurriculum.value==="1" && this.state.SelectedCurriculumLevel.value==="1.2"){
				
				         this.configureDepartments(this.state.SecondaryDepartments,this.state.SecondarySubjects);
						 
		                 this.insertAcademicClassLevels(this.state.SecondaryClassLevels);
		  
		                 this.configureDb(1,1.2);
				
				      
				}					   
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
	
	
	
	





    
	
	
	handleCurriculumDropDownChanged(value){
      
	  this.setState({SelectedCurriculum: value}, () => { 
	  
	      this.setCurriculumLevels();
    
      });
	   
	   
   
    }
	
	
	
	
	
	setCurriculumLevels(){
	
	   if(this.state.SelectedCurriculum.value==="1"){
	   
	       this.setState({
                      ...this.state,
                         CurriculaLevels: this.state.EightFourFourLevels
		                 
                    });
	   
	   }else if(this.state.SelectedCurriculum.value==="2"){
	   
	      this.setState({
                      ...this.state,
                         CurriculaLevels: this.state.NewKenyanCurriculumLevels
		                 
                    });
	   
	   }
	
	}
	
	
	
	insertAcademicClassLevels(AcademicClassLevels){
	   
	   AcademicClassLevels.forEach((item) => {
	   
	   axios.post(ip+"/add_academic_class_levels", querystring.stringify({ AcademicClassLevelName: item.Name,
																          AcademicClassLevelDescription: item.Description,
																		  HierarchyCode: item.HierarchyCode}))
		.then((response) => {
		  
		  
		  
		  
    
    } )
     .catch((response) => {
        //handle error
        console.log(response);
      });
	
	
	  });
	  
	}
	
	
	
	
	getDepartmentName(DepartmentId,Departments,Subjects){
	  
	   
	   axios.post(ip+"/get_specific_departments", querystring.stringify({ column_name: "DepartmentId",
															              search_value: DepartmentId}))
		.then((response) => {
        
		  
		  this.insertFields(DepartmentId,response.data.results[0].DepartmentName,Departments,Subjects);
		  
		  
      })
	  .then((response) => {
        
		  
		  this.getFieldIds();
		  
		  
      })
     .catch((response) => {
        //handle error
        console.log(response);
      }); 
		
	
	  
	}
	
	
	
	
	insertFields(DepartmentId,DepartmentName,Departments,Subjects){
	
    Subjects.forEach((item) => {
	    
	   if(item.DepartmentName===DepartmentName){
	   
	    axios.post(ip+"/add_fields_", querystring.stringify({FieldCategoryId: item.FieldCategoryId,
															DepartmentId: DepartmentId,
															FieldName: item.Field,
															FieldDescription: item.Ref,
															GradeRef: item.GradeRef}))
		.then((response) => {
        
		   this.getFieldNames(response.data.results.recordId,Departments,Subjects);
		  
		  
		  
    } )
     .catch((response) => {
        //handle error
        console.log(response);
      });
	  
	  }
	 });
	
	}
	
	
	
	
	getFieldNames(FieldId,Departments,Subjects){
	  
	
	    axios.post(ip+"/get_specific_fields_", querystring.stringify({ column_name: "fieldId",
															           search_value: FieldId}))
		.then((response) => {
        
		  
		  
		  
		  this.insertSubjects(FieldId,response.data.results[0].FieldName,Departments,Subjects);
		  
		  
    } )
     .catch((response) => {
        //handle error
        console.log(response);
      }); 
	
	
	
	
	}
	
	
	
	insertSubjects(FieldId,FieldName,Departments,Subjects){
	
	      
		  Subjects.forEach((item) => {
		   
		    if(item.Field===FieldName){
		  
		item.Subjects.forEach((subject_item) => {
	  
	  axios.post(ip+"/add_subjects", querystring.stringify({ FieldId: FieldId,
															 SubjectName: subject_item.Name,
															 SubjectDescription: subject_item.Name,
															 SubjectRefNo: subject_item.Name}))
		.then((response) => {
        
		  
		  
		  
		  
    } )
     .catch((response) => {
        //handle error
        console.log(response);
      });
	
	});
	
	
	}});
	
	
	}
	
	
	
	configureDepartments(Departments,Subjects){
	
	    
	    //First axios for Departments
		Departments.forEach((item) => {
		axios.post(ip+"/add_departments", querystring.stringify({ DepartmentTypeId: item.DepartmentTypeId,
															    DepartmentName: item.DepartmentName,
															    DepartmentDescription: item.DepartmentDescription,
															    DepartmentRefNo: item.DepartmentRefNo}))
		.then((response) => {
        
		
		this.getDepartmentName(response.data.results.recordId,Departments,Subjects);
		
    } )
     .catch((response) => {
        //handle error
        console.log(response);
      });
		
	  });
	  
	  
	
	}
	
	
	
	
	
	
	configureDb(IsCurriculumSet,Curriculum){
	
	   axios.post(ip+"/update_individual_curriculum_config_table", querystring.stringify({ IsCurriculumSet: IsCurriculumSet,
																                           Curriculum: Curriculum,
																						   ColumnName: "id",
																		                   ColumnValue: "1"}))
		.then((response) => {
		  
		   alert("The Selected curriculum's environment is ready");
		  
		  } )
     .catch((response) => {
        //handle error
        console.log(response);
      });
	
	}
	
	
	
	
	
	
	checkIfCurriculumAlreadyConfigured(event){
	    
	
	    axios.post(ip+"/get_specific_curriculum_config_table", querystring.stringify({ column_name: "id",
																		               search_value: "1"}))
		.then((response) => {
		  
		  if(response.data.results[0].IsCurriculumSet===1){
		  
		  
		      this.setState({IsCurriculumSet: true}, () => { 
	  
	              //
    
	              this.proceedWithCurriculumEnvironmentSetup(event);
				  
               });
			   
			   
		  }else{this.proceedWithCurriculumEnvironmentSetup(event);}
		   
		  
		  } )
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
                  <CardTitle tag="h4">Select Curriculum</CardTitle>
                </CardHeader>
                <CardBody>
                  <Form className="form-horizontal" >
		
		            <Row>
                      <Label md="3">Curriculum</Label>
                      <Col md="9">
                        <FormGroup>
		            <Select
                            className="react-select info"
                            classNamePrefix="react-select"
                            placeholder="Select Curriculum"
                            name="SelectCurriculum"
                            closeMenuOnSelect={false}
                            value={this.state.SelectedCurriculum}
							onChange={this.handleCurriculumDropDownChanged}
                            options={this.state.Curricula}
                          />
		            </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Label md="3">Level</Label>
                      <Col md="9">
                        <FormGroup>
		            <Select
                            className="react-select info"
                            classNamePrefix="react-select"
                            placeholder="Select Curriculum Level"
                            name="SelectStudentType"
                            closeMenuOnSelect={false}
                            value={this.state.SelectedCurriculumLevel}
                            onChange={value =>
                              this.setState({
                              ...this.state,
                                      SelectedCurriculumLevel: value
                              })
	  
                            }
                            options={this.state.CurriculaLevels}
                          />
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

export default SelectCurriculum;