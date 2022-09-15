import React,{useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {Button, Container,Table,Modal,Form} from "react-bootstrap";

const ManageUsers = () => {

  const [users,setUsers] = useState([]);
  const [showModal,setShowModal] = useState(false);
  const [email,setEmail] = useState("");
  const [name,setName] = useState("");
  const [admin,setAdmin] = useState(false);

  const navigate = useNavigate();

  const loginUser = localStorage.getItem('userInfo')?
  JSON.parse(localStorage.getItem("userInfo")):null;

  if(!loginUser || !loginUser.isAdmin){
    navigate('/');
  }

  const getUsers = async() =>{
    try{
      const config = {
        headers:{
             "Content-type":"application/json",
             "Authorization":`Bearer ${loginUser.token}`,
        }
      };

      const {data} = await axios.get('/api/users',config);
      setUsers(data);
    }
    catch(error){
      const data =  (error.response && error.response.data.message) ? 
        error.response.data.message:
        error.message;
    }
  }

  const updateHandler = async(id)=>{

    console.log(name,email,admin)
    try{
      const config = {
        headers:{
             "Content-type":"application/json",
             "Authorization":`Bearer ${loginUser.token}`,
        }
      };

      const {data} = await axios.put(`/api/users/${id}`,{name,email,admin},config);
    }
    catch(error){
      const data =  (error.response && error.response.data.message) ? 
        error.response.data.message:
        error.message;
    }

    setShowModal(false);
  }

  const deleteHandler=async(id)=>{
    try{
      const config = {
        headers:{
             "Content-type":"application/json",
             "Authorization":`Bearer ${loginUser.token}`,
        }
      };

      const {data} = await axios.delete(`/api/users/${id}`,config);
    }
    catch(error){
      const data =  (error.response && error.response.data.message) ? 
        error.response.data.message:
        error.message;
    }
  }

  useEffect (() =>{
    getUsers();
  },[deleteHandler]);

  return (
    <Container>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Sno</th>
            <th>userId</th>
            <th>Name</th>
            <th>Email</th>
            <th>Admin</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user,ind)=>(
            <tr>
              <td>{ind+1}</td>
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{(user.isAdmin)?<span className="text-success">Yes</span>:<span className="text-danger">No</span>}</td>


              <Modal show={showModal} onHide={()=>setShowModal(false)}>
                <Modal.Header closeButton>
                  <Modal.Title>Edit User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Label>userId</Form.Label>
                      <Form.Control type="text" placeholder="Name" value={user._id} disabled/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Name</Form.Label>
                      <Form.Control type="text" placeholder="Name" value={name} onChange={(e)=>{setName(e.target.value)}}/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control type="email" placeholder="Email" value={email} onChange={(e)=>{setEmail(e.target.value)}} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <input type="checkbox" id="Admin" value={admin} defaultChecked={admin} onChange={(e)=>{setAdmin(!admin)}}/>
                        <label className="ms-1" for="Admin">Admin</label>
                    </Form.Group>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={()=>setShowModal(false)}>
                    Cancel
                  </Button>
                  <Button variant="success" onClick={()=>updateHandler(user._id)}>
                    Update
                  </Button>
                </Modal.Footer>
              </Modal>


              <td className="p-2">
                <Button className="ms-2"  onClick={()=>{
                  setShowModal(true);
                  setName(user.name);
                  setEmail(user.email);
                  setAdmin(user.isAdmin);
                }}>Edit</Button>
                {(user._id!==loginUser._id)?<Button variant="danger"  className="ms-2" onClick={()=>deleteHandler(user._id)}>Delete</Button>:<></>}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  )
}

export default ManageUsers
