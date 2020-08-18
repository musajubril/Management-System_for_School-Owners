import React, { Component } from 'react'
import PropTypes from 'prop-types'
import kR from '../unnamed.jpg'
import {connect} from 'react-redux'
import {studentBillDetail, updateStudentBill} from '../actions/candidateAction'
import {Link} from 'react-router-dom'
class Debtor extends Component {
  state={
    amountPaid:'',
    payment:false
  }
  componentDidMount() {
    this.props.studentBillDetail(this.props.match.params.student_id)

  }
handleChange=e=>{
  this.setState({
    amountPaid:e.target.value
  })
}
handleSubmit=e=>{
  e.preventDefault()
  const {debtor} = this.props.debtor

  const studentBill = {
    clas:debtor.clas,
    amountPaid:(Number(this.state.amountPaid)+Number(debtor.amountPaid)),
    fees:debtor.fees,
    status:((Number(this.state.amountPaid)+Number(debtor.amountPaid))===(debtor.fees))?'paid':'debtor',
    name:debtor.name,
    surname:debtor.surname,
    paidAmount:this.state.amountPaid
  }
  this.props.updateStudentBill(this.props.match.params.student_id, studentBill)
  if((Number(this.state.amountPaid)+Number(debtor.amountPaid))===(debtor.fees)){
    this.setState({status:'paid',name:debtor.name})
  }
  this.setState({payment:true})
}
  render(){
    const {debtor} = this.props.debtor
    return(
            <div class="main-content">
      <div class='container-fluid'>
      <div class="col-md-8 mx-auto">
                              <aside class="profile-nav alt">
                                  <section class="card">
                                      <div class="card-header user-header alt bg-dark">
                                          <div class="media">
                                                  <img class="align-self-center rounded-circle mr-3" style={{width:'85px', height:'85px'}} alt="" src={kR}/>
                                              <div class="media-body">
                                                  <h2 class="text-light display-6">{debtor.surname+' '+debtor.name}</h2>
                                                  <p class="text-light">{debtor.clas}</p>
                                              </div>
                                          </div>
                                      </div>


                                      <ul class="list-group list-group-flush">

                                        <li class="list-group-item">
                                          <div className='row'>
                                            <div className='col'>Student's Identification Number:</div>
                                            <div className='col'>{debtor.student_id}</div>
                                          </div>
                                        </li>
                                        <li class="list-group-item">
                                          <div className='row'>
                                            <div className='col'>{debtor.clas} School Fees</div>
                                            <div className='col'>#{debtor.fees}</div>
                                          </div>
                                        </li>
                                        <li class="list-group-item">
                                          <div className='row'>
                                            <div className='col'>Status</div>
                                            <div className='col'>{debtor.status}</div>
                                          </div>
                                        </li>
                                        <li class="list-group-item">
                                          <div className='row'>
                                            <div className='col'>Amount Left</div>
                                            <div className='col'>#{debtor.fees - debtor.amountPaid}</div>
                                          </div>
                                        </li>
                                        <li class="list-group-item">
                                          <div className='row'>
                                            <div className='col'>Amount Paid</div>
                                            <div className='col'>#{debtor.amountPaid}</div>
                                          </div>
                                        </li>
                                        {
                                          (this.state.status)?(
                                            <div className='alert alert-info'>{this.state.name} has balanced his school fees <Link to='/debtors'>Go back to Debtors Page</Link></div>
                                          ):(
                                            <form onSubmit={this.handleSubmit}>
                                            <li class="list-group-item">
                                            <div className='row'>
                                            <div className='col'>Increase Amount Paid</div>
                                            <div className='col'><input onChange={this.handleChange} placeholder="Enter Amount Paid" type="number" name="amountPaid" class="form-control"/></div>
                                            </div>
                                            </li>
                                            <li class="list-group-item">
                                            <button type="submit" class="btn btn-outline-primary btn-sm btn-block">
                                            <i class="fa fa-dot-circle-o"></i> Submit
                                            </button>
                                            </li>
                                            </form>
                                          )
                                        }
                                        {
                                          this.state.payment===true ? <div className='alert alert-success'>Payment Successful go back to <Link to='/debtors'>debtors page</Link></div>
                                          :
                                          <div></div>
                                        }
                                      </ul>

                                  </section>
                              </aside>
                          </div>
      </div>
      </div>
    )
  }
}
Debtor.propTypes = {
  studentBillDetail:PropTypes.func.isRequired,
  debtor:PropTypes.object.isRequired,
}
const mapStateToProps= state => {
    return{
      debtor:state.debtor,
    }
}
export default connect(mapStateToProps, {studentBillDetail, updateStudentBill})(Debtor)
