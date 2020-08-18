import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
class signUp extends Component {
  state={
    name:'',
    email:'',
    password:''
  }
  handleChange=(e)=>{
         this.setState({[e.target.name]:e.target.value})
     }
     handleSubmit=(e)=>{
         e.preventDefault()
         const user={
            name:this.state.name,
            email:this.state.email,
            password:this.state.password
         }
         axios.post('/signup',user)
          .then(res=>{this.setState({status:res.data})})
          this.props.history.push('/')
     }
  render(){
    return(
      <div class="row mt-5">
  <div class="col-md-6 m-auto">
    <div class="card card-body">
      <h1 class="text-center mb-3"><i class="fas fa-user-plus"></i> Register</h1>
    </div>
    <form noValidate onSubmit={this.handleSubmit}>
    <div class="form-group">
    <label for="name">School Name</label>
    <input class="form-control"
     id="name"
      type="text"
       name="name"
        placeholder="Enter Name"
        onChange={this.handleChange}/>
  </div>
    <div class="form-group">
    <label for="email">School's Email</label>
    <input class="form-control"
     id="email"
      type="email"
       name="email"
        placeholder="Enter Email"
        onChange={this.handleChange}/>
  </div>
  <div class="form-group">
    <label for="password">Password</label>
    <input class="form-control"
     id="password"
      type="password"
       name="password"
        placeholder="Create Password"
        onChange={this.handleChange}/>
  </div>
      <button class="btn btn-primary btn-block" type="submit" value="Register">Register →</button>
    </form>
    <p class="lead mt-4">Have An Account? <Link to="/">Login</Link></p>
  </div>
</div>
    )
  }
}
export default signUp
