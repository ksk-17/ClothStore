import React,{useEffect,useState} from 'react';
import {useParams} from "react-router-dom";
import {Button,Badge,Form} from "react-bootstrap";
import {StarFill} from "react-bootstrap-icons";
import axios from 'axios';

const Product = () => {

    const [product,setProduct] = useState("");
    const [qty,setQty]=useState(1);
    const [user,setUser] = useState("");

    const [rating,setRating]=useState("");
    const [comment,setComment] = useState("");
    const [error,setError] = useState('');



    const {id} = useParams();

    const getProductDetails = async()=>{
        const {data} = await axios.get(`/api/product/${id}`);
        setProduct(data);
    }

    const getUser = () =>{
      if(localStorage.getItem("userInfo")){
        setUser(localStorage.getItem("userInfo"));
      }
    }

    const addRating=async()=>{
      try{
        const config = {
          headers:{
               "Content-type":"application/json",
               "Authorization":`Bearer ${user.token}`,
          }
        };
  
        const {data} = await axios.post(`/api/product/${id}/reviews`,{rating,comment},config);
      }
      catch(error){
        const data =  (error.response && error.response.data.message) ? 
          error.response.data.message:
          error.message;
        setError(data);
      }
    }

    const submitReviewHandler = ()=>{
      if(!rating){
        setError("please give the rating");
      }

      if(rating>="1" && rating<="5"){
        addRating();
        console.log("hi");
      }
      else
        setError("please give a valid rating");
    }

    useEffect(()=>{
        getProductDetails();
        getUser();
    },[]);


  return (
    <div className="bg-light p-3">
      <div className='row'>
        <div className="col-lg-6">
          {/* <img src={product.images[0]}></img> */}
        </div>
        <div className='col-lg-6'>
          <h3>{product.name}</h3>
          <h5 className="text-success">₹{product.price}<h6 className="text-danger text-decoration-line-through">({product.price*1.25})</h6></h5>
          <div>{product.description}</div>
          <div>Occaecat commodo adipisicing aliqua amet est voluptate. Enim sint amet ad minim esse duis aute anim sunt ex. Consectetur amet aliqua ad labore. Pariatur eiusmod qui excepteur non pariatur do. Adipisicing sit labore esse labore. Pariatur do sunt qui tempor aliquip nisi sunt voluptate velit aliquip do nulla aute.</div>
          <div className="mt-3">
            <div className="mt-2">
              <strong>Size</strong>
              <select className="form-select w-25" aria-label="Default select example">
                <option selected>Choose an Option</option>
                {/* {product.sizes.map((size,ind)=>(
                  <option value={size} key="ind">{size}</option>
                ))} */}
              </select>
            </div>
            <div className="mt-2">
              <strong>Status:</strong>{(product.coutInStock!==0)?<span className="text-success"> Available</span>:<span className="text-danger"> Out of Stock</span>}
            </div>
            <div className="mt-2">
              {/* <strong>Category:</strong>{product.category.map((category)=>(
                <span class="badge bg-secondary">{category}</span>
              ))} */}
            </div>
            <div className="mt-2">
              <strong>Delivery location:</strong>
            </div>
            <div className="mt-2">
              <strong>Quantity: </strong><Button variant="danger" onClick={()=>{
                if(qty!==1)
                setQty(qty-1);
              }}>-</Button><span className="text-success m-2">{qty}</span><Button variant="danger" onClick={()=>{
                if(qty!==product.countInStock)
                setQty(qty+1);
              }}>+</Button>
            </div>
            <div className="mt-4">
              <Button variant="dark">Add To Cart</Button>
            </div>
          </div>
        </div>
      </div>
      <div>
        {(product.reviews && product.reviews.length)?
        <div>
          <div  className="d-flex justify-content-between">
            <div className="d-flex">
              <h4 className="m-2">Ratings & Reviews</h4>
              <h4 className="m-2"><Badge bg="success">{product.rating} <StarFill /></Badge></h4>
            </div>
            <h6 className="mt-2 text-secondary" >{product.reviews.length} reviews</h6>
          </div>
          <hr />
          {product.reviews.map((review)=>(
            <div>
              <div className="d-flex">
                <h6 className="m-2">{review.name}</h6>
                <h5 className="m-2"><Badge bg="success">{review.rating} <StarFill /></Badge></h5>
              </div>
              <p  className="m-2">{review.comment}</p>
              <hr />
            </div>
          ))}
        </div>
        :
        <h4>No reviews yet</h4>
        }
      </div>
      <div>
        <h4>Rate Product:</h4>
        {(user)?
        <div>
          <Form onSubmit={submitReviewHandler}>
            <Form.Group className="mb-3">
              <Form.Label>Rating</Form.Label>
              <Form.Control type="text" value={rating} onChange={(e)=>{
                setRating(e.target.value);
              }} placeholder="give rating" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Comment</Form.Label>
              <Form.Control as="textarea" rows={3} value={comment} onChange={(e)=>{
                setComment(e.target.value);
              }} placeholder="share your experience"/>
            </Form.Group>
            {(error)?<div className="mb-3 text-danger"><i>{error}</i></div>:<div></div>}
            <Button variant="primary" type="submit">
              Post
            </Button>
          </Form>
        </div>
        :<p>Please Sign In To write a review.</p>
        }
      </div>
    </div>
  )
}

export default Product