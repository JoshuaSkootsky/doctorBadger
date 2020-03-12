import axios from 'axios';

const api_key = process.env.DOCTORS_API_KEY;

const doctorsResource =
  'https://api.betterdoctor.com/2016-03-01/doctors?location=37.773,-122.413,100&skip=2&limit=10&user_key=' +
  api_key;

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

    const res = await axios.get(doctorsResource);
    console.log(res);
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
