import React,{Component} from 'react'
import jwt_decode from 'jwt-decode'
import {connect} from 'react-redux'
import {updateTeacher, teacherDetail} from '../actions/candidateAction'
import PropTypes from 'prop-types'
import axios from 'axios'
class EditTeacher extends Component {
  state = {
    name:'',
    surname:'',
    clas:'',
    gender:'',
    address:'',
    email:'',
    number:''
  }
  handleChange=e=>{
    this.setState({[e.target.name]:e.target.value})
  }
  handleDelete=()=>{
    this.props.deleteTeacher(this.props.match.params.teacher_id)
  }
  handleSubmit=e=>{
    e.preventDefault()
    const decode = jwt_decode(localStorage.token)
    const teacher = {
      name:this.state.name,
      surname:this.state.surname,
      clas:this.state.clas,
      gender:this.state.gender,
      address:this.state.address,
      email:this.state.email,
      number:this.state.number,
      school_id:decode.school_id
    }
    this.props.updateTeacher(this.props.match.params.teacher_id,teacher)
  }

componentDidMount() {
  this.props.teacherDetail(this.props.match.params.teacher_id)
  axios.get('/teacher/'+this.props.match.params.teacher_id)
    .then(res=>{
      this.setState({
      name:res.data.name,
      surname:res.data.surname,
      clas:res.data.clas,
      gender:res.data.gender,
      address:res.data.address,
      email:res.data.email,
      number:res.data.number})
    })
}

UNSAFE_componentWillMount() {
  const {teacher} = this.props.teacher
  console.log(teacher)

}
  render(){
    const {teacher} = this.props.teacher
    return(
            <div class="main-content">
      <div class="row">
                  <div class="col-lg-9 mx-auto">
                  <div class="card">
                                   <div class="card-header">
                                       <strong>Teacher's</strong> Registeration Form
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
                                                   <label for="selectSm" class=" form-control-label">Class</label>
                                               </div>
                                               <div class="col-12 col-md-9">
                                                   <select name="clas" onChange={this.handleChange} value={this.state.clas} id="SelectLm" class="form-control-sm form-control">
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


                                           <div class="row form-group">
                                               <div class="col col-md-3">
                                                   <label class=" form-control-label">Gender</label>
                                               </div>
                                               <div class="col col-md-9">
                                               {
                                                 (teacher.gender==='male')?(
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
                                                   <label for="text-input" class=" form-control-label">Address</label>
                                               </div>
                                               <div class="col-12 col-md-9">
                                                   <input onChange={this.handleChange} value={this.state.address} placeholder='Enter Home Address' type="text" id="text-input" name="address" class="form-control-sm form-control"/>
                                               </div>
                                           </div>

                                           <div class="row form-group">
                                               <div class="col col-md-3">
                                                   <label for="text-input" class=" form-control-label">Email Address</label>
                                               </div>
                                               <div class="col-12 col-md-9">
                                                   <input onChange={this.handleChange} value={this.state.email} placeholder="Enter Email" type="text" id="text-input" name="email" class="form-control-sm form-control"/>
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
EditTeacher.propTypes = {
  teacherDetail:PropTypes.func.isRequired
}
const mapStateToProps= state => {
    return{
      teacher:state.teacher
    }
};
export default connect(mapStateToProps,{updateTeacher, teacherDetail})(EditTeacher)
