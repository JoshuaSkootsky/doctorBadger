import axios from 'axios';

const doctorsApiKey = process.env.DOCTORS_API_KEY;

const GET_DOCTORS = 'GET_DOCTORS';

const initialState = {}; // have a normalized store of doctors

/*
 * ACTION CREATORS
 */
const getDoctors = user => ({ type: GET_USER, getDoctors });

/*
 * THUNK CREATORS
 */

export const loadDoctors = () => async dispatch => {
  try {
    // make API call to better doctors

    const res = await axios.get('/auth/me');
    console.log(res);
    dispatch(getUser(res.data || initialState));
  } catch (err) {
    console.error(err);
  }
};
