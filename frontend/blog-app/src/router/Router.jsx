import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import DashboardPage from '../pages/DashboardPage'
import SignInPage from '../pages/SignInPage'

function Router() {
  return (
 <BrowserRouter>
    <Routes>
        <Route path='/dashboard' element={<DashboardPage/>}/>
        <Route path='/signin' element={<SignInPage/>}/>
    </Routes>
 </BrowserRouter>
  )
}

export default Router
