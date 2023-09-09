import React, { useState } from 'react'
import'./style.css'
import { NavLink, useNavigate } from 'react-router-dom';
function Login() {
    const [passShow, setPassShow] = useState(false);

     const [inpVal, setInpVal] = useState({
      
        email: "",
        password: "",
       
     })
    
     const navigate = useNavigate()
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


    const loginuser = async(e) => {
        e.preventDefault()

        const { email, password } = inpVal
        
        if (email === "") {
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
        else {
           
            const data = await fetch("https://passwordbackend-5fj3.onrender.com/user/login", {
                method: "POST",
                headers: {
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({
                    email,password
                })
            })

            const res = await data.json()
            
            if (res.status === 201) {
                
                localStorage.setItem("userData", res.token)
                navigate("/dash")
                setInpVal({ ...inpVal, email: "", password: "" })
                console.log(res.data);
            }
            else if (res.error === "Invalid credentials") {
        alert("Invalid credentials. Please check your email and password.");
            }
            else {
                 alert("An error occurred during login.");
            }
        }

    }
  return (
      <>
          <section>
              <div className='form_data'>
                  <div className='form_heading'>
                      <h1>Welcome Back</h1>
                      <p> We are glad you are back</p>
                      
                  </div>
                  <form>
                      <div className='form_input'>
                          <label htmlFor='email' value={inpVal.email}>Email</label>
                          <input type='email' value={inpVal.email} onChange={setVal} name='email' id='email' placeholder='Enter your email address'></input>
                      </div>
                      <div className='form_input'>
                          <label htmlFor='password'>Password</label>
                          <div className='two'>
                              <input type={!passShow ? "password" : "text"} value={inpVal.password} onChange={setVal} name='password' id='password' placeholder='Enter your password'></input>
                              <div className='showpass' onClick={()=>setPassShow(!passShow)}>
                                  {!passShow ?"Show" : "Hide"}
                              </div>
                          </div>
                          
                      </div>
                      <button className='btn' onClick={loginuser}>Login</button>
                      <p>Don't have an account? <NavLink to="/register">Sign Up</NavLink></p>
                   <p style={{color:"black",}}>Forgot Password <NavLink to="/password-reset">ClickHere</NavLink></p>
                  </form>
              </div>
          </section>
      </>
  )
}

export default Login