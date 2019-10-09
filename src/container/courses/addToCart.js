import React,{Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import './addToCart.css'
import {withRouter} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import * as userCartItem from '../../action/userCartItem';
import * as addToCartAction from '../../action/addUserCartData';
import poster from '../../Asset/slider.png';

import {Alert, Button,
    Modal, ModalBody,
    ModalFooter, ModalHeader} from "reactstrap";
    const history = createBrowserHistory();
class AddToCart extends Component{
    constructor(props){
        super(props);
        this.state = {
            storageflag : 1
        }
        this.addTouserCart = this.addTouserCart.bind(this);
    }
    chkData = (objectData) => {
        const that = this;
        let getCartData = [];

            getCartData = JSON.parse(localStorage.getItem("addToCart"));
            getCartData.map(function (card,index){
                if(objectData.length >1){
                    if(card.course_Name === objectData[1].course_Name){
                        that.setState({storageflag:0});
                    }
                }
                else{
                    that.setState({storageflag:0});
                }
                return 0;
            });
            return getCartData;

    }

    addToCartData = async (Objectdata) => {
        const that = this;
        let getCartData;
        if(Objectdata.length > 1){
            getCartData = this.chkData(Objectdata);

                if(that.state.storageflag === 1){
                    getCartData.push(Objectdata[1]);
                    localStorage.setItem("addToCart",JSON.stringify(getCartData));
                    this.props.action.userCartItem.getCartItem(getCartData);
                    if(this.props.userRegisterLog.userDetail !== null){
                        this.addTouserCart(getCartData);
                    }
                    that.setState({storageflag:0});
                }
        }
    }
    GoToCartData = () => {
        this.props.onlinkclick();
        this.props.history.push({pathname:'/cart/'});
    }

    postCartData = async (passDataObject) => {
        let resp = await (this.props.action.addToCartDataAction.addCartData(passDataObject));
        if(resp)
            return true;
        else
            return false;
    }

    addTouserCart = async (cartData) => {
        let u_id = this.props.userRegisterLog.userDetail._id;
        let postDtaObject = {u_id,cartData};
        await (this.props.action.addToCartDataAction.addCartData(postDtaObject));
        let userDetail = this.props.userRegisterLog.userDetail;
        localStorage.setItem("LoginUser",JSON.stringify(userDetail));
    }

    render(){
        let that = this;
        let totalPrice = 0;
        let totaldiscountedPrice = 0;
        if(this.props.data !== null){
            let storageflag = 1;
            let cartStorage = [];
            let obj = [];
            let dataBindTocart = [];

            obj.push(this.props.data);

                if(localStorage.getItem("addToCart") !== null){
                    cartStorage = JSON.parse(localStorage.getItem("addToCart"));
                    cartStorage.map(function (card,index){
                        if(card.course_Name === that.props.data.course_Name){
                            storageflag = 0;
                        }
                        return 0;
                    })
                }
                if(storageflag === 1 || localStorage.getItem("addToCart") === null){
                    cartStorage.push(this.props.data);
                    localStorage.setItem("addToCart",JSON.stringify(cartStorage));
                    this.props.action.userCartItem.getCartItem(cartStorage);
                    if(this.props.userRegisterLog.userDetail !== null){
                        this.addTouserCart(cartStorage);
                    }
                }

            this.props.courses.AllCourses.map(function (course,index){
                if(course.category_Name === obj[0].category_Name && course.course_Name !== obj[0].course_Name && obj.length === 1){
                    let price = parseInt(course.price);
                    let offer = parseInt(course.offer);
                    let discount = parseInt(price - ((price * offer) / 100));
                    obj.push({"course_Name":course.course_Name,"course_Img":course.course_Img,"created_By":course.created_By.join(),
                        "price":price,"discount":discount,"category_Name":course.category_Name});
                }
                return 0;
            });

            obj.map(function (value,index){

                let coursefullName = value.course_Name;
                const courseName = () => {
                    if (coursefullName.length < 41)
                        return coursefullName;
                    else
                        return coursefullName.substring(0, 33) + "..";
                };

                totalPrice += value.price;
                totaldiscountedPrice += value.discount;

                dataBindTocart.push(
                        <div className="card" id="card" style={that.props.cardStyle} key={value.course_Name}>
                            <div id="card">
                                <div className="card-wrap">
                                    <img alt="#" src={poster} id="img" width="230" height="125"/>
                                    <p className="title">{courseName()}</p>
                                    <p className="desc">{value.created_By}</p>
                                    {value.discount === value.price ? null
                                        :
                                        <p className="desc">{"Price: "}><strike>{value.price}</strike></p>
                                    }
                                    <p className="desc">{"discounted Price: "}{value.discount}</p>
                                    <p className="desc">{value.category_Name}</p>
                                </div>
                            </div>
                        </div>
                    );
                return 0;
            });

            if(this.state.storageflag === 1){
                this.chkData(obj);
            }
            return(
                <Modal isOpen={that.props.isOpen} toggle={that.props.toggle} className={that.props.className}>
                    <ModalHeader toggle={that.props.toggle}><Alert color="success">
                        Added{" "+obj[0].course_Name}
                        &nbsp;&nbsp;<Button><a href="http://localhost:3000/cart/">Go to Cart</a></Button></Alert></ModalHeader>
                    <ModalBody>
                        {dataBindTocart}<br/>
                        <div>{"Total Price: "+totaldiscountedPrice+" "}<strike>{totalPrice}</strike></div>
                    </ModalBody>
                    <ModalFooter>
                        {this.state.storageflag === 1 ?
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
    const { courses,userRegisterLog}  = state;
    return {
        courses : courses,
        userRegisterLog: userRegisterLog,

    }
};

const mapDispatchToProps = dispatch => ({
    action: {
        userCartItem: bindActionCreators(userCartItem, dispatch),
        addToCartDataAction: bindActionCreators(addToCartAction,dispatch)
    }
});

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(AddToCart));
