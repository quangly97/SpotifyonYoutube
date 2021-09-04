import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {

    const access_token = localStorage.getItem('access_token');
    if (!access_token) return <Redirect to="/" />
    return <Route {...rest } render={props => <Component {...props} /> } />

}

export default PrivateRoute