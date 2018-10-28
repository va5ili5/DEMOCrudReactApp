import React from 'react';
import {Switch, Route } from 'react-router-dom';
import ResponsivePages from './ResponsivePagesList';
import Edit from './EditResponsivePage';
import AddResponsivePage from './AddResponsivePage';

require("es6-promise").polyfill();
require("isomorphic-fetch");
const Main = () => (
    <main>
        <div className="container">
        <Switch>
            <Route exact path='/' component = {ResponsivePages}/>
            <Route exact path='/ResponsivePages/AddResponsivePage' component = {AddResponsivePage}/>
            <Route exact path='/ResponsivePages/edit/:id' component = {Edit}/>
        </Switch>
        </div>
    </main>
)

export default Main;