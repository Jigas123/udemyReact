import React,{Component,Fragment} from 'react';
import {BrowserRouter as Router,Route,Switch, withRouter} from 'react-router-dom';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as categorydetailAction from '../../action/categorydetail';
import * as coursesdetailAction from '../../action/coursedetail';
import * as instructorDetailAction from '../../action/instructorDetail';

import CustomRoute from '../customRoute/customRoute';
import Header from '../header/header';
import Index from '../index/index';
import Topic from '../topic/Topic';
import Courses from '../courses/Courses';
import Footer from '../footer/footer';
import ShoppingCart from "../courses/ShoppingCart";
import CourseInDetail from "../courses/CourseInDetail";
import Checkoutpag from "../courses/Checkout";
import AddCourse from '../../admin/addCourse';
import AddcourseVideo from '../../admin/addCourseVideo';
import Unauthorize from '../../anauthorize/anauthorize';
import Adminpenal from '../../admin/adminDashbord'
import AddInstructor from '../../admin/addInstructor';
import SearchableData from '../header/searchableData';
import Paymentsuccess from '../courses/paymentSuccessfully';

class App extends Component{
    componentDidMount() {
        this.props.action.categorydetail.getAllCategories();
        this.props.action.coursedetail.getAllCourses();
        this.props.action.instructordetail.getAllInstructor();
    }

  render() {

      const admin = "1";
      const user = "0";

      return(
            <Router>
                <div>
                    <Header/>
                    <Switch>
                        <Fragment>
                        <div id="page-container">
                        <CustomRoute exact path="/" component={Index} />
                            <CustomRoute path="/courses/" component={Courses} />
                            <CustomRoute path="/topic/" component={Topic} />
                            <CustomRoute path="/successful-payment/" component = {Paymentsuccess} />
                        <CustomRoute exact path="/course-detail/" component = {CourseInDetail} />
                        <CustomRoute exact path="/searchableData/" component = {SearchableData} />
                        <CustomRoute exact path="/cart/" component={ShoppingCart} />
                        <CustomRoute cprivate crole = {[user]} exact path="/cart/checkout/" component = {Checkoutpag} />
                        <CustomRoute cprivate crole = {[admin]} exact path='/adminpenal/' component = {Adminpenal} />
                        <CustomRoute cprivate crole = {[admin]} exact path="/adminpenal/addcourse/" component = {AddCourse} />
                        <CustomRoute cprivate crole = {[admin]} exact path="/adminpenal/addcourse/addvideo/" component = {AddcourseVideo} />
                        <CustomRoute cprivate crole = {[admin]} exact path="/adminpenal/addinstructor/" component = {AddInstructor} />
                        <CustomRoute cprivate path='/unauthorize/' component = {Unauthorize} />
                        </div>
                        </Fragment>
                    </Switch>
                    <Footer/>
                </div>
            </Router>
      );
  }
}

const mapStateToProps = (state) => {
    const { categorydetail,courses}  = state;
    return {
        categorydetail : categorydetail,
        courses : courses
    }
};

const mapDispatchToProps = dispatch => ({
    action: {
        categorydetail: bindActionCreators(categorydetailAction, dispatch),
        coursedetail: bindActionCreators(coursesdetailAction, dispatch),
        instructordetail: bindActionCreators(instructorDetailAction, dispatch)
    }
});

export default connect(mapStateToProps,mapDispatchToProps)(App)

