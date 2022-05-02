import * as React from 'react';
import { Routes, Route } from 'react-router-dom';

import InvalidPage from '../../404';
import Results from '../../Results';
import Home from '../../Home';

export default function Router() {
    return (
        <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/search' element={<Results />}/>
            <Route element={<InvalidPage />}/>
        </Routes>
    )
}
