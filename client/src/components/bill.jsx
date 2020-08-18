import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getBill,addBill} from '../actions/candidateAction'
import add from '../add.svg'
import {Link} from 'react-router-dom'
class Bill extends Component{
state={
  clas:'',
  fees:'',
  uniform:'',
  exerciseBooks:'',
  pricePerBook:'',
  textBooks:'',
  totalTextBookPrice:''
}
  componentDidMount() {
    this.props.getBill()
  }
  handleChange=e=>{
    this.setState({[e.target.name]:e.target.value})
  }
  handleSubmit=e=>{
    e.preventDefault()
    const bill = {
      clas:this.state.clas,
      fees:this.state.fees,
      uniform:this.state.uniform,
      exerciseBooks:this.state.exerciseBooks,
      pricePerBook:this.state.pricePerBook,
      textBooks:this.state.textBooks,
      totalTextBookPrice:this.state.totalTextBookPrice
    }
    this.props.addBill(bill)
    this.setState({msg:'Bill Added Successfully'})
  }
  render(){
    const {bill} =this.props.bill
      const Bill =
      (bill.length)?(
        bill.map(bill=>{
          return(
            (bill.nothing==='empty')?(<div></div>):(

              <article class="blog_item">
              <div class="card">
              <div class="card-header">
              <Link to={'/bill/'+bill._id}>
              <strong class="card-title">{bill.clas}</strong>
              </Link>
              </div>
              <div class="card-body">
              <table class="table table-bordered">

              <tbody>
              <tr>
              <td colspan='3'>School Fees</td>
              <td>#{bill.fees}</td>
              </tr>
              <tr>
              <td colspan='3'>Uniform</td>
              <td>#{bill.uniform}</td>
              </tr>
              <tr>
              <th></th>
              <th>No. Of Exercise Books Needed</th>
              <th>Price Per book</th>
              <th>Total</th>
              </tr>
              <tr>
              <th>Exercise Book</th>
              <th>{bill.exerciseBooks}</th>
              <th>#{bill.pricePerBook}</th>
              <th>#{bill.exerciseBooks*bill.pricePerBook}</th>
              </tr>
              <tr>
              <th colspan='2'></th>
              <th>No. Of Text Books Needed</th>
              <th>Total Price</th>
              </tr>
              <tr>
              <th colspan='2'>Text Books</th>
              <th>{bill.textBooks}</th>
              <th>#{bill.totalTextBookPrice}</th>
              </tr>
              <tr>
              <th colspan='3'>Total</th>
              <th>
              #{bill.fees+bill.uniform+(bill.exerciseBooks*bill.pricePerBook)+bill.totalTextBookPrice}
              </th>
              </tr>
              </tbody>
              </table>
              </div>
              </div>
              </article>
            )

          )
        })
      ):(<article class="blog_item">
          <div class="blog_item_img">
              <i class="card-img rounded-0 fa fa-plus"  alt=''></i> Add New Bill
          </div>
      </article>)
    return(
            <div class="main-content">
            <section class="blog_area section-padding">
            <div class="container">
                <div class="row">
                    <div class="col-lg-8 mb-5 mb-lg-0">
                        <div class="blog_left_sidebar">

                        {Bill}

                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="blog_right_sidebar">
                            <aside class="single_sidebar_widget search_widget">
                            <h4 className="text-center">Add Bill</h4>
                            <form onSubmit={this.handleSubmit}>
                                <div class="row form-group">
                                    <div class="col col-md-3">
                                        <label for="selectSm" class=" form-control-label">Class</label>
                                    </div>
                                    <div class="col-12 col-md-9">
                                        <select name="clas" onChange={this.handleChange} id="SelectLm" class="form-control form-control-sm">
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
                                        <label for="text-input" class=" form-control-label">School Fees</label>
                                    </div>
                                    <div class="col-12 col-md-9">
                                        <input onChange={this.handleChange} type="number" id="text-input" name="fees" class="form-control-sm form-control"/>
                                    </div>
                                </div>
                                <div class="row form-group">
                                    <div class="col col-md-3">
                                        <label for="text-input" class=" form-control-label">Uniform Fee</label>
                                    </div>
                                    <div class="col-12 col-md-9">
                                        <input onChange={this.handleChange} type="number" id="text-input" name="uniform" class="form-control-sm form-control"/>
                                    </div>
                                </div>
                                <div class="row form-group">
                                    <div class="col col-md-3">
                                        <label for="text-input" class=" form-control-label">No. Of Exercise Books</label>
                                    </div>
                                    <div class="col-12 col-md-9">
                                        <input onChange={this.handleChange} type="number" id="text-input" name="exerciseBooks" class="form-control-sm form-control"/>
                                    </div>
                                </div>
                                <div class="row form-group">
                                    <div class="col col-md-3">
                                        <label for="text-input" class=" form-control-label">Price Per Exercise Book</label>
                                    </div>
                                    <div class="col-12 col-md-9">
                                        <input onChange={this.handleChange} type="number" id="text-input" name="pricePerBook" class="form-control-sm form-control"/>
                                    </div>
                                </div>
                                <div class="row form-group">
                                    <div class="col col-md-3">
                                        <label for="text-input" class=" form-control-label">No. Of Text Books</label>
                                    </div>
                                    <div class="col-12 col-md-9">
                                        <input onChange={this.handleChange} type="number" id="text-input" name="textBooks" class="form-control-sm form-control"/>
                                    </div>
                                </div>
                                <div class="row form-group">
                                    <div class="col col-md-3">
                                        <label for="text-input" class=" form-control-label">Total Text Book Price</label>
                                    </div>
                                    <div class="col-12 col-md-9">
                                        <input onChange={this.handleChange} type="number" id="text-input" name="totalTextBookPrice" class="form-control-sm form-control"/>
                                    </div>
                                </div>
                                <input class="button rounded-0 primary-bg text-white w-100 btn_1 boxed-btn" type="submit" value='Add Bill'/>
                            </form>
                            {
                              (this.props.bill.msg)?(
                                <div class="alert alert-success alert-dismissible fade show">
                                <button type="button" class="close" data-dismiss="alert">&times;</button>
                                  {this.props.bill.msg}
                                </div>
                              ):(
                                <div></div>
                              )
                          }
                          {
                            (this.props.bill.error)?(
                              <div class="alert alert-danger alert-dismissible fade show">
                              <button type="button" class="close" data-dismiss="alert">&times;</button>
                                {this.props.bill.error}
                              </div>
                            ):(
                              <div></div>
                            )
                        }
                            </aside>


                        </div>
                    </div>
                </div>
            </div>
        </section>
        </div>
    )
  }
}
Bill.propTypes = {
  getBill:PropTypes.func.isRequired,
  bill:PropTypes.object.isRequired
}
const mapStateToProps= state => {
  return{
    bill:state.bill
  }
}
export default connect(mapStateToProps,{addBill,getBill})(Bill)
