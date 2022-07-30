import React,{useState,useEffect} from 'react'
import {Button,Card} from "react-bootstrap";
// import {StarFill,StarHalf} from "react-bootstrap-icons"
import {useNavigate} from "react-router-dom"
import axios from "axios";

const Shop = () => {

  const [products,setProducts]= useState([]);

  const navigate = useNavigate();

  const getProducts = async()=>{
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
  

  useEffect(()=>{
    getProducts();
  },[]);

  return (
    <div>
      <div>
        {(products.length)?
        <div className="row row-cols-4 mt-2">
          {products.map((product)=>(
            <div className="col mt-3">
              <Card style={{ width: '350px' }}>
                <Card.Img variant="top" src={product.images[0]} style={{height:'500px'}} alt="/Login.svg"/>
                <Card.Body>
                  <h5>{product.name}</h5>
                  <p className='text-truncate'>{product.description}</p>
                  <div>
                    <strong>₹{product.price}</strong>
                  </div>
                  <Button variant="primary" onClick={()=>{
                    navigate(`/shop/${product._id}`);
                  }}>View Product</Button>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
        :
        <h2>No Products Available</h2>
        }
      </div>
    </div>
  )
}

export default Shop