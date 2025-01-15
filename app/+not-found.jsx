// app/+not-found.jsx
import React from 'react';
import { Redirect } from 'expo-router';

const NotFound = () => {
  return <Redirect href="/" />;
};

export default NotFound;
