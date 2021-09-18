import authReducer from './authReducer';
import {combineReducers} from 'redux';
import { EducationReducer } from './educationReducer';
import mailReducer from './mailReducer';


const rootReducer = combineReducers({
    auth: authReducer,
    education:EducationReducer,
    applicantMail: mailReducer,
});

export default rootReducer;