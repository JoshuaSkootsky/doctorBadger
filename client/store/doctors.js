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

export const loadDoctors = coords => async dispatch => {
  try {
    console.log('Loading doctors from doctors thunk, coords: ', coords);
    // make API call to better doctors
    let res;
    if (coords) {
      res = await axios.get('/api/practices', {
        params: {
          lat: coords.latitude,
          long: coords.longitude,
        },
      });
    }
    if (!coords) {
      res = await axios.get('/api/practices');
    }
    dispatch(getDoctors(res.data || initialState));
  } catch (err) {
    console.error(err, 'error GET /api/practices');
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
