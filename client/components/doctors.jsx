import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { loadDoctors } from '../store';

const Doctors = ({ doctors, loadDoctors }) => {
  useEffect(() => {
    // empty array tells effect to run only once
    loadDoctors(); // load them into redux state
  }, []);
  // guard for - in loop to prevent prototype leaking
  const arr = [];
  for (const key in doctors) {
    if ({}.hasOwnProperty.call(doctors, key)) {
      console.log(doctors[key]);
      arr[key] = doctors[key];
    }
  }

  return (
    <Fragment>
      <h2>List of Doctors</h2>
      <ol>
        {arr.map(doctor => {
          return (
            <li key={doctor.index}>
              <p>Accepting new patients: {doctor.newPatients ? 'Yes' : 'No'}</p>
              <p>City: {doctor.address.city}</p>
              <p>State: {doctor.address.state_long}</p>
              <p>Street: {doctor.address.street}</p>
              <p> Zip Code: {doctor.address.zip}</p>
              <p> Phone: {doctor.phone} </p>
              <p> Languages: {doctor.languages}</p>
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
    loadDoctors: () => dispatch(loadDoctors()),
  };
};

export default connect(stateToProps, dispatchToProps)(Doctors);
