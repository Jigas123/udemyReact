import * as AddInstructor from '../service/addInstructor';
import {USER_REGISTER_SUCCESSFULLY,ERROR_WHILE_USER_REGISTER} from '../reducer/userRegisterLog';
export const addInstructor = (instructorData) => dispatch => {
    return AddInstructor.addInstructor(instructorData)
        .then((response) => {
            if(response.status == 200){
                localStorage.setItem("LoginUser",JSON.stringify(response.data));
                dispatch({
                   type:USER_REGISTER_SUCCESSFULLY,
                   data:response.data
                });
                return true;
            }
        }).catch((error) => {
            if(error.response){
                dispatch({
                    type:ERROR_WHILE_USER_REGISTER,
                    data: {error_msg:error.response? error.response.data.error : 'there is an error while calling API'}
                })
                return false;
            }
        })
}
