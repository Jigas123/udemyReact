import {CART_ITEM_ADDED_SUCCESSFULLY,ERROR_WHILE_ADD_CART_ITEM,CART_ITEM_REMOVE_SUCCESSFULLY,
ERROR_WHILE_REMOVE_CART_ITEM} from '../reducer/userCartItem';

export const getCartItem = (cartItem) =>{
    return (dispatch) => {
        try {
            dispatch({
                type:CART_ITEM_ADDED_SUCCESSFULLY,
                data:cartItem
            })
        }
        catch (e) {
            dispatch({
                type:ERROR_WHILE_ADD_CART_ITEM,
                data:{error_msg:e.toString()}
            })
        }
    }
};

export const removeCartItem = () =>{
    let cartStorage = [];
    return (dispatch) => {
        try {
            dispatch({
                type:CART_ITEM_REMOVE_SUCCESSFULLY,
                data:cartStorage
            })
        }
        catch (e) {
            dispatch({
                type:ERROR_WHILE_REMOVE_CART_ITEM,
                data:{error_msg:e.toString()}
            })
        }
    }
};