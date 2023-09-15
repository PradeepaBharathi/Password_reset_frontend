import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Dashboard() {

    const navigate = useNavigate()
    const DashboardValid = async () => {
        let token = localStorage.getItem("userData")
        console.log(token)
        const res = await fetch("https://password-7woa.onrender.com/user/getUserById",{
            method: "GET",
            headers: {
                "Content-Type": "application.json",
                "x-auth-token":token
            }

        })

        const data = await res.json()
        if (data.status == 401 || !data) {
           navigate("*")
        }
        else {
            console.log("user verified")
            navigate("/dash")
        }
       
    }

    useEffect(() => {
        DashboardValid()
    }, [])
    
    const handleSubmit=() => {
        navigate("/")
    }
  return (
      <>
          <div style={{ alignItems: "center" }}>
          <h1> Welcome</h1>
            <button onClick={handleSubmit}>LogOut</button>  
              </div>
      </>
  )
}

export default Dashboard