import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { loadDoctors } from '../store';

const Doctors = props => {
  useEffect(() => {
    // empty array tells effect to run only once
    props.loadDoctors(); // load them into redux state
  }, []);

  return <p>List of Doctors goes here</p>;
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
