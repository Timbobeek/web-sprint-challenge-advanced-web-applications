import React from 'react';
import { Route } from "react-router-dom";
import styled from 'styled-components';

import Header from './Header';
import BloomHeader from './BloomHeader';
import Login from './Login';
import View from './View';
import Logout from './Logout';

import PrivateRoute from './PrivateRoute';

const App = () => {
  return (
    <AppContainer>
      <BloomHeader/>
      <Header/>
      <RouteContainer>
        
        <Route exact path="/">
          <Login/>
        </Route>
        
        <Route path="/login">
          <Login/>
        </Route>
        
        <PrivateRoute path="/view" component={View}/>

        <PrivateRoute path="/logout" component={Logout}/>

      </RouteContainer>
    </AppContainer>
  )
}

export default App;

const AppContainer = styled.div`
  height: 100%;
`
const RouteContainer = styled.div`
  display: flex;
  height: 85%;
  align-items: center;
  flex-direction: column;
`
