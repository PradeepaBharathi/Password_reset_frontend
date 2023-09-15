import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import"./style.css"
function Register() {
    const [passShow, setPassShow] = useState(false);
    const [cpassShow, setCPassShow] = useState(false);
    
    const [inpVal, setInpVal] = useState({
        fname: "",
        email: "",
        password: "",
        cpassword:""
    })
    const setVal = (e) => {
        // console.log(e.target.value);
        const { name, value } = e.target;

        setInpVal(() => {
            return {
                ...inpVal,
                [name]:value
            }
        })

    }

    const addUserdata = async(e) => {
        e.preventDefault()
        const { fname, email, password, cpassword } = inpVal
        
        if (fname === "") {
            alert("Please enter your name")
        }
        else if (email === "") {
            alert("Please enter your email address")
        }
        else if (!email.includes("@")) {
                alert("enter valid email")
        }
        else if (password ==="") {
            alert("Please enter your password")
        }
        else if (password.length <6) {
            alert("Password must have 6 characters")
        }
        else if (cpassword ==="") {
            alert("Please enter your password")
        }
        else if (cpassword ==="") {
            alert("Password must have 6 characters")
        }
        else if (password !== cpassword) {
            alert("Password and confirm password must be same")
        }
        else {
            // console.log("user registered successfully")

            const data = await fetch("https://password-7woa.onrender.com/user/signup", {
                method: "POST",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    fname,email,password,cpassword
                })
            })

            const res = await data.json()
            if (res.status===201) {
                alert("user regitered successfully")
                setInpVal({...inpVal,fname:"",email:"",password:"",cpassword:""})
            }
            else if (res.error === "Email already exists") {
         alert("Email already exists. Please use a different email.");
        } 
            else {
                alert("check the credentials")
            }
        }
    }
  return (

      <>
          <section>
              <div className='form_data'>
                  <div className='form_heading'>
                      <h1>Sign Up</h1>
                      <p> Please Sign Up if you are new user</p>
                      
                  </div>
                  <form>
                      <div className='form_input'>
                          <label htmlFor='fname'>Name</label>
                          <input type='text' onChange={setVal} value={ inpVal.fname} name='fname' id='fname' placeholder='Enter your name'></input>
                      </div>
                        <div className='form_input'>
                          <label htmlFor='email'>Email</label>
                          <input type='email' onChange={setVal} value={ inpVal.email}name='email' id='email' placeholder='Enter your email address'></input>
                      </div>
                      <div className='form_input'>
                          <label htmlFor='password'>Password</label>
                          <div className='two'>
                              <input type={!passShow ? "password" : "text"} onChange={setVal} value={ inpVal.password}name='password' id='password' placeholder='Enter your password'></input>
                              <div className='showpass' onClick={()=>setPassShow(!passShow)}>
                                  {!passShow ?"Show" : "Hide"}
                              </div>
                          </div>
                          
                      </div>
                                            <div className='form_input'>
                          <label htmlFor='cpassword'>Confirm Password</label>
                          <div className='two'>
                              <input type={!cpassShow ? "password" : "text"} onChange={setVal} value={ inpVal.cpassword} name='cpassword' id='cpassword' placeholder='Enter your password'></input>
                              <div className='showpass' onClick={()=>setCPassShow(!cpassShow)}>
                                  {!cpassShow ?"Show" : "Hide"}
                              </div>
                          </div>
                          
                      </div>
                      <button className='btn' onClick={addUserdata}>Sign Up</button>
                      <p>Don't have an account? <NavLink to="/">Login</NavLink></p>
                     
                  </form>
              </div>
          </section>
      </>
  )
    
}

export default Register