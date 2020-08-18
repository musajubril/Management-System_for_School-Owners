import React,{Component} from 'react'
import {getStudents,getBill,getTeachers,getStudentBill} from '../actions/candidateAction'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
class Dashboard extends Component{
  componentDidMount() {
    this.props.getStudents()
    this.props.getBill()
    this.props.getTeachers()
    this.props.getStudentBill()
  }
  render(){
    const {students} = this.props.students
    const {studentBill} = this.props.studentBill
    const {teachers} = this.props.teachers
    const {bill} = this.props.bill
    const FEES = (bill.length) ? (bill.map(fee=>{
      return(
        <tr>
        <td>{fee.clas}</td>
        <td class="text-right">#{fee.fees}</td>
        </tr>
      )
    })):(<tr>
    <td colspan='2' className='text-center'>No data Available</td>
    </tr>)
    return(
      <div class="main-content">
      <div class="section__content section__content--p30">
      <div class="container-fluid">
      <div class="row">
      <div class="col-md-12">
      <div class="overview-wrap">
      <h2 class="title-1">Dashboard</h2>

      </div>
      </div>
      </div>
      <div class="row m-t-25">
      <div class="col-sm-6 col-lg-3">
      <div class="overview-item overview-item--c1">
      <div class="overview__inner">
      <div class="overview-box clearfix">
      <div class="icon">
      <i class="fa fa-users"></i>
      </div>
      <div class="text">
      <h2>{students.length}</h2>
      <span>Students</span>
      </div>
      </div>
      <div class="overview-chart">
      <canvas id="widgetChart1"></canvas>
      </div>
      </div>
      </div>
      </div>
      <div class="col-sm-6 col-lg-3">
      <div class="overview-item overview-item--c2">
      <div class="overview__inner">
      <div class="overview-box clearfix">
      <div class="icon">
      <i class="zmdi zmdi-account-o"></i>
      </div>
      <div class="text">
      <h2>{teachers.length}</h2>
      <span>Teachers</span>
      </div>
      </div>
      <div class="overview-chart">
      <canvas id="widgetChart2"></canvas>
      </div>
      </div>
      </div>
      </div>
      <div class="col-sm-6 col-lg-3">
      <div class="overview-item overview-item--c3">
      <div class="overview__inner">
      <div class="overview-box clearfix">
      <div class="icon">
      <i class="fa fa-times"></i>
      </div>
      <div class="text">
      <h2>{studentBill.length}</h2>
      <span>Debtors</span>
      </div>
      </div>
      <div class="overview-chart">
      <canvas id="widgetChart3"></canvas>
      </div>
      </div>
      </div>
      </div>
      <div class="col-sm-6 col-lg-3">
      <div class="overview-item overview-item--c4">
      <div class="overview__inner">
      <div class="overview-box clearfix">
      <div class="icon">
      <i class="zmdi zmdi-money"></i>
      </div>
      <div class="text">
      <h2>{students.length - studentBill.length}</h2>
      <span>Debts Free</span>
      </div>
      </div>
      <div class="overview-chart">
      <canvas id="widgetChart4"></canvas>
      </div>
      </div>
      </div>
      </div>
      </div>


      </div>
      </div>
      <div class="row">
      <div class="col-lg-9 mx-auto">
      <h2 class="title-1 m-b-25">Fees Per Class</h2>
      <div class="table-responsive table--no-card m-b-40">
      <table class="table table-borderless table-striped table-earning">
      <thead>
      <tr>
      <th>Class</th>
      <th class="text-right">price</th>
      </tr>
      </thead>
      <tbody>
      {FEES}
      </tbody>
      </table>
      </div>
      </div>
      </div>
      </div>

    )
  }
}
Dashboard.propTypes = {
  getStudents: PropTypes.func.isRequired,
  getBill: PropTypes.func.isRequired,
  getTeachers: PropTypes.func.isRequired,
  getStudentBill: PropTypes.func.isRequired,
  students:PropTypes.object.isRequired,
  teachers:PropTypes.object.isRequired,
  studentBill:PropTypes.object.isRequired,
  bill:PropTypes.object.isRequired
}
const mapStateToProps= state => {
  return{
    students: state.students,
    teachers: state.teachers,
    studentBill: state.studentBill,
    bill: state.bill
  }
}
export default connect(mapStateToProps,{getStudents,getBill,getTeachers,getStudentBill})(Dashboard)
