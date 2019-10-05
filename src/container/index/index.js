import React,{Component} from 'react';
import Slider from "../slidar/slidar";
import Subslider from "../slidar/subslider";
import TabSlider from "../slidar/tab_Slider";
import Ptopic from "../courses/popularTopic";
import "./index.css";
class Index extends Component{
    render(){
        return(
            <div>
                <Slider/>
                <Subslider/>
                <div className="container">
                <TabSlider/>
                <Ptopic/>
                </div>
            </div>
            );
        }
}

export default Index;
