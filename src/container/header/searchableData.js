import React,{Component} from "react";
import {Media} from "reactstrap";
import SearchableMedia from './searchableMedia'
import poster from "../../Asset/slider.png";

class SearchableData extends Component{
    constructor(props){
        super(props);
        this.state = {
            sortedBy:"0"
        }
        this.getAllSearchableData = this.getAllSearchableData.bind(this);
    }

    getAllSearchableData = () => {
    }

    mappData = () => {
        const that = this;
        let filtredData = [];

        filtredData = this.props.location.state.map(function (course,index){
            let price = parseInt(course.price);
            let offer = parseInt(course.offer);
            let discount = parseInt(price - ((price * offer) / 100));
            console.log(course);
            console.log(course._id);

            if(that.state.sortedBy == "lowestPrice"){
                if(discount < 500){
                    return (<SearchableMedia key = {index} fullcourseInfo = {course} price = {price}
                                             discount = {discount} />)
                }
            }
            else if(that.state.sortedBy == "highestPrice"){
                if(discount > 500){
                    return (<SearchableMedia key = {index} fullcourseInfo = {course} price = {price}
                                             discount = {discount}/>)
                }
            }
            else if(that.state.sortedBy === "0"){
                return (<SearchableMedia key = {index} fullcourseInfo = {course} price = {price}
                                         discount = {discount}/>)
                }
        });
        return filtredData;
    }

    setsortedState = (event) => {
        let setvalue = event.target.value;
        this.setState({
            sortedBy:setvalue
        });
    }

    render(){
        this.getAllSearchableData();
        return(
            <div>
                <table>
                    <tbody>
                        <tr className="hide_all">
                            <td>
                                <select id="select" onChange = {this.setsortedState.bind(this)} defaultValue={0}>
                                    <option value={0}>Sort</option>
                                    <option value="lowestPrice">Lowest Price</option>
                                    <option value="highestPrice">Highest Price</option>
                                </select>
                            </td>
                            <td>Courses</td>
                        </tr>
                    </tbody>
                </table>
                {this.mappData()}
            </div>
        );
    }
}
export default SearchableData;
