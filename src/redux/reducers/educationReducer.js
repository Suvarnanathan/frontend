import { FETCH_EDUCATION, FETCH_EDUCATION_FAIL, FETCH_EDUCATION_SUCCESS } from "../types/educationType";


const EducationReducer = (
  state = {
    education: {
      fetching: false,
      error: { status: false, message: null },
      data: [],
    },
  }, action,
) => {
  switch (action.type) {
    case FETCH_EDUCATION:
      return {
        ...state,
        education: {
          fetching: false,
          error: { status: false, message: null },
          data: [],
        },
      };

    case FETCH_EDUCATION_SUCCESS:
      return {
        ...state,
        education: {
          ...state.education,
          fetching: true,
          data: action.payload.education,
        },
      };
    case FETCH_EDUCATION_FAIL:
      return {
        ...state,
        education: {
          ...state.education,
          fetching: false,
          error: { status: true, message: action.payload },
        },
      };

    default:
      return state;
  }
};

export { EducationReducer }