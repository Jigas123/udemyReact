import React,{Component} from 'react';
import {bindActionCreators} from 'redux';
import {createBrowserHistory} from 'history';
import {withRouter} from 'react-router-dom';
import * as userLog from '../../action/userRegisterLog';
import * as addCartItem from '../../action/userCartItem';
import * as addToCartAction from '../../action/addUserCartData';
import {connect} from 'react-redux';
import Facebook from './facebook';

import {Alert, Button,
    Form, FormGroup,
    Input, Modal, ModalBody,
    ModalFooter, ModalHeader,
    NavLink} from "reactstrap";

const history = createBrowserHistory();

class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            eml:null,
            pswd:null,
            errors:{},
            error_flag:false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleValidation = this.handleValidation.bind(this);
    }

    async logindata(event){
        let uniqueArray = [];
        event.preventDefault();
        if(this.handleValidation()){
            const answer = await (this.props.action.userdetail.getUserLogin(this.state.eml,this.state.pswd));
            if(!answer){
                this.setState({error_flag:true})
            }
            else{
                console.log(answer);
                let cartflag = 1;
                console.log(this.props.userRegisterLog.userDetail);
                    if(this.props.userRegisterLog.userDetail !== null && this.props.userRegisterLog.userDetail.role === '0'){
                        let newCartData;
                        let localCartData = JSON.parse(localStorage.getItem("addToCart"));
                            if(this.props.userRegisterLog.userDetail.cartData &&
                                this.props.userRegisterLog.userDetail.cartData.length > 0){
                                let userCartData = this.props.userRegisterLog.userDetail.cartData;
                                if(localCartData && localCartData.length > 0) {
                                    localCartData.map(function (cartItem, index) {
                                        userCartData.map(function (cart, index) {
                                            if (cart.course_Name === cartItem.course_Name){
                                                cartflag = 0;
                                            }
                                            return 0;
                                        })
                                        if (cartflag === 1){
                                            uniqueArray.push(cartItem);
                                        }
                                        cartflag = 1;
                                        return 0;
                                    })
                                    newCartData = [...this.props.userRegisterLog.userDetail.cartData, ...uniqueArray];
                                }
                                else {
                                    newCartData = userCartData.slice(0);
                                }
                            }
                            else {
                                if(localCartData) {
                                    newCartData = localCartData.slice(0);
                                }
                            }
                            if((this.props.userRegisterLog.userDetail.cartData &&
                                this.props.userRegisterLog.userDetail.cartData.length > 0) || (localCartData && localCartData.length > 0)){
                                let u_id = this.props.userRegisterLog.userDetail._id;
                                let cartData = newCartData;
                                let passDataObject = {u_id,cartData};
                                let resp = await (this.props.action.addToCartDataAction.addCartData(passDataObject));
                                if(resp){
                                    localStorage.setItem("addToCart",JSON.stringify(cartData));
                                    localStorage.removeItem("saveForCart");
                                    this.props.action.addCartItem.getCartItem(cartData);
                                    uniqueArray = [];
                                    cartData = null;
                                }
                            }
                    }
                    else if(this.props.userRegisterLog.userDetail.role === '1'){
                        this.props.action.addCartItem.getCartItem(null);
                        localStorage.removeItem('addToCart');
                        this.props.history.push({pathname:'/adminpenal/'});
                    }
                this.setState({
                    eml:null,
                    pswd:null,
                    errors : {},
                    error_flag:false
                });
                this.props.toggle();
            }
        }
    }

    handleValidation = () => {
        let emlFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let errors = {};
        let formIsValidate = true;
        let eml = this.state.eml;
        let pswd = this.state.pswd;

        if(eml == null || eml.length > 0){
            if(eml == null){
                errors["eml"] = "Cannot be empty";
                formIsValidate = false;
            }
            else if(eml.length > 0){
                if(!eml.match(emlFormat)){
                    errors["eml"] = "required valid email";
                    formIsValidate = false;
                }
            }
        }

        if(pswd == null || pswd.length > 0){
            if(pswd == null){
                errors["pswd"] = "Cannot be empty";
                formIsValidate = false;
            }
            else if(pswd.length < 5){
                    errors["pswd"] = "required atleast 5 character";
                    formIsValidate = false;
                }
        }

        this.setState({errors : errors});
        return formIsValidate;

    }

    handleChange = (e,stateKet) => {
        this.setState({[stateKet]:e.target.value})
    }

    render(){

        return(
            <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} className={this.props.className}>
                <ModalHeader toggle={this.props.toggle}>Log In to Your Udemy Account!</ModalHeader>
                <ModalBody>
                    <Form>
                        {this.state.error_flag ? (<Alert color="danger">Enter valid data</Alert>): null}
                        <FormGroup>
                            <Facebook toggle = {this.props.toggle}/>
                        </FormGroup>
                        <FormGroup>
                            <Input onChange = {(event) => this.handleChange(event,'eml')} type="email" name="email" id="email" placeholder="Email"
                                   value = {this.state.eml || ''}/>
                            <span style={{color: "red"}}>{this.state.errors["eml"]}</span>
                        </FormGroup>
                        <FormGroup>
                            <Input onChange = {(event) => this.handleChange(event,'pswd')} type="password" name="password" id="Password"
                                   placeholder="Password" minLength="5" maxLength="12" value={this.state.pswd || ''}/>
                            <span style={{color: "red"}}>{this.state.errors["pswd"]}</span>
                        </FormGroup>
                        <Button className="btn-primary" onClick={this.logindata.bind(this)}>Log In</Button>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <p>Don't have an account?</p>
                    <NavLink onClick={this.props.onlinkclick}>Sign up</NavLink>
                </ModalFooter>
            </Modal>
        );
    }
}

const mapStateToProps = (state) => {
    const {userRegisterLog,userCartItem} = state;
    return {
        userRegisterLog: userRegisterLog,
        userCartItem: userCartItem
    }
};

const mapDispatchToProps = dispatch => ({
    action: {
        userdetail: bindActionCreators(userLog, dispatch),
        addToCartDataAction: bindActionCreators(addToCartAction,dispatch),
        addCartItem:bindActionCreators(addCartItem,dispatch)
    }
});

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Login));
