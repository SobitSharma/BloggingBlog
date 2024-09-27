import React, { useState } from 'react';
import AlertNotifier from '../../Utility/Alert';
import { useNavigate } from 'react-router-dom';
import {useAuth0} from "@auth0/auth0-react"

const Auth = ({flag}) => {
    const {loginWithRedirect} = useAuth0()
    const [auths, setauths] = useState({username:'', password:''})
    const [alertFlag, setalertFlag] = useState(false)
    const [alertMessage, setalertMessage] = useState('This is alert message')
    const [alertType, setAlertType] = useState('')
    const navigate = useNavigate()

    const HandleGmailLogin = async() => {
      await loginWithRedirect()
    }

    const NotificationHandler = (message, alerttype) => {
        setalertFlag(true)
        setalertMessage(message)
        setAlertType(alerttype)
        setTimeout(()=>setalertFlag(false), 3000)
    }

    const HandleAuthControll = () => {
        if(!(auths.username) || !(auths.password)){
            NotificationHandler("Fields cannot be Blank", "warning")
        }
        else{
            let url = import.meta.env.VITE_APIURL;
            console.log(url)
            let completeUrl = flag ? `${url}/auth/first/signup` : `${url}/auth/first/signin`
            fetch(completeUrl, {
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(auths),
                credentials:'include'
            }).then((response)=>response.json())
            .then((response)=> {
                if(response.status == 200){
                    NotificationHandler(response.message, 'success')
                    setTimeout(()=>navigate('/home'), 2000)
                }
                else{
                    NotificationHandler(response.message, 'warning')
                }
            })
        }
    }
    return (
        <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
          {
            alertFlag && 
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-full max-w-md">
              <AlertNotifier message={alertMessage} severity={alertType} />
            </div>
          }
      
          <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-xl">
            <h2 className="text-2xl font-bold text-center text-gray-800">Welcome Back</h2>
            <p className="text-sm text-center text-gray-600">
              {flag ? "Continue with Us By Signing Up" : "Continue with Us By Signing In"}
            </p>
      
            <div className="mt-8 space-y-6">
              <div className="rounded-md shadow-sm">
                <label className="block text-sm font-medium text-gray-700">Username</label>
                <input 
                  type="text" 
                  placeholder="Enter your username"
                  onChange={(e) => setauths({...auths, username: e.target.value})}
                  className="w-full px-3 py-2 mt-1 text-gray-900 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
      
              <div className="rounded-md shadow-sm">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input 
                  type="password" 
                  placeholder="Enter your password"
                  onChange={(e) => setauths({...auths, password: e.target.value})}
                  className="w-full px-3 py-2 mt-1 text-gray-900 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
      
              <button 
                type="submit" 
                onClick={HandleAuthControll}
                className="w-full py-2 mt-4 text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                {flag ? "Sign Up" : "Sign In"}
              </button>
            </div>
      
            <div className="text-center text-sm text-gray-600 mt-6">
              {flag ? "Already Have An Account ? " : "Don't Have an Account ?" }
              <a href={flag ? "/login" : "/"} className="ml-2 font-medium text-indigo-600 hover:text-indigo-500">
                {flag ? "Sign In" : "Sign Up"}
              </a>
            </div>
      
            <div className="flex justify-center mt-6">
              <button 
              onClick={HandleGmailLogin}
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200">
                <img src="https://img.icons8.com/color/48/000000/google-logo.png" alt="Google" className="w-5 h-5 mr-2" />
                Sign in with Gmail
              </button>
            </div>
          </div>
        </div>
      );
      
};

export default Auth;
