import React from 'react';
import { Route, Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConnectedNavigation } from './Navigation';
import { ConnectedLogin } from './Login';
import { ConnectedSignup } from './Signup';
import { AddTodo } from './AddTodo';
import { UpdateTodo } from './UpdateTodo';
import { store } from '../store';
import { history } from '../store/history';
import { Redirect } from 'react-router';
import { TodoApp } from './TodoContainer';

const RouteGuard = Component =>({match})=>
    !store.getState().session.authenticated ?
        <Redirect to="/"/> :
        <Component match={match}/>;

export const Main = ()=>(
    <Router history={history}>
        <Provider store={store}>
            <div className="container mt-3">
              <ConnectedNavigation/>
              <Route exact path="/" component={ConnectedLogin} />
              <Route exact path="/signup" component={ConnectedSignup}/>
              <Route exact
                      path="/dashboard"
                      render={RouteGuard(TodoApp)}/>
              <Route exact
                      path="/addTodo"
                      component= { AddTodo } /> 

              <Route exact
                      path="/task/:id"
                      component={ UpdateTodo } />
          </div>
            
        </Provider>
    </Router>
);