import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { geolocated } from 'react-geolocated';

import { loadDoctors } from '../store';

let Doctors = props => {
  const doctors = props.doctors;
  const dispatchDoctors = props.loadDoctors;
  useEffect(() => {
    console.log('props.coords', props.coords);
    if (props.coords) {
      console.log('props.coords.latitude', props.coords.latitude);
      dispatchDoctors(props.coords);
    }
    // empty array tells effect to run only once

    // load them into redux state
    console.log('dispatchedDoctors!');
  }, [props.coords]); //update on latitude changing
  // guard for - in loop to prevent prototype leaking

  const arr = [];
  for (const key in doctors) {
    if ({}.hasOwnProperty.call(doctors, key)) {
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
      {!props.isGeolocationAvailable ? (
        <div>Your browser does not support Geolocation</div>
      ) : !props.isGeolocationEnabled ? (
        <div>Geolocation is not enabled</div>
      ) : props.coords ? (
        <table>
          <tbody>
            <tr>
              <td>latitude</td>
              <td>{props.coords.latitude}</td>
            </tr>
            <tr>
              <td>longitude</td>
              <td>{props.coords.longitude}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <div>Getting the location data&hellip; </div>
      )}
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
    loadDoctors: coords => dispatch(loadDoctors(coords)),
  };
};

Doctors = geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(Doctors);

export default connect(stateToProps, dispatchToProps)(Doctors);
