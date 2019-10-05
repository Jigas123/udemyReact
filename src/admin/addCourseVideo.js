import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as addCourseVideoAction from '../action/addCourseVideo';
import * as coursesdetailAction from '../action/coursedetail';
import * as instructorDetailAction from '../action/instructorDetail';
import { Button, Form, FormGroup, Label, Input, Alert} from 'reactstrap';
import AdminavBar from './adminNavbar';

class AddcourseVideo extends Component{
    constructor(props){
        super(props)
        this.state = {
            selectedFile: null,
            Alert : 0
        }
        this.video_submit = this.video_submit.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
    }

    onChangeHandler = (event) => {
        this.setState({
            selectedFile: event.target.files[0],
            loaded: 0,
        })
    }

    video_submit = async (e) => {
        const that = this;
        let course_id;
        const data = new FormData();
        this.props.courses.AllCourses.map(function (course,index){
                if(that.props.location.state === course.course_Name){
                    course_id = course._id;
                }
        });
        data.append('course_Id', course_id);
        data.append('courseImage', this.state.selectedFile);
        let APIresponse = await (this.props.action.addCourseVideoAction.addcourseVideo(data));
        if(APIresponse){
            await (this.props.action.coursesdetail.getAllCourses());
            await (this.props.action.instructorDetail.getAllInstructor());
            this.setState({Alert:1});
        }
    }

    render(){
        return(
            <div>
                <AdminavBar/>
            {this.state.Alert == 1 ? (<Alert color="success">course-video added successfully!</Alert>) :
                    null }
            <Form>
                <FormGroup>
                    <Label for="learn">Recently added Course</Label>
                    <Input type="text" name="courseName" value={this.props.location.state} disabled/>
                </FormGroup>
                <FormGroup>
                    <Label for="learn">Add video</Label>
                    <input type="file" name="file" onChange={(event) => this.onChangeHandler(event)}/>
                </FormGroup>
                <Button onClick={(event) => {this.video_submit(event)}}>Submit</Button>
            </Form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const {courses}  = state;
    return {
        courses : courses
    }
};

const mapDispatchToProps = dispatch => ({
    action: {
        addCourseVideoAction : bindActionCreators(addCourseVideoAction,dispatch),
        coursesdetail : bindActionCreators(coursesdetailAction,dispatch),
        instructorDetail : bindActionCreators(instructorDetailAction,dispatch)
    }
});

export default connect(mapStateToProps,mapDispatchToProps)(AddcourseVideo);
