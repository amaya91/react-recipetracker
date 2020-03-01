
import React from 'react';
import { Switch } from 'react-router';
import AuthenticatedRoute from './components/AuthenticatedRoute';
import Create from './containers/create/create';
import Main from './containers/main/main';
import Recipe from './containers/recipe/recipe';
import UnauthenticatedRoute from './components/UnauthenticatedRoute';
import Login from './containers/login/login';

export default ({ childProps }) => (
    <Switch>
        <AuthenticatedRoute
            path="/" exact
            component={Main}
            props={childProps}
        />
        <AuthenticatedRoute
            path="/create" 
            component={Create}
            props={childProps}
        /> 
        <AuthenticatedRoute
            path="/recipe/:id"
            component={Recipe}
            props={childProps}
        /> 
        <UnauthenticatedRoute
            path="/login"
            component={Login}
            props={childProps}
        /> 
    </Switch>
)


