const INITIAL_STATE = {
    AllSelectedTopic: {}
};

export const SELECTED_TOPIC_SET_SUCCESSFUL = "SELECTED_TOPIC_SET_SUCCESSFUL";
export const ERROR_IN_SELECT_TOPIC = "ERROR_IN_SELECT_TOPIC";

export default (state = INITIAL_STATE,action) => {
    switch (action.type){
        case SELECTED_TOPIC_SET_SUCCESSFUL:{
            return Object.assign({},state,{...state,AllSelectedTopic:action.data});
        }
        case ERROR_IN_SELECT_TOPIC:{
            return Object.assign({},state,{error_msg:action.data.error_msg});
        }
        default:
            return state;
    }
}
