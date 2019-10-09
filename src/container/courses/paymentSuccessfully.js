import React,{Component} from 'react';
import {bindActionCreators} from "redux";
import {connect} from 'react-redux';
import {createBrowserHistory} from 'history';
import {withRouter} from 'react-router-dom';
import * as addCartItem from "../../action/userCartItem";
import * as addUserCart from '../../action/addUserCartData';
import './paymentSuccess.css';

const history = createBrowserHistory;

class Paymentsuccess extends Component {
    constructor(props){
        super(props);
        this.getCartData = this.getCartData.bind(this);
        this.addInCart = [];
    }

    removeCartFromAccount = async() => {
        let u_id = this.props.userRegisterLog.userDetail._id;
        let cartData = [];
        let postDataObject = {u_id,cartData}
        await (localStorage.removeItem('addToCart'),localStorage.removeItem('saveForCart'));
        await (this.props.action.addCartItemAction.getCartItem(cartData));
        await (this.props.action.addUserCart.addCartData(postDataObject));
    }

    getCartData = () => {
        const that = this;
        this.addInCart = [];
        const cartData = JSON.parse(localStorage.getItem('finalCartData'));

        cartData.map(function (course,index) {
            that.addInCart.push(
                <b key={index}>{course.course_Name+", "}</b>
            )
        });
        return this.addInCart;
    }
    render() {
        if(this.props.userRegisterLog.userDetail !== null &&
            this.props.userRegisterLog.userDetail.cartData.length > 0){
            this.removeCartFromAccount();
        }
        return (
            <div className="paymentsuccess">
                <h5>{'Your Payment is successful with :'}</h5>
                <div>
                    {this.getCartData()}
                    </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const {userRegisterLog,userCartItem} = state;
        return {
            userRegisterLog : userRegisterLog,
            userCartItem : userCartItem
        }
};

const mapDispatchToProps = dispatch => ({
    action: {
        addCartItemAction : bindActionCreators(addCartItem, dispatch),
        addUserCart : bindActionCreators(addUserCart, dispatch)
    }
});

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Paymentsuccess));