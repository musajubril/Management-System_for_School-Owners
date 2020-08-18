import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {teacher_left} from '../actions/candidateAction'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
class Teacher_Left extends Component {

  componentDidMount() {
    this.props.teacher_left()
  }
  render(){
    const {teachers} = this.props.teachers
    const teachersList = (this.props.teachers.loading===false)?((teachers.length) ? (
            teachers.map(teacher => {
                return (
                  <tr className='odd' key={teacher.id}>
                  <td>
                  <div className='dropdown'>
                      <Link className='text-secondary nav-link dropdown-toggle' id='navbardrop' to='#' data-toggle='dropdown'>  {teacher.name}</Link>
                      <div className='dropdown-menu'>
                      <Link className='text-secondary dropdown-item' to={'/teacher/'+teacher.teacher_id}> view Teacher's Info</Link>
                      <Link to={'/editteacher/'+teacher.teacher_id} className='text-secondary dropdown-item'>Edit Teacher's Info</Link>
                      </div>
                  </div>
                  </td>
                  <td>{teacher.surname}</td>
                  <td>{teacher.gender}</td>
                  </tr>
                )
            })
        ) : (
                <tr class="odd"><td valign="top" colspan="6" class="dataTables_empty">No data available in table</td></tr>
            )):(<div className="spinner-border spinner-border-lg"></div>)
    return(
            <div class="main-content">
            <div class="card shadow">
    <div class="card-header py-3">
      <h4 class="m-0 font-weight-bold text-secondary">
       Teacher's List
       </h4>
    </div>
    <div class="card-body">
      <div class="table-responsive">
        <div class="row">
          <div class="col-sm-12">
            <table className='table table-bordered dataTable' id='dataTable' width='100%' cellspacing='0' role='grid' aria-describedby='dataTable_info'  >

              <thead>
                  <tr  role='row'>
                    <th className='sorting' tabindex='0' aria-controls='dataTable' rowspan='1' colspan='1' aria-label='Name: activate to sort column ascending'  > Name </th>
                    <th className='sorting' tabindex='0' aria-controls='dataTable' rowspan='1' colspan='1' aria-label='Surname: activate to sort column ascending'  > Surname</th>
                    <th className='sorting' tabindex='0' aria-controls='dataTable' rowspan='1' colspan='1' aria-label='Gender: activate to sort column ascending' > Gender</th>
                    </tr>
                </thead>
                <tfoot>
                  <tr>
                    <th rowspan='1' colspan='1'> Name </th>
                    <th rowspan='1' colspan='1'> Surname </th>
                    <th rowspan='1' colspan='1'> Gender </th>
                    </tr>
                </tfoot>
                <tbody>
                {teachersList}
                </tbody>
                </table>
            </div>
        </div>
        </div>
    </div>
    </div>
    </div>
    )
  }
}

Teacher_Left.propTypes = {
  teacher_left:PropTypes.func.isRequired,
  teachers:PropTypes.object.isRequired
}
const mapStateToProps= state => {
  return{
    teachers:state.teachers
  }
};
export default connect(mapStateToProps,{teacher_left})(Teacher_Left)
