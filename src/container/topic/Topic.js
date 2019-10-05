import React,{Component} from 'react';

import Display from '../card-slider/cardSlider';
import Banner from '../banner/topicBanner';
import Filter from '../filter/filter';
import MediaTopic from './topic_In_Media';
import './Topic.css';

class Topic extends Component{
    render(){
        console.log(this.props.location.state);
        return(
            <div>
                <div className="topic-jumbotron--gradient-border--7UpZf"></div>
                <div className="container">
                    <h1 className="topic-jumbotron--title--2u9Hn">{this.props.location.state + " "}Courses </h1>
                    <h2 className="topic--section-heading--UrZPh">Courses to get you started</h2>
                    <Display key="display" topic={this.props.location.state}/>
                    <Banner key="Banner"/>
                    <Filter key="Filter" topic={this.props.location.state}/>
                    <MediaTopic key="MediaTopic" topic={this.props.location.state}/>
                </div>
            </div>

        );
    }
}
export default Topic;
