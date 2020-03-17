import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { geolocated } from 'react-geolocated';

import { loadDoctors } from '../store';

let Doctors = ({ doctors, coords, getDoctors }) => {
  useEffect(() => {
    if (coords) {
      // load them into redux state
      getDoctors(coords);
    }
    // empty array tells effect to run only once
  }, [coords]); //update on coords latitude/long changing

  return (
    <Fragment>
      <h2>Doctors Close to You</h2>
      {doctors.length > 0 ? (
        <ol>
          {doctors.map(doctor => {
            return (
              <li key={doctor.uid}>
                <p> Name: {doctor.name}</p>
                <p>
                  Accepting new patients: {doctor.newPatients ? 'Yes' : 'No'}
                </p>
                {doctor.address ? (
                  <Fragment>
                    <p>City: {doctor.address.city}</p>
                    <p>State: {doctor.address.state_long}</p>
                    <p>Street: {doctor.address.street}</p>
                    <p> Zip Code: {doctor.address.zip}</p>{' '}
                  </Fragment>
                ) : (
                  <p> No address available</p>
                )}
                <p> Phone: {doctor.phone} </p>
              </li>
            );
          })}
        </ol>
      ) : (
        <p>Searching for doctors...</p>
      )}
    </Fragment>
  );
};

const stateToProps = state => {
  // map normalized Redux state to an array
  return {
    doctors: Object.keys(state.doctors).map(key => state.doctors[key]),
  };
};

const dispatchToProps = dispatch => {
  return {
    getDoctors: coords => dispatch(loadDoctors(coords)),
  };
};

Doctors = geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(Doctors);

export default connect(stateToProps, dispatchToProps)(Doctors);
