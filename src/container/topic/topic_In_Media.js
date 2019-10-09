import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Media} from 'reactstrap';
import {createBrowserHistory} from 'history';
import './topic_In_Media.css';
import poster from '../../Asset/slider.png';
import {withRouter} from 'react-router-dom';

const history = createBrowserHistory();

class MediaTopic extends Component{
    constructor(props) {
        super(props);
        this.state = {
            sortedBy : "sort",
            topic : []
        }
    }

    setsortedState = (event) => {
        let setvalue = event.target.value;
        this.setState({
            sortedBy:setvalue
        });
    }

    onCourseClick(event,fullCourse){
        console.log(event);
        this.props.history.push({pathname:'/course-detail/',state:fullCourse,search:"?id="+fullCourse._id});
    }

    componentWillReceiveProps = () => {
        const that = this;
        let selectedTopicReceive = [];
        selectedTopicReceive =  this.props.selectedTopic.AllSelectedTopic;
        if(this.state.topic.length > 0 && this.state.topic[0] !== selectedTopicReceive[0]){

            that.setState({topic : selectedTopicReceive,sortedBy : "sort"})
        }
    }

    myfun = () => {
        const that = this;
        let topicData = [];
        let filtredData = [];
        let coursesFiltered = [];
        let selectedTopic = [];
        let topics;
        topics = JSON.parse(localStorage.getItem("topic"));
        if(topics !== null && topics.length>0){

            topics.map(function (topic) {
                let filtredmarge;
                filtredmarge = that.props.courses.AllCourses.filter(courses => {

                    if(courses.category_Name === topic){
                        let price = parseInt(courses.price);
                        let offer = parseInt(courses.offer);
                        let discount = parseInt(price - ((price * offer) / 100));
                        if(that.state.sortedBy === "lowestPrice"){
                            if(discount<500){
                                return courses;
                            }
                        }
                        else if(that.state.sortedBy === "highestPrice"){
                            if(discount>500){
                                return courses;
                            }
                        }
                        else {
                            return courses;
                        }
                    }
                });
                filtredmarge.map(function (filtredelement){
                    coursesFiltered.push(filtredelement);
                });
            });
        }
        else {
            topicData = [];
            topicData = this.props.selectedTopic.AllSelectedTopic;
            if(topicData !== null && topicData.length > 0 ) {
                selectedTopic =  this.props.selectedTopic.AllSelectedTopic;
                if(this.state.topic.length == 0){
                    this.setState({topic : selectedTopic,sortedBy : "sort"})

                }
            }
            if(selectedTopic.length > 0){
                selectedTopic.map(function (stopic,index){
                    that.props.courses.AllCourses.map(courses => {
                        if(courses.category_Name === stopic){
                            let price = parseInt(courses.price);
                            let offer = parseInt(courses.offer);
                            let discount = parseInt(price - ((price * offer) / 100));
                            if(that.state.sortedBy === "lowestPrice"){
                                if(discount<500){
                                    coursesFiltered.push(courses);
                                }
                            }
                            else if(that.state.sortedBy === "highestPrice"){
                                if(discount>500){
                                    coursesFiltered.push(courses);
                                }
                            }
                            else if(that.state.sortedBy === "sort"){

                                coursesFiltered.push(courses);
                            }
                        }

                    });
                });
            }
        }

        filtredData = coursesFiltered.map(function (course,index){
            let price = parseInt(course.price);
            let offer = parseInt(course.offer);
            let discount = parseInt(price - ((price * offer) / 100));
            return (<Media className="main-wrap" onClick={(event) => that.onCourseClick(event,course)}
                           key = {index}>
                <Media left>
                    <Media object src={poster} height = "200px" width = "200px"/>
                </Media>
                <Media body>
                    <Media heading>
                        <div className='course-wrap'>
                            <div>
                                {course.course_Name}
                            </div>
                            <div className='price-list'>
                                <p>{discount}</p>
                                <p><strike>{course.price}</strike></p>
                            </div>
                        </div>
                    </Media>
                    {course.course_Subtitle}
                    <div>
                    </div>
                    <div>
                    </div>
                </Media>
            </Media>)
        });
        return filtredData;
    }

    render(){
        return(
            <div>
                <table>
                    <tbody>
                <tr className="hide_all">
                    <td>
                <select id="selected" value={this.state.sortedBy} onChange = {(event) => this.setsortedState(event)}>
                    <option value="sort" selected={true}>Sort</option>
                    <option value="lowestPrice">Lowest Price</option>
                    <option value="highestPrice">Highest Price</option>
                </select>
                    </td>
                    <td>Courses</td>
                </tr>
                    </tbody>
                </table>
                {this.myfun()}
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    const {categorydetail,courses,filterTopic,selectedTopic}  = state;
    return {
        categorydetail : categorydetail,
        courses : courses,
        filterTopic : filterTopic,
        selectedTopic : selectedTopic
    }
};

export default withRouter(connect(mapStateToProps)(MediaTopic));
