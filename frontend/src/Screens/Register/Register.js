import React,{useState} from 'react'
import {Form,Button} from "react-bootstrap";
import {Link,useNavigate} from "react-router-dom";
import axios from "axios";
import "./Register.css";

const Register = () => {

  const [email,setEmail] = useState("");
  const [name,setName] = useState("");
  const [password,setPassword] = useState("");
  const [confirmPassword,setConfirmPassword] = useState("");
  const [error,setError]=useState("");

  const navigate = useNavigate();

  const submitHandler = async(e) =>{
    e.preventDefault();
    if(!name || !email || !password || !confirmPassword){
      setError("Enter all the fields");
      return;
    }

    var validRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!email.match(validRegex)){
      setError("Enter a valid Email Address");
      return;
    }

    if(password!==confirmPassword){
      setError("Passwords doesn't match");
      return;
    }

    try{
      const config = {
        headers:{
             "Content-type":"application/json"
        }
      };

      const {data} = await axios.post("/api/users/register",{name,email,password},config)
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

  return (
    <div className="Register">
      <div className="img">
        <img src="/Register.svg"></img>
      </div>
      <div className="form text-center">
        <Form onSubmit={submitHandler}>
          <h2 className='mb-5'>Register</h2>

          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Control type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Name" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
            <Form.Control type="password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} placeholder="Confirm Password" />
          </Form.Group>

          {(error)?<div className="mb-3 text-danger"><i>{error}</i></div>:<div></div>}

          <Button variant="primary" type="submit" className="w-100">
            Register
          </Button>
          <div className="mt-5">Already a user? <Link to="/login">Login</Link></div>
        </Form>
      </div>
    </div>
  )
}

export default Register
