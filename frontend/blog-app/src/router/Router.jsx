import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import HomePage from '../pages/dashboard/HomePage'
import SignInPage from '../pages/SignInPage'
import PostPage from '../pages/dashboard/Posts/PostPage'

function Router() {
  return (
 <BrowserRouter>
    <Routes>
        <Route path='/dashboard' element={<HomePage/>}/>
        <Route path='/signin' element={<SignInPage/>}/>
        <Route path='/post' element={<PostPage/>}/>
    </Routes>
 </BrowserRouter>
  )
}

export default Router
