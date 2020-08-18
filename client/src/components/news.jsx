import React, { Component } from 'react'
import PropTypes from 'prop-types'
import kR from '../unnamed.jpg'
import {connect} from 'react-redux'
import {getNews, addNews} from '../actions/candidateAction'
import jwt_decode from 'jwt-decode'
import {Link} from 'react-router-dom'
import './style.css'
class News extends Component {

  componentDidMount() {
      this.props.getNews()
  }
  state={
    title:'',
    content:'',
    image:'no image'
  }
  handleChange=e=>{
    this.setState({[e.target.name]:e.target.value})
  }
  handleSubmit=e=>{
    e.preventDefault()
    var d = new Date();
    var day = d.getDate()
  var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
  var month = months[d.getMonth()];
    const decode = jwt_decode(localStorage.token)
    const info = {
      title:this.state.title,
      content:this.state.content,
      image:this.state.image,
      school_id:decode.school_id,
      day,
      month
    }
    this.props.addNews(info)
    this.setState({
      title:' ',
      content:' ',
      msg:'News Upload Successful'
    })
  }
  render(){
  const {news} =this.props.news
    const News = (news.length)?(
      news.map(news=>{
        return(
            (news.image!==('no image'||null||undefined))?(
              <article class="blog_item">
                  <div class="blog_item_img">
                      <img class="card-img rounded-0" src={kR||news.image} alt=""/>
                      <Link to={'/news/'+news._id} class="blog_item_date">
                          <h3>{news.day}</h3>
                          <p>{news.month}</p>
                      </Link>
                  </div>

                  <div class="blog_details">
                      <Link class="d-inline-block" to={'/news/'+news._id}>
                      <h2>{news.title}</h2>
                  </Link>
                  <p className='col-md-6 float-left'>{news.content}</p>

                  </div>
              </article>
            ):(
              <article class="blog_item">
                  <div class="blog_item_img">
                  <Link to={'/news/'+news._id} class="blog_item_date">
                  <h3>{news.day}</h3>
                  <p>{news.month}</p>
                  </Link>
                  </div>

                  <div class="blog_details">
                      <Link class="d-inline-block" to={'/news/'+news._id}>
                          <h2>{news.title}</h2>
                      </Link>
                      <p>{news.content}</p>

                  </div>
              </article>
            )
        )
      })
    ):(<div></div>)
    return(
            <div class="main-content">
            <section class="blog_area section-padding">
            <div class="container">
                <div class="row">
                    <div class="col-lg-8 mb-5 mb-lg-0">
                        <div class="blog_left_sidebar">

                            {News}

                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="blog_right_sidebar">
                            <aside class="single_sidebar_widget search_widget">
                                <form onSubmit={this.handleSubmit}>
                                    <div class="form-group">
                                        <div class="input-group mb-3">
                                            <input onChange={this.handleChange} type="text" id="text-input" name="title" placeholder="Enter News Title" class="form-control-sm form-control"/>
                                        </div>
                                        <textarea onChange={this.handleChange} name="content" id="textarea-input" rows="9" placeholder="Content..." class="form-control-sm form-control"></textarea>
                                    </div>
                                    <input class="button rounded-0 primary-bg text-white w-100 btn_1 boxed-btn" type="submit" value='Upload'/>
                                </form>
                                {
                                  (this.state.msg)?(
                                    <div className='alert alert-success'>{this.state.msg}</div>
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
News.propTypes = {
  getNews: PropTypes.func.isRequired,
  news: PropTypes.object.isRequired
}
const mapStateToProps= state =>{
    return{
      news:state.news
    }
}
export default connect(mapStateToProps,{getNews,addNews})(News)
