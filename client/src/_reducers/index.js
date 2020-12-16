import {combineReducers} from 'redux';
import user from './user_reducer';
import mart from './mart_reducer';

const rootReducer = combineReducers({
    user, mart
})

export default rootReducer