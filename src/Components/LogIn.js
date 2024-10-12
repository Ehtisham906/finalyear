import React, { useState } from 'react'
import { Link } from 'react-router-dom'
 
 const LogIn = () => {
  const data = {
    name:"",
    email:"",
    password:""
  }
  const [inputData, setInputData] = useState(data)
   const [msg, setMsg] = useState(false)
  
  const handleInput = (event) =>{
    
     
    setInputData({...inputData, [event.target.name]:event.target.value})
    
  }
   
  const submit = (event) =>{
    event.preventDefault();
    if(!inputData.name || !inputData.email || !inputData.password){
      alert("All Fields are Mandatory!")
      
    }else{
      setMsg(true)
      setTimeout(()=>{
        setMsg(false)
      },4000)
    }
  }
   
  
  
   return (
      <form onSubmit={submit} className='container'>
      <h2>{msg? inputData.name+" : SignUp Successfully!" : null}</h2>
      
        <h1>Sign In</h1>
        <div className='inputs'>
          <input type='text' placeholder='Name'  name="name" value={inputData.name} onChange={handleInput} /><br />
          <input type='email' placeholder='Email' name="email" value={inputData.email} onChange={handleInput} /><br />
          <input className='pswrd' type='password' placeholder='Passsword' name="password" value={inputData.password} onChange={handleInput} />
        </div><br />
        <button onClick={submit}>SignIn</button>
        <p>Not account?<Link to="/SignUp">SignUp</Link></p>
      </form>
   )
 }
 export default LogIn;