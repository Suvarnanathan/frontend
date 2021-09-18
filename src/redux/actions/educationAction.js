import { FETCH_EDUCATION, FETCH_EDUCATION_SUCCESS, FETCH_EDUCATION_FAIL } from "../types/educationType"

const fetchEducationSuccess = (education) => ({
    type: FETCH_EDUCATION_SUCCESS,
    payload: education,
  });

const fetchEducationFail = (err) => ({
  type: FETCH_EDUCATION_FAIL,
  payload: err.success,
});

export { fetchEducationSuccess, fetchEducationFail }