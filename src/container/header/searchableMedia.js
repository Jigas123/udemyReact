import React,{Component} from "react";
import {Media} from "reactstrap";
import {createBrowserHistory} from 'history';
import {withRouter} from 'react-router-dom';
import poster from "../../Asset/slider.png";
import './searchableData.css';

const history = createBrowserHistory();

class SearchableMedia extends Component{
    constructor(props){
        super(props)
    }

    onCourseClick(event,fullCourse){
        console.log(event);
        this.props.history.push({pathname:'/course-detail/',state:fullCourse,search:"?id="+fullCourse._id});
    }

    render(){
        return(
            <Media className="searchable-wrap container"
                   fullcourse = {this.props.fullcourseInfo} key = {this.props.key}
                   onClick={(event) => this.onCourseClick(event,this.props.fullcourseInfo)}>
                <Media left>
                    <Media object src={poster} height = "100px" width = "100px"/>
                </Media>
                <Media body>
                    <Media heading>
                        <div className='d-flex justify-content-between'>
                            <div className="title-content">
                                {this.props.fullcourseInfo.category_Name}
                            </div>
                            <div className='price-list'>
                                <p className='course-rate'>{this.props.discount}</p>
                                <p className='course-rate'><strike>{this.props.price}</strike></p>
                            </div>
                        </div>
                    </Media>
                    <div className="subtitle-content">
                        {this.props.fullcourseInfo.course_Subtitle+" | created by "}<b>{this.props.fullcourseInfo.created_By[0]}</b>
                    </div>
                </Media>
            </Media>
        );
    }
}

export default withRouter(SearchableMedia);