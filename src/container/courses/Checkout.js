import React,{Component} from 'react';
import './Checkout.css';
import {Media,Button} from "reactstrap";
import poster from '../../Asset/slider.png';
import axios from 'axios/index';
import App from '../../payment/CardForm';

class Checkoutpag extends Component {
    constructor(props) {
        super(props);
        this.cartDataMap = [];
        this.getAllCheckoutData = this.getAllCheckoutData.bind(this);
        this.totalPrice = 0;
    }

    courseName = (course_Name) => {
        if (course_Name.length < 24)
            return course_Name;
        else
            return course_Name.substring(0, 24) + "..";
    };

    sendPayment = (event,payment) => {
        const data = {
            amount: payment
        };
        axios.post( 'http://192.168.0.104:8000/payment/bid', data )
            .then( res => {
                console.log( 'resp', res.data );
                window.location.href = res.data;

            } )
            .catch( ( error ) => console.log( error.response.data ) );
    }

    getAllCheckoutData = () => {
        this.totalPrice = 0;
        this.cartDataMap = [];
        const that = this;
        let CardData = this.props.location.state;
        localStorage.setItem('finalCartData',JSON.stringify(CardData));
        try {
            CardData.map(function (Cart, index) {
                that.cartDataMap.push(
                    <Media className="checkout-wrap" key={index}>
                        <Media left>
                            <Media object src={poster} height="35px" width="35px"/>
                        </Media>
                        <Media body>
                            <Media heading>
                                <div className='checkout-wrap course-wrap'>
                                    <div className='d-flex flex-column w-75'>
                                        <p>{that.courseName(Cart.course_Name)}</p>
                                        <p className="instructorName">{Cart.created_By}</p>
                                        <div className='d-inline-flex'>
                                            <p>{Cart.discount}</p>
                                            <p><strike>{Cart.price}</strike></p>
                                        </div>
                                    </div>
                                </div>
                            </Media>
                            <div>

                            </div>
                        </Media>
                    </Media>
                )
                that.totalPrice += Cart.discount;
            })
        }
        catch (e) {
            that.cartDataMap.push(<div>There is no any data available</div>);
        }

    }

    render(){
        this.getAllCheckoutData();
        return(
            <div className="main-checkout-wrap">
                <div><h5>Your Items({this.cartDataMap.length})</h5></div>
                <div className="checkout-data">
                    {this.cartDataMap}
                </div>
                <div>
                    <h5>{"Total amount: "+this.totalPrice}</h5>
                    <Button onClick={(event) => this.sendPayment(event,this.totalPrice)}>Pay now</Button>
                </div>
            </div>
        );
    }
}

export default Checkoutpag;
