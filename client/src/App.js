import React,{Component} from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import axios from 'axios'
import Navbar from './components/navbar'
import Dashboard from './components/dashboard'
import Register from './components/register'
import SignUp from './components/signUp'
import Login from './components/login'
import Students from './components/students'
import Teachers from './components/teachers'
import NewTeacher from './components/newTeacher'
import Student from './components/student'
import Teacher from './components/teacher'
import EditStudent from './components/editstudent'
import EditTeacher from './components/editteacher'
import News from './components/news'
import NewsInfo from './components/newsInfo'
import Bill from './components/bill'
import ClassBill from './components/classBill'
import Debtors from './components/debtors'
import Debtor from './components/debtor'
import Paid from './components/paid';
import Footer from './components/footer'
import Topbar from './components/topbar'
import PTF from './components/ptf'
import Receipt from './components/receipt'
import FirstTerm from './components/firstterm'
import SecondTerm from './components/secondterm'
import ThirdTerm from './components/thirdterm'
import Student_Left from './components/student_left'
import Teacher_Left from './components/teacher_left'
import Product from './components/product'
import ProductDetail from './components/productDetail'
import Cart from './components/cart'
class App extends Component {
  UNSAFE_componentWillMount() {
    axios.interceptors.request.use(function (config) {
      const token = localStorage.token;
      config.headers.Authorization =  token;

      return config;
    });
    axios.defaults.headers.common['Authorization'] = localStorage.token
      }

  render() {
    const loginRoutes = (

          <Switch>
          <Route exact path='/' component={Login}/>
          <Route path='/signUp' component={SignUp}/>
          </Switch>
    )
    const userRoutes = (
      <React.Fragment>
      <Navbar />
      <div class='page-container'>
      <Topbar/>
      <Switch>
      <Route exact path='/' component={Dashboard}/>
      <Route path='/registerStudent' component={Register}/>
      <Route path='/registerTeacher' component={NewTeacher}/>
      <Route path='/students' component={Students}/>
      <Route path='/teachers' component={Teachers}/>
      <Route exact path='/news' component={News}/>
      <Route exact path='/student/:student_id' component={Student}/>
      <Route path='/editstudent/:student_id' component={EditStudent}/>
      <Route exact path='/teacher/:teacher_id' component={Teacher}/>
      <Route path='/editteacher/:teacher_id' component={EditTeacher}/>
      <Route path='/news/:news_id' component={NewsInfo}/>
      <Route exact path='/bill' component={Bill}/>
      <Route path='/bill/:bill_id' component={ClassBill}/>
      <Route exact path='/debtors' component={Debtors}/>
      <Route exact path='/paid' component={Paid}/>
      <Route exact path='/debtor/:student_id' component={Debtor}/>
      <Route exact path='/receipt/:student_id' component={Receipt}/>
      <Route path='/ptf' component={PTF}/>
      <Route exact path='/1stterm/:student_id' component={FirstTerm}/>
      <Route exact path='/2ndterm/:student_id' component={SecondTerm}/>
      <Route exact path='/3rdterm/:student_id' component={ThirdTerm}/>
      <Route path='/student_left' component={Student_Left}/>
      <Route path='/teacher_left' component={Teacher_Left}/>
      <Route exact path='/product' component={Product}/>
      <Route exact path='/cart' component={Cart}/>
      <Route path='/product/:product_id' component={ProductDetail}/>
      <Route path='/cart/:cart_id' component={ProductDetail}/>
    </Switch>
    <Footer/>
    </div>
    </React.Fragment>
    )
    return (
      <Router>
        <div >

          <Switch>
          {localStorage.token ? userRoutes : loginRoutes}
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
