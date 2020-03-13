import axios from 'axios';

const GET_DOCTORS = 'GET_DOCTORS';

const initialState = {}; // have a normalized store of doctors

/*
 * ACTION CREATORS
 */
const getDoctors = doctors => ({ type: GET_DOCTORS, doctors });

/*
 * THUNK CREATORS
 */

export const loadDoctors = () => async dispatch => {
  try {
    // make API call to better doctors

    const res = await axios.get('/api/providers');
    dispatch(getDoctors(res.data || initialState));
  } catch (err) {
    console.error(err);
  }
};

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_DOCTORS:
      return action.doctors;
    default:
      return state;
  }
}
