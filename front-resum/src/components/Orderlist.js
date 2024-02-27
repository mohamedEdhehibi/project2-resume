import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import info from '../assets/info.png';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

const OrderList = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [imageUrl, setImageUrl] = useState(null); // State for storing image file
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/v1/productlist`);
      setProducts(response.data.products.reverse());
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
    setImageUrl(null);
  };

  const handleShowModal = (product = null) => {
    setSelectedProduct(product);
    setShowModal(true);
  };


  

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const formData = new FormData(e.target);
      // formData.append('image', imageUrl);
      // formData.append('name', e.target.elements.name.value);
      // formData.append('price', e.target.elements.price.value);
      // formData.append('series_number', e.target.elements.series_number.value);
      
     
  
      if (selectedProduct) {
        // Update existing product
        await axios.patch(`http://localhost:4000/api/v1/productlist/${selectedProduct._id}`, formData);
      } else {
        // Add new product
        const uploadImageResponse = await axios.post('http://localhost:4000/api/v1/productlist/uploads', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        
        const productDataWithImageUrl = {name:e.target.elements.name.value,
          price: e.target.elements.price.value,
          series_number: e.target.elements.series_number.value,
          imageUrl: uploadImageResponse.data.image.src};
        
     
        
        await axios.post(`http://localhost:4000/api/v1/productlist`, productDataWithImageUrl);
      }
      
      handleCloseModal();
      fetchData();
    } catch (error) {
      console.error('Error handling submit:', error);
    }
  };
  

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/v1/productlist/${id}`);
      fetchData();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };
  return (
    <>
      <div className="content">
        <h1>Order List</h1>
        <Button
          variant="warning"
          onClick={() => handleShowModal()}
          className="modalButton"
        >
          Add Product
        </Button>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Price</th>
              <th>Series Number</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.price}$</td>
                <td>{product.series_number}</td>
                <td>
                  <img
                    onClick={() => navigate(`/orderlist/${product._id}`)}
                    width="40px"
                    src={info}
                    alt="info"
                  />
                  <Button
                    variant="primary"
                    className="mx-2"
                    onClick={() => handleShowModal(product)}
                  >
                    Update
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteProduct(product._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>
              {selectedProduct ? 'Update Product' : 'Add Product'}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form
              onSubmit={(e) => {
                // Append image file to form data
                handleSubmit(e);
              }}
            >
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter a name"
                  defaultValue={selectedProduct ? selectedProduct.name : ''}
                  name="name"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter a price"
                  defaultValue={selectedProduct ? selectedProduct.price : ''}
                  name="price"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formSeriesNumber">
                <Form.Label>Series Number</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter a series number"
                  defaultValue={selectedProduct ? selectedProduct.series_number : ''}
                  name="series_number"
                />
              </Form.Group>
              <Form.Group controlId="formFile1" className="mb-3">
                <Form.Label>Image</Form.Label>
                <Form.Control type="file" onChange={(e) => setImageUrl(e.target.files[0])}  name='image'/>
              </Form.Group>

              <Button variant="secondary" onClick={handleCloseModal}>
                Close
              </Button>
              <Button variant="primary" type="submit">
                {selectedProduct ? 'Update' : 'Add'}
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default OrderList;
