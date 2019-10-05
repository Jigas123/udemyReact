import React,{Component} from "react";
import {createBrowserHistory} from 'history';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as addinstructorAction from "../../action/addInstructor";
import * as instructorDetailAction from '../../action/instructorDetail';
import * as addCartItem from '../../action/userCartItem';

import {
    Alert,
    Button,
    Form,
    FormGroup,
    Input,
    Label,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    NavLink
} from "reactstrap";


const history = createBrowserHistory();

class AdminRegister extends Component{
    constructor(props){
        super(props);
        this.state = {
            name:null,
            eml:null,
            profession:null,
            selfDesc:null,
            pswd:null,
            selectedFile: null,
            errors : {},
            error_flag:false
        }
        this.onChangeHandler = this.onChangeHandler.bind(this);
    }

    onChangeHandler = (event) => {
        this.setState({
            selectedFile: event.target.files[0],
            loaded: 0,
        })
    }

    handleChange = (e,stateKet) => {
        this.setState({[stateKet]:e.target.value})
    }

    commonvalidation = (inputparameter) => {
        if(inputparameter == null || inputparameter.length < 10){
            if(inputparameter == null){
                return("Cannot be empty");
            }
            else if(inputparameter.length < 10){
                return("required atleast 10 character");
            }
            else if(inputparameter.length > 120){
                return("maximum length is 120 character");
            }
        }
        return true;
    }

    handleValidation = () => {
        let nameFormat = /[a-zA-Z][a-zA-Z ]*/;
        let emlFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let noSpace = /^\S+$/;
        let _validFileExtensions = [".jpg", ".jpeg", ".bmp", ".gif", ".png"];
        let errors = {};
        let commonresp;
        let formIsValidate = true;
        let name = this.state.name;
        let eml = this.state.eml;
        let profession = this.state.profession;
        let description = this.state.selfDesc;
        let pswd = this.state.pswd;
        let file = this.state.selectedFile;

        //name
        if(name != null){
            if(!name.match(nameFormat)){
                errors["name"] = "only letter is allowed";
                formIsValidate = false;
            }
            else if(name.length < 3){
                errors["name"] = "required atleast 3 character";
                formIsValidate = false;
            }
            else if(name.length > 20){
                errors["name"] = "Maximum Length is 20 character.";
                formIsValidate = false;
            }
        }
        else {
            errors["name"] = "Cannot be empty";
            formIsValidate = false;
        }

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

        //profession
        commonresp = this.commonvalidation(profession);
        if(commonresp != true){
            errors['profession'] = commonresp;
            formIsValidate = false;
        }

        //description
        commonresp = this.commonvalidation(description);
        if(commonresp != true){
            errors['selfDesc'] = commonresp;
            formIsValidate = false;
        }

        if(pswd == null || pswd.length > 0){
            if(pswd == null){
                errors["pswd"] = "Cannot be empty";
                formIsValidate = false;
            }
            else if(pswd.length > 0){
                if(!pswd.match(noSpace)){
                    errors["pswd"] = "space is not allowed";
                    formIsValidate = false;
                }
                else if(pswd.length < 5){
                    errors["pswd"] = "required atleast 5 character";
                    formIsValidate = false;
                }
                else if(pswd.length > 15){
                    errors["pswd"] = "Maximum Length is 15 character";
                    formIsValidate = false;
                }
            }
        }

            if(file){

                let extension = (file.name).substr((file.name).lastIndexOf('.')).toLowerCase();
                if(extension == ".jpg" || extension == ".jpeg" || extension == ".bmp" ||
                extension == ".gif" || extension == ".png"){
                }
                else {
                    errors["selectedFile"] = "Select only image file";
                    formIsValidate = false;
                }
            }
            else {
                errors["selectedFile"] = "Select image file";
                formIsValidate = false;
            }

        this.setState({errors : errors});
        return formIsValidate;
    }

    registerdata = async (event) => {
        event.preventDefault();
        if(this.handleValidation()){
            let name = this.state.name;
            let eml = this.state.eml;
            let profession = this.state.profession;
            let description = this.state.selfDesc;
            let pswd = this.state.pswd;
            let file = this.state.selectedFile;
            let fileName = file.name;
            let courses = 0;

            const data = new FormData();

            data.append('name', name);
            data.append('email', eml);
            data.append('profession', profession);
            data.append('selfDescription', description);
            data.append('courses', courses);
            data.append('password', pswd);
            data.append('instructorImage', file);

            const answer = await (this.props.action.addinstructorData.addInstructor(data));
            if(!answer){
                this.setState({error_flag:true})
            }
            else {
                if(await (this.props.action.instructorDetail.getAllInstructor())){
                    await (this.props.action.addCartItemAction.getCartItem(null));
                    localStorage.removeItem('addToCart');
                    this.props.toggle();

                    this.setState({
                        name:null,
                        eml:null,
                        profession:null,
                        selfDesc:null,
                        pswd:null,
                        selectedFile: null,
                        errors : {},
                        error_flag:false
                    });
                    this.props.history.push({pathname:'/adminpenal/'});
                }

            }
        }

    }

    render() {
        return (
            <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} className={this.props.className}>
                <ModalHeader toggle={this.props.toggle}>Sign Up and Make Course!</ModalHeader>
                <ModalBody>
                    <Form>
                        {this.state.error_flag ? (<Alert color="danger">There is an error while pass data.</Alert>): null}
                        <FormGroup>
                            <Input onChange = {event => this.handleChange(event,"name")} type="text" name="name" id="nam" placeholder="Full Name" value = {this.state.name || ''}/>
                            <span style={{color: "red"}}>{this.state.errors["name"]}</span>
                        </FormGroup>
                        <FormGroup>
                            <Input onChange = {event => this.handleChange(event,"eml")} type="email" name="email" id="email" placeholder="Email" value = {this.state.eml || ''}/>
                            <span style={{color: "red"}}>{this.state.errors["eml"]}</span>
                        </FormGroup>
                        <FormGroup>
                            <Input onChange = {event => this.handleChange(event,"profession")} type="textarea" name="profession" id="profession" placeholder="Profession" value = {this.state.profession || ''}/>
                            <span style={{color: "red"}}>{this.state.errors["profession"]}</span>
                        </FormGroup>
                        <FormGroup>
                            <Input onChange = {event => this.handleChange(event,"selfDesc")} type="textarea" name="selfDesc" id="selfDesc" placeholder="Self Description" value = {this.state.selfDesc || ''}/>
                            <span style={{color: "red"}}>{this.state.errors["selfDesc"]}</span>
                        </FormGroup>
                        <FormGroup>
                            <Input onChange = {event => this.handleChange(event,"pswd")} type="password" name="password" id="Password" placeholder="Password" value = {this.state.pswd || ''}/>
                            <span style={{color: "red"}}>{this.state.errors["pswd"]}</span>
                        </FormGroup>
                        <FormGroup>
                            <Label for="learn">Add Image</Label>
                            <input type="file" name="file" id="imgFile" onChange={(event) => this.onChangeHandler(event)}/>
                            <span style={{color: "red"}}>{this.state.errors["selectedFile"]}</span>
                        </FormGroup>
                        <Button className="btn-primary" onClick={this.registerdata.bind(this)}>Sign Up</Button>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <p>Already have an account?</p>
                    <NavLink onClick={this.props.onlinkclick}>Log In</NavLink>
                </ModalFooter>
            </Modal>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    action: {
        addinstructorData: bindActionCreators(addinstructorAction, dispatch),
        instructorDetail: bindActionCreators(instructorDetailAction, dispatch),
        addCartItemAction : bindActionCreators(addCartItem, dispatch)
    }
});

export default withRouter(connect(null,mapDispatchToProps)(AdminRegister));