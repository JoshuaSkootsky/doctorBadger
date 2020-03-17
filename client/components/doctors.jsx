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

  // guard for - in loop to prevent prototype leaking
  console.log('doctors in the doctors display component', doctors);

  return (
    <Fragment>
      <h2>List of Doctors</h2>
      <ol>
        {Object.keys(doctors).map(key => {
          const doctor = doctors[key];
          return (
            <li key={key}>
              <p> Name: {doctor.name}</p>
              <p>Accepting new patients: {doctor.newPatients ? 'Yes' : 'No'}</p>
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
    </Fragment>
  );
};

const stateToProps = state => {
  return {
    doctors: state.doctors,
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
