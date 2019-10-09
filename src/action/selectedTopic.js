import {SELECTED_TOPIC_SET_SUCCESSFUL,ERROR_IN_SELECT_TOPIC} from '../reducer/selectedTopic';

export const getSelectedTopic = (Topic) =>{
    return (dispatch) => {
        try {
            dispatch({
                type:SELECTED_TOPIC_SET_SUCCESSFUL,
                data:Topic
            })
        }
        catch (e) {
            dispatch({
                type:ERROR_IN_SELECT_TOPIC,
                data:{error_msg:e.toString()}
            })
        }
    }
};
