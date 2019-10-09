import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as userLog from '../../action/userRegisterLog';
import * as addCartItem from '../../action/userCartItem';
import {withRouter} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import AdminRegister from './AdminRegister';
import Register from './registerModel';
import Login from './loginModel';
import './autoComplete.css';

import 'antd/dist/antd.css';
import {
    Collapse,
    DropdownToggle,
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    InputGroup,
    InputGroupAddon,
    Input,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Label,
    FormText,
    PopoverHeader,Tooltip,
    PopoverBody,UncontrolledPopover,DropdownMenu,DropdownItem
} from 'reactstrap';
import '@fortawesome/free-solid-svg-icons';
import {Link} from "react-router-dom";
import logo from '../../Asset/logo-coral.svg';
import cartImg from '../../Asset/images (1).png';
import {Menu, Dropdown, Icon} from 'antd';
import './header.css';

const {SubMenu} = Menu;
const history = createBrowserHistory();

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            modal: false,
            Loginmodal: false,
            adminRegisterModal: false,
            error: null,
            popoveronbtn1:false,
            popoveronbtn2:false,
            cartCount:null,
            tooltipOpen: false,
            tooltipOpenTech: false,
            searchValue:null,
            searchOption:[]
        };
        this.handleGenreSelect = this.handleGenreSelect.bind(this);
        this.registrPopup = this.registrPopup.bind(this);
        this.LoginPopup = this.LoginPopup.bind(this);
        this.openAdminRegister = this.openAdminRegister.bind(this);
        this.toggle = this.toggle.bind(this);
        // this.searchContent = this.searchContent.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onLinkAdmin = this.onLinkAdmin.bind(this);
        this.onLink = this.onLink.bind(this);
        // this.mapSearchable = this.mapSearchable.bind(this);
    }

    handleChange = (e,searchValue) => {
                const that = this;
                let searchArray = [];
                let inputValue = e.target.value;
                let categories = this.props.categorydetail.Allcategory;

                if(inputValue !== ""){
                    this.searchCategory = (categories) => {
                        categories.map(function (element,key) {
                         if(element.subcategory && element.subcategory.length){
                                if(((element.name.toLowerCase()).indexOf(inputValue.toLowerCase()))>-1){

                                    searchArray.push(element.name);
                                }
                                {that.searchCategory(element.subcategory)}
                            }
                            else{
                                if(((element.name.toLowerCase()).indexOf(inputValue.toLowerCase()))>-1){
                                    searchArray.push(element.name);
                                }
                            }
                            return 0;
                    });

                    }
                    this.searchCategory(categories);

                    this.props.courses.AllCourses.map(function (course,index) {
                        if(course.course_Name.toLowerCase().search(inputValue.toLowerCase()) !== -1){
                            searchArray.push(course.course_Name);
                        }
                    });
                }

                // window.sessionStorage.setItem("searchValue",inputValue);
                this.setState({searchValue : inputValue,searchOption:searchArray.slice(0)})

    }

    onLogoClick = () => {
        this.props.history.push({pathname:'/'});
    }

    setSelectedValue = (elementName) => {

        if(this.state.searchValue !== elementName){
            // window.sessionStorage.setItem("searchValue",elementName);
            this.setState({searchValue : elementName,searchOption:[]})
        }
    }

    // componentDidMount(){
    //     let searchValue = window.sessionStorage.getItem("searchValue");
    //     if(this.state.searchValue !== searchValue){
    //         this.setState({
    //             searchValue : searchValue
    //         }, () => {
    //             if(searchValue !== null){
    //                 // this.searchContent();
    //             }
    //         });
    //     }
    // }

    openCart = () => {
        this.props.history.push({pathname:'/cart/'});
    }

    searchContent = () => {
        let searchableCourse = [];
        let searchFlag = 0;
        const that = this;

        let categories = this.props.categorydetail.Allcategory;
        if(this.state.searchValue){
            this.searchCategory = (categories) => {
                categories.map(function (element,key) {
                    if(element.subcategory && element.subcategory.length){
                        if(element.name.toLowerCase() === that.state.searchValue.toLowerCase()){
                            searchFlag = 1;
                            that.props.history.push({pathname:'/courses/',state:element.name});
                        }
                        {that.searchCategory(element.subcategory)}
                    }
                    else{
                        if(element.name.toString().toLowerCase() === that.state.searchValue.toString().toLowerCase()){
                            searchFlag = 1;
                            that.props.history.push({pathname:'/topic/',state:element.name});
                        }
                    }
                    return 0;
                });
            }
            this.searchCategory(categories);
            searchableCourse = [];
            if(!searchFlag){
                    this.props.courses.AllCourses.map(function (course,index) {
                        if(course.course_Name.toLowerCase().search(that.state.searchValue.toLowerCase()) !== -1){
                            searchFlag = 1;
                            searchableCourse.push(course);
                        }
                    });
            }
            if(!searchFlag){
                this.props.courses.AllCourses.map(function (course,index) {
                    if(course.created_By[0].toString().toLowerCase().search(that.state.searchValue.toString().toLowerCase()) !== -1){
                        searchFlag = 1;
                        searchableCourse.push(course);
                    }
                });
            }
            if(searchableCourse.length > 0){
                this.props.history.push({pathname:'/searchableData/',state:searchableCourse});
            }
        }
        else {
            this.props.history.push({pathname:'/'});
        }
        this.setState({searchValue:null,searchOption:[]});
    }

    toggle = (tooltip) => {
        this.setState({
            [tooltip]: !this.state[tooltip]
        });
    }

    openAdminRegister = () => {
        if(!this.state.adminRegisterModal){
            this.setState(prevState => ({
                tooltipOpen: !prevState.tooltipOpen
            }))
        }
        this.setState(prevState => ({
            adminRegisterModal: !prevState.adminRegisterModal
        }));
    }

    onEnter = (event) => {
        if(event.target.id == "pop1")
            this.setState({popoveronbtn1: true})
        else
            this.setState({popoveronbtn2:true})
    }

    onOut = (event) => {
        if(event.target.id == "pop1")
            this.setState({popoveronbtn1: false})
        else
            this.setState({popoveronbtn2:false})
    }


    registrPopup() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }
    LoginPopup(){
        this.setState(prevState => ({
            Loginmodal: !prevState.Loginmodal
        }));
    }
    onLink(){
        this.registrPopup(); this.LoginPopup();
    }
    onLinkAdmin(){
        this.openAdminRegister(); this.LoginPopup();
    }

    logoutUser = async (e) => {
        e.preventDefault();
        if(this.state.searchValue !== '' || this.state.searchValue !== null){
            this.setState({searchValue:null})
        }
        await (this.props.action.addCartItemAction.getCartItem(null));
        await (this.props.action.userdetail.getUserLogout());
        this.props.history.push({pathname: '/'})
    }

    OpenPenal = (e) => {
        e.preventDefault();
        this.props.history.push({pathname:'/adminpenal/'});
    }

    handleGenreSelect = (e,getarray) => {
                localStorage.removeItem("topic");
                localStorage.removeItem("subcategory");

                let topicStorage = [];
                let path = getarray[0];
                path = path.toLowerCase();
                path = path.replace(" ","-");
                this.props.history.push({pathname:'/'+getarray[1]+'/',state:getarray[0]});
    };

    appendNotification = () => {
        if(this.props.userCartItem.cartItem !== null){
            let cartData = this.props.userCartItem.cartItem.length;
            if(cartData)
                return cartData;
        }
        return null;
    }

    appendcategory = (categories) => {
        let that = this;
        try {
            return categories.map(function (element,key) {
                return (
                    element.subcategory && element.subcategory.length ?
                        <SubMenu item = {["courses",element.name]} title={element.name} onTitleClick={(event) => that.handleGenreSelect(event,[element.name,"courses"])} key={element.name}>
                            {that.appendcategory(element.subcategory)}
                        </SubMenu>
                        :
                        (<Menu.Item key={element.name} item = {["topic",element.name]} onClick={(event) => that.handleGenreSelect(event,[element.name,"topic"])}>{element.name}</Menu.Item>)
                )
            });
        }
        catch (e) {
            console.log("there is an error like: ",e);
        }
    };

    render() {
        this.appendNotification();
        if(this.props.userRegisterLog.userDetail !== null){
            console.log(this.props.userRegisterLog.userDetail.role);

        }
        const menu = (<Menu>
                        {this.appendcategory(this.props.categorydetail.Allcategory)}
                    </Menu>);
        return (
                <div className="header-custom">
                        <Navbar color="light" light expand="md" className='w-100 navbar-main-wrap'>
                            <NavbarBrand onClick={this.onLogoClick.bind(this)}><img src={logo} width="110" height="32"/></NavbarBrand>
                            <Collapse isOpen={this.state.isOpen} navbar>
                                <Nav navbar className='align-items-center w-100'>
                                    <UncontrolledDropdown nav inNavbar>
                                        <Dropdown overlay={menu}>
                                                <a className="ant-dropdown-link header-cat">
                                                    Categories <Icon type="down"/>
                                                </a>
                                            </Dropdown>
                                    </UncontrolledDropdown>
                                    <NavItem className='navitem-width'>
                                        <InputGroup className="d-flex input-wrap" id="wrapedInput">
                                            <div className="AutoCompleteText">
                                            <Input className="searchBar" type="text" id="searchInput" onChange = {(event) => this.handleChange(event,'searchValue')}
                                            value = {this.state.searchValue || ''}/>

                                            {this.state.searchOption.length > 0 ?
                                                (<ul className="searchableList">
                                                    {
                                                        this.state.searchOption.map((elementName, index) =>
                                                            <li key={index} onClick={() => this.setSelectedValue(elementName)}>{elementName}</li>)
                                                    }
                                                </ul>)
                                                : null
                                            }
                                            </div>
                                            <InputGroupAddon addonType="append" id="searchContent">
                                                <Button color="white" onClick={(event) => this.searchContent(event)}><i className="fa fa-search"/></Button>
                                            </InputGroupAddon>
                                        </InputGroup>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink>
                                            <Button id="PopoverClick" type="button">
                                                Udemy for Business
                                            </Button></NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink>
                                            <Button id="PopoverLegacy" type="button">
                                            Teach on Udemy
                                        </Button></NavLink>
                                    </NavItem>
                                    {this.props.userRegisterLog.userDetail !== null && this.props.userRegisterLog.userDetail.role == '1' ? null
                                        :
                                        (<NavItem>
                                            <a onClick={this.openCart.bind(this)} className="notification"><img
                                                className="icon " alt="1" src={cartImg}/>
                                                <span className="badge">{this.appendNotification()}</span>
                                            </a>
                                        </NavItem>)
                                    }
                                    {this.props.userRegisterLog.userDetail == null ?(
                                        <>
                                        <NavItem>
                                            <NavLink className="cart"><Button className='btn-custom login mr-2 bg-white' onClick={this.LoginPopup}>log in</Button>
                                            </NavLink>
                                        </NavItem>
                                        <NavItem>
                                        <NavLink className="cart"><Button className='btn-custom login border-0' onClick={this.registrPopup}>Sign Up</Button>
                                        </NavLink>
                                        </NavItem>
                                        </>
                                        ):
                                        <NavItem>
                                            <UncontrolledDropdown nav inNavbar>
                                                <DropdownToggle>
                                                    {this.props.userRegisterLog.userDetail.name.charAt(0).toUpperCase()}
                                                </DropdownToggle>
                                                <DropdownMenu right>
                                                    <DropdownItem onClick={this.logoutUser.bind(this)}>
                                                        Logout
                                                    </DropdownItem>
                                                    {this.props.userRegisterLog.userDetail.role == '1' ? (
                                                        <DropdownItem onClick={this.OpenPenal.bind(this)}>
                                                            AdminPenal
                                                        </DropdownItem>
                                                    ) : null}
                                                </DropdownMenu>
                                            </UncontrolledDropdown>
                                        </NavItem>
                                    }

                                </Nav>
                            </Collapse>
                        </Navbar>
                        <AdminRegister isOpen = {this.state.adminRegisterModal} toggle={this.openAdminRegister} className={this.props.className}
                                       onlinkclick = {this.onLinkAdmin} />
                        <Register isOpen = {this.state.modal} toggle={this.registrPopup} className={this.props.className}
                            onlinkclick = {this.onLink} />

                        <Login isOpen={this.state.Loginmodal} toggle={this.LoginPopup} className={this.props.className}
                               onlinkclick = {this.onLink} />
                    <Tooltip className="tooltip-color" placement="top" isOpen={this.state.tooltipOpen} autohide={false} target="PopoverClick" toggle={this.toggle.bind(this,"tooltipOpen")}>
                        <span>Get your team access to 3,500+ top<br/>
                            Udemy courses anytime, anywhere</span>
                        {this.props.userRegisterLog.userDetail === null ?
                            (<a onClick={this.openAdminRegister}><div className="linkFont">Try Udemy for Business</div></a>)
                        : null
                        }

                    </Tooltip>
                    <Tooltip placement="top" isOpen={this.state.tooltipOpenTech} autohide={false} target="PopoverLegacy" toggle={this.toggle.bind(this,"tooltipOpenTech")}>
                        <span>Turn what you know into an opportunity<br />
                            and reach millions around the world.</span>
                        <a className="linkFont" onClick={()=> window.open("https://www.udemy.com/teaching/?ref=teach_header", "_blank")}><div className="linkFont">Learn more</div></a>
                    </Tooltip>
                </div>
        );

    }
}

const mapStateToProps = (state) => {
    const {categorydetail,userRegisterLog,userCartItem,courses} = state;
    return {
        categorydetail: categorydetail,
        userRegisterLog: userRegisterLog,
        userCartItem: userCartItem,
        courses : courses
    }
};

const mapDispatchToProps = dispatch => ({
    action: {
        userdetail: bindActionCreators(userLog, dispatch),
        addCartItemAction : bindActionCreators(addCartItem, dispatch)
    }
});

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Header))

