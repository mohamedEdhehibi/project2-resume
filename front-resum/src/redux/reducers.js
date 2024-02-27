import srcproducts from '../source/products';
import {AUTH_USER,LOGOUT_USER,LOGIN_USER,REGISTER_USER, LOADING_USER}from './constant'
const initialState = {
    products: srcproducts,
    user: null,
    token:null,
    loading:false
};
const reducer = (state = initialState, action) => {
   
        switch (action.type) {
            case REGISTER_USER:
              return { ...state.user, register: action.payload }
              case LOGIN_USER:
             
                return { ...state, ...action.payload,loading:false };
                case AUTH_USER:
                    return { ...state, user: action.payload };
              
                  case LOGOUT_USER:
                    return { ...state, ...action.payload };
                  case LOADING_USER:
                    console.log("actionpayload",action.payload);
                    return { ...state ,loading:action.payload};
            default:
              return state
          }
}
export default reducer