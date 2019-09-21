import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import '../card-slider/cardSlider.css';
import {withRouter} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import * as userCartItem from '../../action/userCartItem';

import {Alert, Button,
    Form, FormGroup,
    Input, Label,
    Modal, ModalBody,
    ModalFooter, ModalHeader,
    NavLink} from "reactstrap";
const history = createBrowserHistory();
class AddToCart extends Component{
    constructor(props){
        super(props);
        this.state = {
            storageflag : 1
        }
    }
    chkData = (objectData) => {
        const that = this;
        let getCartData = [];
        getCartData = JSON.parse(localStorage.getItem("addToCart"));
        getCartData.map(function (card,index){
            if(objectData.length >1){
                if(card.course_Name ==objectData[1].course_Name){
                    that.setState({storageflag:0});
                    }
            }
            else{
                that.setState({storageflag:0});
            }
        });
        return getCartData;
    }

    addToCartData = (Objectdata) => {
        const that = this;
        //let storageflag = 1;
        let getCartData;
        console.log("got datas: ",Objectdata);
        // getCartData = JSON.parse(localStorage.getItem("addToCart"));
        console.log("got datas format: ",getCartData);
        if(Objectdata.length >1){
            getCartData = this.chkData(Objectdata);
            if(that.state.storageflag ==1){
                getCartData.push(Objectdata[1]);
                localStorage.setItem("addToCart",JSON.stringify(getCartData));
                this.props.action.userCartItem.getCartItem(getCartData);
                that.setState({storageflag:0});
            }
        }
    }
    GoToCartData = () => {
        this.props.onlinkclick();
        this.props.history.push({pathname:'/cart/'});
    }
    render(){
        let that = this;
        let totalPrice = 0;
        let totaldiscountedPrice = 0;
        console.log("got data",this.props.data);
        if(this.props.data !== null){
            let storageflag = 1;
            let cartStorage = [];
            let obj = [];
            let dataBindTocart = [];
            obj.push(this.props.data);
            console.log(".....storage..",this.props.data);
            if(localStorage.getItem("addToCart") !== null){
                cartStorage = JSON.parse(localStorage.getItem("addToCart"));
                console.log("card storage..",cartStorage);
                cartStorage.map(function (card,index){
                    if(card.course_Name ==that.props.data.course_Name){
                        storageflag = 0;
                    }
                })
            }
            if(storageflag ==1 || localStorage.getItem("addToCart") == null){
                cartStorage.push(this.props.data);
                localStorage.setItem("addToCart",JSON.stringify(cartStorage));
                that.props.action.userCartItem.getCartItem(cartStorage);
            }

            this.props.courses.AllCourses.map(function (course,index){
                if(course.category_Name == obj[0].category_Name && course.course_Name !== obj[0].course_Name && obj.length == 1){
                    let price = parseInt(course.price);
                    let offer = parseInt(course.offer);
                    let discount = parseInt(price - ((price * offer) / 100));
                    obj.push({"course_Name":course.course_Name,"course_Img":course.course_Img,"created_By":course.created_By.join(),
                        "price":price,"discount":discount,"category_Name":course.category_Name});
                }
            });

            console.log("there is data to get...",obj);
            obj.map(function (value,index){
                totalPrice += value.price;
                totaldiscountedPrice += value.discount;

                dataBindTocart.push(
                        <div className="card" id="card" style={that.props.cardStyle} key={value.course_Name}>
                            <div id="card">
                                <div className="card-wrap">
                                    <img src={value.course_Img} id="img" width="240" height="135"/>
                                    <p className="title">{value.course_Name}</p>
                                    <p className="desc">{value.created_By}</p>
                                    <p className="desc"><strike>{value.price}</strike></p>
                                    <p className="desc">{value.discount}</p>
                                    <p className="desc">{value.category_Name}</p>
                                </div>
                            </div>
                        </div>
                    );
            });
            console.log("price data: ",totalPrice+" "+totaldiscountedPrice);
            if(this.state.storageflag == 1){
                this.chkData(obj);
            }
            return(
                <Modal isOpen={that.props.isOpen} toggle={that.props.toggle} className={that.props.className}>
                    <ModalHeader toggle={that.props.toggle}><Alert color="success">
                        Added{" "+obj[0].course_Name}
                        &nbsp;&nbsp;<Button><a href="http://localhost:3001/cart/">Go to Cart</a></Button></Alert></ModalHeader>
                    <ModalBody>
                        {dataBindTocart}<br/>
                        <div>{"Total: "+totaldiscountedPrice+" "}<strike>{totalPrice}</strike></div>
                    </ModalBody>
                    <ModalFooter>
                        {this.state.storageflag == 1 ?
                        <Button color="info" onClick={that.addToCartData.bind(that,obj)}>Add to Cart</Button>
                            :
                            <Button color="white" onClick={that.GoToCartData.bind(that,obj)}>Go to Cart</Button>}
                    </ModalFooter>
                </Modal>
            );
        }
        else {
            return null;
        }

    }
}

const mapStateToProps = (state) => {
    const { categorydetail,courses}  = state;
    return {
        courses : courses
    }
};

const mapDispatchToProps = dispatch => ({
    action: {
        userCartItem: bindActionCreators(userCartItem, dispatch)
    }
});

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(AddToCart));
