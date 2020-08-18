import React,{Component} from 'react'
import jwt_decode from 'jwt-decode'
import {connect} from 'react-redux'
import {updateStudent, studentDetail, deleteStudent, studentBillDetail, getClassBill, updateStudentBill, deleteStudentBill} from '../actions/candidateAction'
import PropTypes from 'prop-types'
import axios from 'axios'
class EditStudent extends Component {
  state = {
    name:'',
    surname:'',
    clas:'',
    department:'',
    gender:'',
    religion:'',
    date:'',
    sog:'',
    lga:'',
    address:'',
    pname:'',
    psurname:'',
    email:'',
    number:'',
    paddress:'',
    classChange:false,
    amountPaid:''
  }
  handleChange=e=>{
    this.setState({[e.target.name]:e.target.value})
  }
  handleDepartment=e=>{
    this.setState({department:e.target.value})
  }
  handleDelete=()=>{
    this.props.deleteStudentBill(this.props.match.params.student_id)
    this.props.deleteStudent(this.props.match.params.student_id)
  }
  handleClass=e=>{
    this.setState({clas:e.target.value})
    this.props.getClassBill(e.target.value)
    const {debtor} = this.props.debtor
    if(debtor.clas===e.target.value){
      this.setState({classChange:false})
    }else{
      this.setState({classChange:true})
    }
  }

  handleSubmit=e=>{
    e.preventDefault()
    const {debtor} = this.props.debtor
    const {classBill} = this.props.classBill
    const decode = jwt_decode(localStorage.token)
    const student = {
      name:this.state.name,
      surname:this.state.surname,
      clas:this.state.clas,
      department:this.state.department,
      gender:this.state.gender,
      religion:this.state.religion,
      date:this.state.date,
      sog:this.state.sog,
      lga:this.state.lga,
      address:this.state.address,
      pname:this.state.pname,
      psurname:this.state.psurname,
      email:this.state.email,
      number:this.state.number,
      paddress:this.state.paddress,
      school_id:decode.school_id
    }
    this.props.updateStudent(this.props.match.params.student_id,student)
    const fees = (debtor.fees===classBill.fees)?(debtor.fees):(classBill.fees)
    const amountPaid = (debtor.fees===classBill.fees)?(debtor.amountPaid):(this.state.amountPaid)
    const studentBill = {
      clas:this.state.clas,
      amountPaid,
      fees,
      status:(amountPaid===fees)?'paid':'debtor',
      name:this.state.name,
      surname:this.state.surname
    }
    this.props.updateStudentBill(this.props.match.params.student_id, studentBill)
  }

componentDidMount() {
  this.props.studentDetail(this.props.match.params.student_id)
  axios.get('/student/'+this.props.match.params.student_id)
    .then(res=>{
      this.setState({
        name:res.data.name,
        surname:res.data.surname,
        clas:res.data.clas,
        department:res.data.department,
        gender:res.data.gender,
        religion:res.data.religion,
        date:res.data.date,
        sog:res.data.sog,
        lga:res.data.lga,
        address:res.data.address,
        pname:res.data.pname,
        psurname:res.data.psurname,
        email:res.data.email,
        number:res.data.number,
        paddress:res.data.paddress
      })
    })
    this.props.studentBillDetail(this.props.match.params.student_id)
}
  render(){
    const {student} = this.props.student
    return(
            <div class="main-content">
      <div class="row">
                  <div class="col-lg-9 mx-auto">
                  <div class="card">
                                   <div class="card-header">
                                       <strong>Student's</strong> Registeration Form
                                   </div>
                                   <form onSubmit={this.handleSubmit} class="form-horizontal">
                                   <div class="card-body card-block">

                                           <div class="row form-group">
                                               <div class="col col-md-3">
                                                   <label for="text-input" class=" form-control-label">Name</label>
                                               </div>
                                               <div class="col-12 col-md-9">
                                                   <input onChange={this.handleChange} value={this.state.name} type="text" id="text-input" name="name" placeholder="Enter Child's Name" class="form-control-sm form-control"/>
                                               </div>
                                           </div>
                                           <div class="row form-group">
                                               <div class="col col-md-3">
                                                   <label for="text-input" class=" form-control-label">Surname</label>
                                               </div>
                                               <div class="col-12 col-md-9">
                                                   <input onChange={this.handleChange} value={this.state.surname} type="text" id="text-input" name="surname" placeholder="Enter Child's Surname" class="form-control-sm form-control"/>
                                               </div>
                                           </div>
                                           <div class="row form-group">
                                               <div class="col col-md-3">
                                                   <label for="text-input" class=" form-control-label">Date Of Birth</label>
                                               </div>
                                               <div class="col-12 col-md-9">
                                                   <input onChange={this.handleChange} value={this.state.date} type="date" id="text-input" name="date" class="form-control-sm form-control"/>
                                               </div>
                                           </div>


                                           <div class="row form-group">
                                               <div class="col col-md-3">
                                                   <label for="selectSm" class=" form-control-label">Class</label>
                                               </div>
                                               <div class="col-12 col-md-9">
                                                   <select name="clas" onChange={this.handleClass} value={this.state.clas} id="SelectLm" class="form-control-sm form-control">
                                                       <option>Please select</option>
                                                       <option>Creche</option>
                                                       <option>KG1</option>
                                                       <option>KG2</option>
                                                       <option>NUR1</option>
                                                       <option>NUR2</option>
                                                       <option>Basic1</option>
                                                       <option>Basic2</option>
                                                       <option>Basic3</option>
                                                       <option>Basic4</option>
                                                       <option>Basic5</option>
                                                       <option>Jss1</option>
                                                       <option>Jss2</option>
                                                       <option>Jss3</option>
                                                       <option>Sss1</option>
                                                       <option>Sss2</option>
                                                       <option>Sss3</option>
                                                   </select>
                                               </div>
                                           </div>
                                           {
                                             (this.state.classChange===false)?(<div></div>):(
                                               <div>
                                               <div className='alert alert-info'>{this.state.name}'s class has Changed <br/>
                                                Please Input the amount paid before or after resuming into {this.state.clas}
                                               </div>
                                               <div class="row form-group">
                                                   <div class="col col-md-3">
                                                       <label for="text-input" class=" form-control-label">School Fee Paid (#)</label>
                                                   </div>
                                                   <div class="col-12 col-md-9">
                                                       <input onChange={this.handleChange} placeholder='Amount Paid During Registration' type="number" id="text-input" name="amountPaid" class="form-control"/>
                                                   </div>
                                               </div>
                                               </div>
                                             )
                                           }
                                           {
                                             (student.clas==='Sss1'||student.clas==='Sss2'||student.clas==='Sss3')?(
                                               <div class="row form-group">
                                                   <div class="col col-md-3">
                                                       <label for="selectSm" class=" form-control-label">Department</label>
                                                   </div>
                                                   <div class="col-12 col-md-9">
                                                       <select onChange={this.handleDepartment} value={this.state.department} name="department" id="SelectLm" class="form-control-sm form-control">
                                                           <option>Please select</option>
                                                           <option>Science</option>
                                                           <option>Commercial</option>
                                                           <option>Art</option>
                                                       </select>
                                                   </div>
                                               </div>
                                             ):(
                                               <div></div>
                                             )
                                           }

                                           <div class="row form-group">
                                               <div class="col col-md-3">
                                                   <label class=" form-control-label">Gender</label>
                                               </div>
                                               <div class="col col-md-9">
                                               {
                                                 (student.gender==='male')?(
                                                   <div class="form-check">

                                                   <div class="radio">
                                                   <label for="radio1" class="form-check-label ">
                                                   <input onChange={this.handleChange}  type="radio" id="radio1" name="gender" value="Male" checked class="form-check-input"/> Male
                                                   </label>
                                                   </div>
                                                   <div class="radio">
                                                   <label for="radio2" class="form-check-label ">
                                                   <input onChange={this.handleChange} type="radio" id="radio2" name="gender" value="Female" class="form-check-input"/> Female
                                                   </label>
                                                   </div>

                                                   </div>
                                                 ):(
                                                   <div class="form-check">

                                                   <div class="radio">
                                                   <label for="radio1" class="form-check-label ">
                                                   <input onChange={this.handleChange} type="radio" id="radio1" name="gender" value="Male" class="form-check-input"/> Male
                                                   </label>
                                                   </div>
                                                   <div class="radio">
                                                   <label for="radio2" class="form-check-label ">
                                                   <input onChange={this.handleChange}  type="radio" id="radio2" name="gender" value="Female" checked class="form-check-input"/> Female
                                                   </label>
                                                   </div>

                                                   </div>
                                                 )
                                               }
                                               </div>
                                           </div>
                                           <div class="row form-group">
                                               <div class="col col-md-3">
                                                   <label class=" form-control-label">Religion</label>
                                               </div>
                                               <div class="col col-md-9">
                                               {
                                                 (student.religion==='Islam')?(
                                                   <div class="form-check">
                                                       <div class="radio">
                                                           <label for="radio1" class="form-check-label ">
                                                               <input onChange={this.handleChange} checked type="radio" id="radio1" name="religion" value="Islam" class="form-check-input"/> Islam
                                                           </label>
                                                       </div>
                                                       <div class="radio">
                                                           <label for="radio2" class="form-check-label ">
                                                               <input onChange={this.handleChange}  type="radio" id="radio2" name="religion" value="Christianity" class="form-check-input"/> Christianity
                                                           </label>
                                                       </div>

                                                   </div>
                                                 ):(
                                                   <div class="form-check">
                                                       <div class="radio">
                                                           <label for="radio1" class="form-check-label ">
                                                               <input onChange={this.handleChange}  type="radio" id="radio1" name="religion" value="Islam" class="form-check-input"/> Islam
                                                           </label>
                                                       </div>
                                                       <div class="radio">
                                                           <label for="radio2" class="form-check-label ">
                                                               <input onChange={this.handleChange} checked  type="radio" id="radio2" name="religion" value="Christianity" class="form-check-input"/> Christianity
                                                           </label>
                                                       </div>

                                                   </div>
                                                 )
                                               }

                                               </div>
                                           </div>
                                           <div class="row form-group">
                                               <div class="col col-md-3">
                                                   <label for="text-input" class=" form-control-label">State Of Origin</label>
                                               </div>
                                               <div class="col-12 col-md-9">
                                                   <input onChange={this.handleChange} value={this.state.sog} placeholder='Enter State Of Origin' type="text" id="text-input" name="sog" class="form-control-sm form-control"/>
                                               </div>
                                           </div>
                                           <div class="row form-group">
                                               <div class="col col-md-3">
                                                   <label for="text-input" class=" form-control-label">Local Government Area</label>
                                               </div>
                                               <div class="col-12 col-md-9">
                                                   <input onChange={this.handleChange} value={this.state.lga} placeholder='Enter Local Government Area' type="text" id="text-input" name="lga" class="form-control-sm form-control"/>
                                               </div>
                                           </div>
                                           <div class="row form-group">
                                               <div class="col col-md-3">
                                                   <label for="text-input" class=" form-control-label">Address</label>
                                               </div>
                                               <div class="col-12 col-md-9">
                                                   <input onChange={this.handleChange} value={this.state.address} placeholder='Enter Home Address' type="text" id="text-input" name="address" class="form-control-sm form-control"/>
                                               </div>
                                           </div>
                                           <div class="row form-group">
                                               <div class="col col-md-3">
                                                   <label for="text-input" class=" form-control-label">Guardian's Name</label>
                                               </div>
                                               <div class="col-12 col-md-9">
                                                   <input onChange={this.handleChange} value={this.state.pname} placeholder="Enter Guardian's Name" type="text" id="text-input" name="pname" class="form-control-sm form-control"/>
                                               </div>
                                           </div>
                                           <div class="row form-group">
                                               <div class="col col-md-3">
                                                   <label for="text-input" class=" form-control-label">Guardian's Surname</label>
                                               </div>
                                               <div class="col-12 col-md-9">
                                                   <input onChange={this.handleChange} value={this.state.psurname} placeholder="Enter Guardian's Surname" type="text" id="text-input" name="psurname" class="form-control-sm form-control"/>
                                               </div>
                                           </div>
                                           <div class="row form-group">
                                               <div class="col col-md-3">
                                                   <label for="text-input" class=" form-control-label">Guardian's Email Address</label>
                                               </div>
                                               <div class="col-12 col-md-9">
                                                   <input onChange={this.handleChange} value={this.state.email} placeholder="Enter Guardian's Email" type="text" id="text-input" name="email" class="form-control-sm form-control"/>
                                               </div>
                                           </div>
                                           <div class="row form-group">
                                               <div class="col col-md-3">
                                                   <label for="text-input" class=" form-control-label">Mobile Number</label>
                                               </div>
                                               <div class="col-12 col-md-9">
                                                   <input onChange={this.handleChange} value={this.state.number} placeholder="Enter Mobile Number" type="number" id="text-input" name="number" class="form-control-sm form-control"/>
                                               </div>
                                           </div>
                                           <div class="row form-group">
                                               <div class="col col-md-3">
                                                   <label for="text-input" class=" form-control-label">Guardian's Address</label>
                                               </div>
                                               <div class="col-12 col-md-9">
                                                   <input onChange={this.handleChange} value={this.state.paddress} placeholder="Enter Guardian's Address" type="text" id="text-input" name="paddress" class="form-control-sm form-control"/>
                                               </div>
                                           </div>

                                           </div>
                                   <div class="card-footer">
                                   <div className='row'>
                                     <div className='col'>
                                     <button type="submit" class="btn btn-outline-primary btn-sm btn-block">
                                         <i class="fa fa-dot-circle-o"></i> Submit
                                     </button>
                                     </div>
                                     <div className='col'>
                                     <button onClick={this.handleDelete} type="button" class="btn btn-outline-danger btn-sm btn-block">
                                         <i class="fa fa-times-circle"></i> Delete
                                     </button>
                                     </div>
                                   </div>

                                   </div>
                                   </form>
                               </div>
                               </div>
                               </div>
      </div>
    )
  }
}
EditStudent.propTypes = {
  studentDetail:PropTypes.func.isRequired,
  studentBillDetail:PropTypes.func.isRequired,
  debtor:PropTypes.object.isRequired,
  classBill:PropTypes.object.isRequired,
  getClassBill:PropTypes.func.isRequired
}
const mapStateToProps= state => {
    return{
      student:state.student,
      debtor:state.debtor,
      classBill:state.classBill
    }
};
export default connect(mapStateToProps,{updateStudent, studentDetail,deleteStudent, studentBillDetail, getClassBill,
   updateStudentBill, deleteStudentBill})(EditStudent)
