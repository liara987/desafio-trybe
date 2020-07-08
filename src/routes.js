import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom'

import Login from './pages/Login';
import Home from './pages/Home';
import Atualizar from './pages/Atualizar';

const Routes = () => {
    return(
        <BrowserRouter>
            <Route component={Login} path="/login"/>
            <Route component={Home} path="/" exact/>
            <Route component={Atualizar} path="/atualizar" />
        </BrowserRouter>
    );
}

export default Routes;