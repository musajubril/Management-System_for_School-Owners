import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {newsDetail, deleteNews, updateNews} from '../actions/candidateAction'
import {Link} from 'react-router-dom'
import kR from '../unnamed.jpg'
import axios from 'axios'
import './style.css'
class NewsInfo extends Component {

  state={
    title:'',
    content:'',
    image:'no image'
  }


  UNSAFE_componentWillMount() {
    this.props.newsDetail(this.props.match.params.news_id)
    axios.get('/news/'+this.props.match.params.news_id)
      .then(res=>{
        this.setState({
          title:res.data.title,
          content:res.data.content,
          image:res.data.image
        })
      })
  }
  handleChange=e=>{
    this.setState({
      [e.target.name]:e.target.value
    })
  }
  handleSubmit=e=>{
    e.preventDefault()
    const info = {
      title:this.state.title,
      content:this.state.content,
      image:this.state.image
    }
    this.props.updateNews(this.props.match.params.news_id, info)
    this.props.history.push('/news')
}
handleDelete=e=>{
  this.props.deleteNews(this.props.match.params.news_id)
  this.setState({msg:'Delete Successful'})
}
  render(){
    const {info} = this.props.info
    const Info = (info.image!==('no image'||null||undefined))?(
      <article class="blog_item">
          <div class="blog_item_img">
              <img class="card-img rounded-0" src={kR||info.image} alt=""/>
              <Link  class="blog_item_date">
                  <h3>{info.day}</h3>
                  <p>{info.month}</p>
              </Link>
          </div>

          <div class="blog_details">
              <Link class="d-inline-block" >
              <h2>{info.title}</h2>
          </Link>
          <p>{info.content}</p>

          </div>
      </article>
    ):(
      <article class="blog_item">
          <div class="blog_item_img">
          <Link  class="blog_item_date">
          <h3>{info.day}</h3>
          <p>{info.month}</p>
          </Link>
          </div>

          <div class="blog_details">
              <Link class="d-inline-block" >
                  <h2>{info.title}</h2>
              </Link>
              <p>{info.content}</p>

          </div>
      </article>
    )
    return(
            <div class="main-content">
            <section class="blog_area section-padding">
            <div class="container">
                <div class="row">
                    <div class="col-lg-8 mb-5 mb-lg-0">
                        <div class="blog_left_sidebar">

                            {Info}

                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="blog_right_sidebar">
                            <aside class="single_sidebar_widget search_widget">
                                <form onSubmit={this.handleSubmit}>
                                <h4>Update News</h4>
                                    <div class="form-group">
                                        <div class="input-group mb-3">
                                            <input onChange={this.handleChange} value={this.state.title}  type="text" id="text-input" name="title" placeholder="Change Title" class="form-control-sm form-control"/>
                                        </div>
                                        <textarea onChange={this.handleChange} value={this.state.content}  name="content" id="textarea-input" rows="9" placeholder="Content..." class="form-control-sm form-control"></textarea>
                                    </div>
                                    <div className='row'>
                                      <div className='col'>
                                      <input class="btn btn-outline-primary btn-block" type="submit" value='Update'/>
                                      </div>
                                      <div className='col'>
                                      <input onClick={this.handleDelete} class="btn btn-outline-danger btn-block" type="button" value='Delete'/>
                                      </div>
                                    </div>
                                </form>
                                {
                                  (this.state.msg)?(
                                    <div class="alert alert-success">
                                      {this.state.msg}
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
NewsInfo.propTypes = {
  newsDetail:PropTypes.func.isRequired,
  info:PropTypes.object.isRequired
}
const mapStateToProps= state => {
  return{
    info:state.info
  }
}
export default connect(mapStateToProps,{newsDetail,deleteNews,updateNews})(NewsInfo)
