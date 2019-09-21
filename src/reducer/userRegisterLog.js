const INITIAL_STATE = {
    userDetail: {},
    error_msg: ""
};

export const USER_REGISTER_SUCCESSFULLY = "USER_REGISTER_SUCCESSFULLY";
export const USER_LOGIN_SUCCESSFULLY = "USER_LOGIN_SUCCESSFULLY";
export const ERROR_WHILE_USER_REGISTER = "ERROR_WHILE_USER_REGISTER";
export const ERROR_WHILE_USER_LOGIN = "ERROR_WHILE_USER_LOGIN";
export const USER_LOGOUT_SUCCESSFULLY = "USER_LOGOUT_SUCCESSFULLY";
export const ERROR_WHILE_USER_LOGOUT = "ERROR_WHILE_USER_LOGOUT";

export default (state = INITIAL_STATE,action) => {
    switch(action.type){
        case USER_REGISTER_SUCCESSFULLY:{
            return Object.assign({},state,{userDetail: action.data,error_msg:null});
        }
        case ERROR_WHILE_USER_REGISTER:{
            return Object.assign({},state,{error_msg:action.data.error_msg});
        }
        case USER_LOGIN_SUCCESSFULLY:{
            return Object.assign({},state,{userDetail:action.data,error_msg:null});
        }
        case ERROR_WHILE_USER_LOGIN:{
            return Object.assign({},state,{error_msg:action.data.error_msg});
        }
        case USER_LOGOUT_SUCCESSFULLY:{
            return Object.assign({},state,{...state,userDetail:null});
        }
        default:
            return state;
    }
}
