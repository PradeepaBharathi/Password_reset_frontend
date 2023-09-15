import React, { useState } from 'react'

function ResetPassword() {
    const [email, setEmail] = useState("")
    const [message,setMessage] = useState("")
    const setVal = (e) => {
      setEmail(e.target.value)  
    }

    const sendLink = async (e) => {
        e.preventDefault()

        const res = await fetch("https://password-7woa.onrender.com/user/sendpasswordlink", {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body:JSON.stringify({email})
        }
            
        )

        const data = await res.json()
        if (data.status === 201) {
            setEmail("")
            setMessage(true)
        }
        else {
            alert("Invalid User")
        }
    }
  return (
      <>
      <section>
              <div className='form_data'>
                  <div className='form_heading'>
                      <h1>Enter Your Email</h1>                  
                  </div>
                  {message ? <p style={{color:"green",fontWeight:"bold"}}>Password reset link sent successfully to your email</p>:""}
                  <form>
                      <div className='form_input'>
                          <label htmlFor='email' >Email</label>
                          <input type='email' value={email} onChange={setVal} name='email' id='email' placeholder='Enter your email address'></input>
                      </div>
                      
                          
                      
                      <button className='btn' onClick={sendLink}>Send</button>
                     
                  </form>
              </div>
          </section>
      </>
  )
}

export default ResetPassword