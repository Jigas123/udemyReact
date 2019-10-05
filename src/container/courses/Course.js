import '../../../node_modules/video-react/dist/video-react.css';
import '../card-slider/cardSlider.css';
import React,{Component} from 'react';
import { Button, Popover, PopoverHeader, PopoverBody,NavLink } from 'reactstrap';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import AddToCart from './addToCart';
import { Player } from 'video-react';
import poster from '../../Asset/slider.png';

const history = createBrowserHistory();
class Cards extends Component {
    constructor(props){
        super(props);
        this.cardData = [];
        this.state = {
            popoverOpen: false,
            modal:false,
            id:null
        };
        this.addToCart = this.addToCart.bind(this);
    }

    onCourseClick = (cart) =>{
        this.props.history.push({pathname:'/course-detail/',state:cart,search:"?id="+cart._id})
    }

    onHover = (e) => {
        this.setState({
            id:e,
            popoverOpen: true
        });
    }
    onHoverOut = () => {
        this.setState({
            popoverOpen: false
        });
    }

    addToCart(){
        this.setState(prevState => ({
            modal: !prevState.modal,
            popoverOpen: false
        }));
    }

    onLink = () => {
        this.addToCart();
    }

    render() {
        let newCardObject;
        let lngth = this.props.cardData.length;
        let selectedData = {};
        let cartflag = 0;
        this.cardData = this.props.cardData;
        try {
            return (
                <div>
                    <section onMouseLeave={() => this.onHoverOut()}>
                        {
                            this.cardData.map((card, i) => {
                                cartflag = 0;
                                let coursefullName = card.course_Name;
                                const courseName = () => {
                                    if (coursefullName.length < 41)
                                        return coursefullName;
                                    else
                                        return coursefullName.substring(0, 41) + "..";
                                };
                                let price = parseInt(card.price);
                                let offer = parseInt(card.offer);
                                let discount = parseInt(price - ((price * offer) / 100));

                                let learnPoint = card.learn.map(function (learnPoint, index) {
                                    if (index < 4)
                                        return (<li>{learnPoint}</li>);
                                });
                                if(this.props.userRegisterLog.userDetail !== null && this.props.userRegisterLog.userDetail.role == 0){
                                    if(this.props.userRegisterLog.userDetail.cartData.length > 0){
                                        this.props.userRegisterLog.userDetail.cartData.map(function (cartData,index) {
                                            if(cartData.course_Name == card.course_Name){
                                                cartflag = 1;
                                            }
                                        });
                                    }

                                }
                                else if(localStorage.getItem('addToCart') !== null){
                                    let cartDataStorage = JSON.parse(localStorage.getItem('addToCart'));

                                    cartDataStorage.map(function (cartData,index){
                                        if(cartData.course_Name == card.course_Name){
                                            cartflag = 1;
                                        }
                                    })
                                }
                                return (
                                    <>
                                        <div className="card" id="card" style={this.props.cardStyle} key={i}
                                             onMouseOver={() => this.onHover('Popover-' + i)} onClick={this.onCourseClick.bind(this,card)}>
                                            <div id={'Popover-' + i} key={i+"Card"}>
                                                <div className="card-wrap" key={i+"CardUnder"}>
                                                    <img src={poster} />
                                                    <p className="title">{courseName()}</p>
                                                    <p className="desc">{card.created_By.join()}</p>
                                                    {discount === price ? null
                                                        :
                                                        <p className="desc">{"Price: "}<strike>{price}</strike></p>
                                                    }
                                                    <p className="desc">{"discounted Price: "}{discount}</p>
                                                </div>
                                            </div>
                                        </div>

                                        {('Popover-' + i) === this.state.id ?
                                            (<><Popover placement="left" id={i} key={i+"Popover"}
                                                        isOpen={this.state.popoverOpen} target={'Popover-' + i}>
                                                    <PopoverHeader className="fix-header" key={i+"header"}>
                                                        {card.course_Name}</PopoverHeader>
                                                    <PopoverBody className="fix-body" key={i+"Body"}><p>{"in" + card.category_Name}</p><p>{card.course_Subtitle}</p>
                                                        <p>{learnPoint}</p>
                                                        { cartflag == 1 ?
                                                                    <a href="http://localhost:3000/cart/">
                                                                        <Button key={i+"goto"} id="btn-position" outline color="secondary" >Go to cart</Button></a>
                                                                    : <Button key={i+"addToCart"} id="btn-position" className="btn-primary" onClick={this.addToCart}>Add to cart</Button>
                                                        }

                                                    </PopoverBody>

                                                </Popover>
                                                    <AddToCart key={"AddToCart"+i} isOpen={this.state.modal}  toggle={this.addToCart} className={this.props.className}
                                                               onlinkclick = {this.onLink.bind(this)} data = {this.state.modal ? {"course_Name":card.course_Name,"course_Img":poster,"created_By":card.created_By.join(),
                                                        "price":price,"discount":discount,"category_Name":card.category_Name}: null} />
                                                </>
                                            )
                                            : null
                                        }
                                    </>
                                )

                            })
                        }
                    </section>
                </div>

            )
        }catch (e) {
            return (
                <div>there is no any data in this category.</div>
            );
        }
    }
}

const mapStateToProps = (state) => {
    const {userRegisterLog} = state;
    return {
        userRegisterLog : userRegisterLog
    }
};

export default withRouter(connect(mapStateToProps,null)(Cards));
