import{MART,PRODUCT,PRICE} from '../_actions/types';

export default function (state = {}, action) {
    switch (action.type) {
        case MART:
            return{...state,registerSuccess: action.payload}
            break;
        
        case PRODUCT:
            return{...state,register: action.payload}
            break;
            
        case PRICE:
            return{...state,userData:action.payload}
        default:
            return state;
            break;
    }
}