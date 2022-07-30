import React,{useState,useEffect} from 'react'
import { Button, Container, Form, Nav, Navbar, NavDropdown } from "react-bootstrap";
import {useNavigate} from "react-router-dom";


const Header = () => {

  const navigate = useNavigate();

  const handleLogout = () =>{
    localStorage.removeItem("userInfo");
    navigate('/login');
  }

  const user = localStorage.getItem('userInfo')?
  JSON.parse(localStorage.getItem("userInfo")):null;

  return (
    <div className='mb-5'>
      <Navbar bg="light" expand="lg">
        <Container fluid>
            <Navbar.Brand href="#">ClothStore</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
            <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: '100px' }}
                navbarScroll
            >
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/shop">Shop</Nav.Link>
                <Nav.Link href="/register">Register</Nav.Link>
                {(user && user.isAdmin)?
                  <NavDropdown title="Manage" id="basic-nav-dropdown">
                    <NavDropdown.Item href="/manage/users">Users</NavDropdown.Item>
                    <NavDropdown.Item href="/manage/products">Products</NavDropdown.Item>
                  </NavDropdown>:
                  <></>
                }
            </Nav>
            <Form className="d-flex">
                <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
            </Form>
            {(user)?
            <Button onClick={handleLogout} variant="outline-dark" className="ml-2">Logout</Button>:
            <Button onClick={()=>{
              navigate('/login');
            }} variant="outline-dark" className="ml-2">Login</Button>}
            </Navbar.Collapse>
        </Container>
        </Navbar>
    </div>
  )
}

export default Header
