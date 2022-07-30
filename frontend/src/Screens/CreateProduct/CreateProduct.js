import React,{useState} from 'react'
import {Container,Form,Button, Row, Col} from "react-bootstrap"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateProduct = () => {

  const navigate = useNavigate();

  const loginUser = localStorage.getItem('userInfo')?
  JSON.parse(localStorage.getItem("userInfo")):null;

  if(!loginUser || !loginUser.isAdmin){
    navigate('/');
  }

  const [SSize,setSSize] = useState(false);
  const [MSize,setMSize] = useState(false);
  const [LSize,setLSize] = useState(false);
  const [XLSize,setXLSize] = useState(false);
  const [XXLSize,setXXLSize] = useState(false);

  const [men,setMen] = useState(false);
  const [women,setWomen] = useState(false);
  const [shirt,setShirt] = useState(false);
  const [tShirt,setTShirt] = useState(false);
  const [jeans,setJeans] = useState(false);
  const [formal,setFormal] = useState(false);
  const [trouser,setTrouser] = useState(false);
  const [skirt,setSkirt] = useState(false);
  const [dress,setDress] = useState(false);
  const [watch,setWatch] = useState(false);

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

  const submitHandler = async(e) =>{
    e.preventDefault();

    if(!name) setError("Enter a Name");
    else if(!description) setError("Enter description");
    else if(!price) setError("Enter price");
    else if(!countInStock) setError("Enter the count in Stock");
    else if(!SSize && !MSize && LSize && !XLSize && !XXLSize) setError("Select Sizes Available");
    else if(!image1 && !image2 && !image3) setError("Please Select atleast one Image");
    else setError();

    setSizes([]);
    if(SSize) sizes.push('S');
    if(MSize) sizes.push('M');
    if(LSize) sizes.push('L');
    if(XLSize) sizes.push('XL');
    if(XXLSize) sizes.push('XXL');

    setCategories([]);
    if(men) categories.push('men');
    if(women) categories.push('women');
    if(shirt) categories.push('shirt');
    if(tShirt) categories.push('tShirt');
    if(jeans) categories.push('jeans');
    if(formal) categories.push('formal');
    if(trouser) categories.push('trouser');
    if(skirt) categories.push('skirt');
    if(dress) categories.push('dress');
    if(watch) categories.push('watch');

    setImages([]);
    if(image1) images.push(image1);
    if(image2) images.push(image2);
    if(image3) images.push(image3);

    if(!error){
      try{
        const config = {
          headers:{
               "Content-type":"application/json",
               "Authorization":`Bearer ${loginUser.token}`,
          }
        };

        const {data} = await axios.post('/api/product',{name,price,description,categories,sizes,images,countInStock},config);
        navigate('/manage/products');
      }
      catch(error){
        const data =  (error.response && error.response.data.message) ? 
        error.response.data.message:
        error.message;
      }
    }
  }


  return (
    <Container>
      <h3 className="text-center">Create Product</h3>
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
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Sizes Available</Form.Label>
              <div className="d-flex">
                <div>
                  {(SSize)?
                  <div className="ms-2 me-2 border border-dark text-center p-2 bg-success text-white" value={SSize} style={{width:"45px",cursor:"pointer"}} onClick = {()=>setSSize(!SSize)}>S</div>:
                  <div className="ms-2 me-2 border border-dark text-center p-2" value={SSize} style={{width:"45px",cursor:"pointer"}} onClick = {()=>setSSize(!SSize)}>S</div>}
                </div>

                <div>
                  {(MSize)?
                  <div className="ms-2 me-2 border border-dark text-center p-2 bg-success text-white" value={MSize} style={{width:"45px",cursor:"pointer"}} onClick = {()=>setMSize(!MSize)}>M</div>:
                  <div className="ms-2 me-2 border border-dark text-center p-2" value={MSize} style={{width:"45px",cursor:"pointer"}} onClick = {()=>setMSize(!MSize)}>M</div>}
                </div>

                <div>
                  {(LSize)?
                  <div className="ms-2 me-2 border border-dark text-center p-2 bg-success text-white" value={LSize} style={{width:"45px",cursor:"pointer"}} onClick = {()=>setLSize(!LSize)}>L</div>:
                  <div className="ms-2 me-2 border border-dark text-center p-2" value={LSize} style={{width:"45px",cursor:"pointer"}} onClick = {()=>setLSize(!LSize)}>L</div>}
                </div>

                <div>
                  {(XLSize)?
                  <div className="ms-2 me-2 border border-dark text-center p-2 bg-success text-white" value={XLSize} style={{width:"45px",cursor:"pointer"}} onClick = {()=>setXLSize(!XLSize)}>XL</div>:
                  <div className="ms-2 me-2 border border-dark text-center p-2" value={XLSize} style={{width:"45px",cursor:"pointer"}} onClick = {()=>setXLSize(!XLSize)}>XL</div>}
                </div>

                <div>
                  {(XXLSize)?
                  <div className="ms-2 me-2 border border-dark text-center p-2 bg-success text-white" value={XXLSize} style={{width:"45px",cursor:"pointer"}} onClick = {()=>setXXLSize(!XXLSize)}>XXL</div>:
                  <div className="ms-2 me-2 border border-dark text-center p-2" value={XXLSize} style={{width:"45px",cursor:"pointer"}} onClick = {()=>setXXLSize(!XXLSize)}>XXL</div>}
                </div>

              </div>
            </Form.Group>
          </Col>
          <Col>
              <Form.Label>Categories</Form.Label>
              <div>
                <div className="d-flex">
                  <div>
                    {(men)?
                    <div className="ms-2 me-2 border border-dark text-center p-2 bg-success text-white" value={men} onClick = {()=>setMen(!men)}>men</div>:
                    <div className="ms-2 me-2 border border-dark text-center p-2" value={men} onClick = {()=>setMen(!men)}>men</div>}
                  </div>

                  <div>
                    {(women)?
                    <div className="ms-2 me-2 border border-dark text-center p-2 bg-success text-white" value={women} onClick = {()=>setWomen(!women)}>women</div>:
                    <div className="ms-2 me-2 border border-dark text-center p-2" value={women} onClick = {()=>setWomen(!women)}>women</div>}
                  </div>

                  <div>
                    {(shirt)?
                    <div className="ms-2 me-2 border border-dark text-center p-2 bg-success text-white" value={shirt} onClick = {()=>setShirt(!shirt)}>shirt</div>:
                    <div className="ms-2 me-2 border border-dark text-center p-2" value={shirt} onClick = {()=>setShirt(!shirt)}>shirt</div>}
                  </div>

                  <div>
                    {(tShirt)?
                    <div className="ms-2 me-2 border border-dark text-center p-2 bg-success text-white" value={tShirt} onClick = {()=>setTShirt(!tShirt)}>t-shirt</div>:
                    <div className="ms-2 me-2 border border-dark text-center p-2" value={tShirt} onClick = {()=>setTShirt(!tShirt)}>t-shirt</div>}
                  </div>

                  <div>
                    {(jeans)?
                    <div className="ms-2 me-2 border border-dark text-center p-2 bg-success text-white" value={jeans} onClick = {()=>setJeans(!jeans)}>jeans</div>:
                    <div className="ms-2 me-2 border border-dark text-center p-2" value={jeans} onClick = {()=>setJeans(!jeans)}>jeans</div>}
                  </div>

                </div>

                <div className="d-flex mt-2">
                  <div>
                    {(formal)?
                    <div className="ms-2 me-2 border border-dark text-center p-2 bg-success text-white" value={formal} onClick = {()=>setFormal(!formal)}>formal</div>:
                    <div className="ms-2 me-2 border border-dark text-center p-2" value={formal} onClick = {()=>setFormal(!formal)}>formal</div>}
                  </div>

                  <div>
                    {(trouser)?
                    <div className="ms-2 me-2 border border-dark text-center p-2 bg-success text-white" value={trouser} onClick = {()=>setTrouser(!trouser)}>trouser</div>:
                    <div className="ms-2 me-2 border border-dark text-center p-2" value={trouser} onClick = {()=>setTrouser(!trouser)}>trouser</div>}
                  </div>

                  <div>
                    {(skirt)?
                    <div className="ms-2 me-2 border border-dark text-center p-2 bg-success text-white" value={skirt} onClick = {()=>setSkirt(!skirt)}>skirt</div>:
                    <div className="ms-2 me-2 border border-dark text-center p-2" value={skirt} onClick = {()=>setSkirt(!skirt)}>skirt</div>}
                  </div>

                  <div>
                    {(dress)?
                    <div className="ms-2 me-2 border border-dark text-center p-2 bg-success text-white" value={dress} onClick = {()=>setDress(!dress)}>dress</div>:
                    <div className="ms-2 me-2 border border-dark text-center p-2" value={dress} onClick = {()=>setDress(!dress)}>dress</div>}
                  </div>

                  <div>
                    {(watch)?
                    <div className="ms-2 me-2 border border-dark text-center p-2 bg-success text-white" value={watch} onClick = {()=>setWatch(!watch)}>watch</div>:
                    <div className="ms-2 me-2 border border-dark text-center p-2" value={watch} onClick = {()=>setWatch(!watch)}>watch</div>}
                  </div>
                </div>


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
            Create
          </Button>
        </div>

      </Form>
    </Container>
  )
}

export default CreateProduct