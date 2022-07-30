import React,{useEffect, useState} from 'react'
import {Container,Form,Button, Row, Col} from "react-bootstrap"
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditProduct = () => {

  const navigate = useNavigate();

  const loginUser = localStorage.getItem('userInfo')?
  JSON.parse(localStorage.getItem("userInfo")):null;

  if(!loginUser || !loginUser.isAdmin){
    navigate('/');
  }

  const {id} = useParams();

  const [image1,setImage1] = useState("");
  const [image2,setImage2] = useState("");
  const [image3,setImage3] = useState("");

  const [name,setName] = useState("");
  const [description,setDescription] = useState("");
  const[price,setPrice]=useState('');
  const[countInStock,setCountInStock]=useState('');
  const[sizes,setSizes]=useState([]);
  const[categories,setCategories]=useState([]);
  const[images,setImages]=useState([]);
  const [error,setError] = useState("");

  const [sizeValue,setSizeValue] = useState ([false,false,false,false,false]);
  const [categoryValue,setCategoryValue] = useState([false,false,false,false,false,false,false,false,false,false])

  const [product,setProduct] = useState("");

//   const getProduct = async()=>{
//     const {data} = await axios.get(`/api/product/${id}`);
//     setProduct(data);
//   }

//   const setProductDetails = () =>{
//     setName(product.name);
//     setDescription(product.description);
//     setPrice(product.price);
//     setCountInStock(product.countInStock);
//   }

//   useEffect(()=>{
//     getProduct();
//     setProductDetails();
//   })

  const submitHandler = async(e) =>{
    e.preventDefault();

    let sizeEnter = false;
    sizeValue.map((size)=>(
        sizeEnter = sizeEnter || size
    ))

    let categoryEnter = false;
    categoryValue.map((category)=>(
        categoryEnter = categoryEnter || category
    ))

    if(!name) setError("Enter a Name");
    else if(!description) setError("Enter description");
    else if(!price) setError("Enter price");
    else if(!countInStock) setError("Enter the count in Stock");
    else if(!sizeEnter) setError("Select Sizes available");
    else if(!categoryEnter) setError("Select Categories applicable")
    else if(!image1 && !image2 && !image3) setError("Please Select atleast one Image");
    else setError();

    const sizeData = ["S","M","L","XL","XXL"].filter((size,ind)=> sizeValue[ind]);
    setSizes(sizeData);

    const categoryData = ["men","women","shirt","t-shirt","jeans","formal","trouser","skirt","dress","watch"].filter((category,ind)=> categoryValue[ind]);
    setCategories(categoryData);

    setImages([]);
    if(image1) images.push(image1);
    if(image2) images.push(image2);
    if(image3) images.push(image3);

    // if(!error){
    //   try{
    //     const config = {
    //       headers:{
    //            "Content-type":"application/json",
    //            "Authorization":`Bearer ${loginUser.token}`,
    //       }
    //     };

    //     const {data} = await axios.post('/api/product',{name,price,description,categories,sizes,images,countInStock},config);
    //     navigate('/manage/products');
    //   }
    //   catch(error){
    //     const data =  (error.response && error.response.data.message) ? 
    //     error.response.data.message:
    //     error.message;
    //   }
    // }
  }


  return (
    <Container>
      <h3 className="text-center">Edit Product</h3>
      <hr />
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Name of the Product" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={3} value={description} onChange={(e)=>setDescription(e.target.value)} placeholder="Product Description" />
        </Form.Group>

        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control type="text" value={price} onChange={(e)=>setPrice(e.target.value)} placeholder="Price in Rupees" />
            </Form.Group>
          </Col>

          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control type="text" value={countInStock} onChange={(e)=>setCountInStock(e.target.value)} placeholder="Available count in Stock" />
            </Form.Group>
          </Col>
        </Row>

        <Row>
            
        </Row>

        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Sizes Available</Form.Label>
              <div className="d-flex">

                {["S","M","L","XL","XXL"].map((size,ind)=>(
                    <div>
                    {(sizeValue[ind])?
                    <div className="ms-2 me-2 border border-dark text-center p-2 bg-success text-white" value={sizeValue[ind]} style={{width:"45px",cursor:"pointer"}} onClick = {()=>{
                        let newSizeValue = [...sizeValue];
                        newSizeValue[ind] = !newSizeValue[ind];
                        setSizeValue(newSizeValue);
                    }} >{size}</div>:
                    <div className="ms-2 me-2 border border-dark text-center p-2" value={sizeValue[ind]} style={{width:"45px",cursor:"pointer"}} onClick = {()=>{
                        let newSizeValue = [...sizeValue];
                        newSizeValue[ind] = !newSizeValue[ind];
                        setSizeValue(newSizeValue);
                    }}>{size}</div>}
                    
                </div>
            ))}

              </div>
            </Form.Group>
          </Col>
          <Col>
              <Form.Label>Categories</Form.Label>
              <div className="d-flex">

                {["men","women","shirt","t-shirt","jeans","formal","trouser","skirt","dress","watch"].map((category,ind)=>(
                    <div>
                    {(categoryValue[ind])?
                    <div className="ms-2 me-2 border border-dark text-center p-2 bg-success text-white" value={categoryValue[ind]} style={{cursor:"pointer"}} onClick = {()=>{
                        let newCategoryValue = [...categoryValue];
                        newCategoryValue[ind] = !newCategoryValue[ind];
                        setCategoryValue(newCategoryValue);
                    }} >{category}</div>:
                    <div className="ms-2 me-2 border border-dark text-center p-2" value={categoryValue[ind]} style={{cursor:"pointer"}} onClick = {()=>{
                        let newCategoryValue = [...categoryValue];
                        newCategoryValue[ind] = !newCategoryValue[ind];
                        setCategoryValue(newCategoryValue);
                    }}>{category}</div>}
                    
                </div>
            ))}

              </div>
          </Col>
        </Row>

        <Form.Group className="mt-2 mb-2">
          <Form.Label>Images</Form.Label>
          <Form.Control type="text" placeholder="Image 1" value={image1} onChange={(e)=>setImage1(e.target.value)} className='mt-2'/>
          <Form.Control type="text" placeholder="Image 2" value={image2} onChange={(e)=>setImage2(e.target.value)} className='mt-2'/>
          <Form.Control type="text" placeholder="Image 3" value={image3} onChange={(e)=>setImage3(e.target.value)} className='mt-2'/>
        </Form.Group>

        {(error)?<div className="mb-3 text-danger"><i>{error}</i></div>:<div></div>}

        <div className="text-center mt-2">
          <Button variant="primary" type="submit">
            Edit
          </Button>
        </div>

      </Form>
    </Container>
  )
}

export default EditProduct