import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'

function ForgotPassword() {

  const { id, token } = useParams()
  const navigate = useNavigate()
  const[password,setPassword] = useState("")
  const [message,setMessage]=useState("")
  const userValid = async () => {
    const res = await fetch(`https://password-7woa.onrender.com/user/forgot-password/${id}/${token}`, {
      method: "GET",
      headers: {
        "Content-Type": "Application/json"
              }
    })
   
    const data = await res.json()
    if (data.status === 201) {
      console.log("user valid")
    }
    else {
      navigate("*")
    }
  }


  const setVal=(e) => {
    setPassword(e.target.value)
  }

  const sendPassword = async (e) => {
    e.preventDefault()
    const res = await fetch(`https://password-7woa.onrender.com/user/resetPassword/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json"
        
      },
      body:JSON.stringify({password})
    })
   const data = await res.json()
    if (data.status === 200) {
      setPassword("")
      setMessage(true)
    }
    else {
      alert(" !Token Expired generate new link")
    }
  }
   useEffect(() => {
    userValid()
  },[])
  return (
    <>
      <section>
              <div className='form_data'>
                  <div className='form_heading'>
            <h1>Enter Your New Password</h1>  
            {message ? <p style={{color:"green",fontWeight:"bold"}}>Password has been reset successfully</p>:""}
                  </div>
                 
                  <form>
                      <div className='form_input'>
                          <label htmlFor='password' >New Password</label>
                          <input type='password' value={password} onChange={setVal} name='password' id='password' placeholder='Enter your new password'></input>
                      </div>
                      
                          
                      
            <button className='btn' onClick={sendPassword}>Send</button>
             <NavLink to="/">Go To Login</NavLink>
                   
                  </form>
              </div>
          </section>
    </>
  )
}

export default ForgotPassword