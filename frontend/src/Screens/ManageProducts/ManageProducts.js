import React, { useState,useEffect } from 'react';
import {useNavigate} from "react-router-dom"; 
import { Table,Container, Button } from "react-bootstrap";
import {PlusCircle} from "react-bootstrap-icons"
import axios from "axios";

const ManageProducts = () => {

  const [products,setProducts] = useState([]);

  const navigate = useNavigate();

  const user = localStorage.getItem("userInfo")?
  JSON.parse(localStorage.getItem("userInfo")):null;

  if(!user || !user.isAdmin){
    navigate('/');
  }

  const getProducts = async() =>{
    try{
      const {data} = await axios.get("/api/product/");
      setProducts(data);
    }
    catch(error){
      const data =  (error.response && error.response.data.message) ? 
        error.response.data.message:
        error.message;
    }
  }

  const handleDeleteProduct = async(id) =>{
    try{

      const config = {
        headers:{
             "Content-type":"application/json",
             "Authorization":`Bearer ${user.token}`,
        }
      };

      const {data} = await axios.delete(`/api/product/${id}`,config);
    }
    catch(error){
      const data =  (error.response && error.response.data.message) ? 
        error.response.data.message:
        error.message;
    }
  }

  useEffect(()=>{
    getProducts();
  },[handleDeleteProduct])

  return (
    <Container>
      <div className="text-center m-2">
        <Button  onClick={()=>navigate('/manage/products/add')}><PlusCircle className='ms-1 me-1'/>Add</Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Sno</th>
            <th>productId</th>
            <th>Name</th>
            <th>Price</th>
            <th>Categories</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product,ind)=>(
            <tr>
              <td>{ind+1}</td>
              <td>{product._id}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.category.map((category)=>(
                <span className="ms-1 me-2">{category}</span>
              ))}</td>
              <td>
                <Button className="ms-2" onClick={()=> navigate(`/shop/${product._id}`)}>View</Button>
                <Button className="ms-2" variant="warning" onClick={()=>navigate(`/manage/product/${product._id}`)}>Edit</Button>
                <Button className="ms-2" variant="danger"  onClick={()=>handleDeleteProduct(product._id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  )
}

export default ManageProducts