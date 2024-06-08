import axios from 'axios';
import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router';


function SignInPage() {
const [email,setEmail]= useState('')
const [password,setPassword]= useState('')
const [info, setInfo]= useState('')
// const [token,setToken]= useState(null)
const navigate = useNavigate()

useEffect(()=>{
  tokenHandler()
},[])

        const tokenHandler = async(e) => {
          try {
            const res =  await axios.get('http://localhost:4000/api/token')
            console.log(res);
            navigate('/dashboard')
          } catch (error) {
            console.log(error.response)
            navigate('/signin')
          }
        }

        const SignInhandler = async (e)=> {
        e.preventDefault();

        const data = {
            email : email,
            password : password
        }

        try {
            // console.log(email, password)
           const res =  await axios.post('http://localhost:4000/api/login', data);
            console.log(res)
            navigate('/dashboard')
        } catch (error) {
            if (error.message) {
            console.error(error.response.data)
            setInfo(error.response.data)
            }
        }
    }



  return (
<section>
<div className="page page-center">
      <div className="container container-tight py-4">
        <div className="text-center mb-4">
          <a href="." className="navbar-brand navbar-brand-autodark"><img src="./static/logo.svg" height="36" alt=""/></a>
        </div>
        <div className="card card-md">
          <div className="card-body">
            <h2 className="h2 text-center mb-4">{info.msg}</h2>
            <h2 className="h2 text-center mb-4">Login to your account</h2>
            <form onSubmit={SignInhandler} autocomplete="off" novalidate>
              <div className="mb-3">
                <label className="form-label">Email address</label>
                <input type="email" className="form-control" placeholder="your@email.com" autocomplete="off" value={email} onChange={(e)=>setEmail(e.target.value)}/>
              </div>
              <div className="mb-2">
                <label className="form-label">
                  Password
                  <span className="form-label-description">
                    <a href="./forgot-password.html">I forgot password</a>
                  </span>
                </label>
                <div className="input-group input-group-flat">
                  <input type="password" className="form-control"  placeholder="Your password"  autocomplete="off" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                  <span className="input-group-text">
                    <a href="." className="link-secondary" title="Show password" data-bs-toggle="tooltip">
                      <svg xmlns="http://www.w3.org/2000/svg" className="icon" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" /></svg>
                    </a>
                  </span>
                </div>
              </div>
              <div className="mb-2">
                <label className="form-check">
                  <input type="checkbox" className="form-check-input"/>
                  <span className="form-check-label">Remember me on this device</span>
                </label>
              </div>
              <div className="form-footer">
                <button type="submit" className="btn btn-primary w-100">Sign in</button>
              </div>
            </form>
          </div>
          <div className="hr-text">or</div>
          <div className="card-body">
            <div className="row">
              <div className="col"><button href="" className="btn w-100">
                  
                  <svg xmlns="http://www.w3.org/2000/svg" className="icon text-github" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" /></svg>
                  Login with Github
                </button></div>
              <div className="col"><button href="#" className="btn w-100">
                 
                  <svg xmlns="http://www.w3.org/2000/svg" className="icon text-twitter" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M22 4.01c-1 .49 -1.98 .689 -3 .99c-1.121 -1.265 -2.783 -1.335 -4.38 -.737s-2.643 2.06 -2.62 3.737v1c-3.245 .083 -6.135 -1.395 -8 -4c0 0 -4.182 7.433 4 11c-1.872 1.247 -3.739 2.088 -6 2c3.308 1.803 6.913 2.423 10.034 1.517c3.58 -1.04 6.522 -3.723 7.651 -7.742a13.84 13.84 0 0 0 .497 -3.753c0 -.249 1.51 -2.772 1.818 -4.013z" /></svg>
                  Login with Twitter
                </button></div>
            </div>
          </div>
        </div>
        <div className="text-center text-muted mt-3">
          Don't have account yet? <a href="./sign-up.html" tabindex="-1">Sign up</a>
        </div>
      </div>
    </div>
</section>
  )
}

export default SignInPage
