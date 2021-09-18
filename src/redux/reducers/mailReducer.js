import { GET_CANDIDATES_ID } from "../types/mailActionType";

const initialState ={
    candidatesId:[]
}
const mailReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CANDIDATES_ID:
            return {...state, candidatesId:action.payload};
        default:
            return {...state};
    }
};

export default mailReducer;