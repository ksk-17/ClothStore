import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import {Link, useNavigate} from "react-router-dom";
import "./Login.css"
import axios from "axios";

const Login = () => {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError]=useState("");

  const navigate = useNavigate();

  const getUser = () =>{
    if(localStorage.getItem("userInfo"))
    navigate("/");
  }

  const submitHandler = async(e)=>{
    e.preventDefault();

    var validRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!email.match(validRegex)){
      setError("Enter a valid Email Address");
      return;
    }

    if(!email || !password){
      setError("Enter all the fields");
      return;
    }

    try{
      const config = {
        headers:{
             "Content-type":"application/json"
        }
      };

      const {data} = await axios.post("/api/users/login",{email,password},config);
      localStorage.setItem("userInfo",JSON.stringify(data));
      navigate('/');
      
    }
    catch(error){
      const data =  (error.response && error.response.data.message) ? 
        error.response.data.message:
        error.message;
      setError(data);
    }
  }

  useEffect(()=>{
    getUser();
  },[submitHandler]);

  return (
    <div className="Login">
      <div className="img">
        <img src="/Login.svg"></img>
      </div>
      <div className="form text-center" onSubmit={submitHandler}>
        <Form>
          <h2 className='mb-5'>SignIn</h2>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" />
          </Form.Group>

          {(error)?<div className="mb-3 text-danger"><i>{error}</i></div>:<div></div>}

          <Button variant="primary" type="submit" className="w-100">
            Login
          </Button>
          <div className="mt-3">
            <strong>Forgot Password?</strong>
          </div>
          <div className="mt-5">Create Your Account? <Link to="/register">Register</Link></div>
        </Form>
      </div>
    </div>
  )
}

export default Login
