import * as React from 'react';
import { Switch, Route } from 'react-router-dom';

import InvalidPage from '../../404';
import Results from '../../Results';
import Home from '../../Home';

export default function Router() {
    return (
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/search' component={Results}/>
            <Route component={InvalidPage}/>
        </Switch>
    )
}
