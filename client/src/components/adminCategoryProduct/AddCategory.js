import React, { useState } from 'react';
import { Container, Row, Col, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router';

// Import useMutation from react-query here ...
import { useMutation } from 'react-query';


import AdminHeader from '../AdminHeader'

//import fakeCategory from '../../fakeCategory';

// Get API config here ...
import { API } from '../../config/api';

export default function AddCategory() {

  let navigate = useNavigate();

  // Create variabel for store data with useState here ...
  const [category, setCategory] = useState("");

  const title = 'Add Category';
  document.title = 'DumbMerch | ' + title;

  const handleChange = (e) => {
    setCategory(e.target.value);
  };

  const [message, setMessage] = useState(null);

  const [form, setForm] = useState({
    name: '',
  });

  // Create function for handle insert category data with useMutation here ...

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();
  
      // Configuration Content-type
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };
  
      // Data body
      const body = JSON.stringify({name: category});
  
      // Insert data user to database
      const response = await API.post('/category', body, config);
      console.log(response);
      // Handling response here

      if(response.data.status === "Success") {
        const alert = (
          <Alert variant='success' className='py-1'>
            {response.data.message}
          </Alert>
        )
        setMessage(alert)
        setForm({
          name: '',
        })
      }

    } catch (error) {
      console.log(error);
    }
  });

  return (
    <>
      <AdminHeader title={title} />
      <Container className="py-5">
        {message && message}
        <Row>
          <Col xs="12">
            <div className="mb-5">
                <h2 style={{ color: "white" }}> 
                    Add New Category
                </h2>
            </div>
          </Col>
          <Col xs="12">
            <form onSubmit={(e) => handleSubmit.mutate(e)}>
              <input
                onChange={handleChange}
                placeholder="Insert New Category"
                name="category"
                className="input-edit-category mt-4 w-100"
                style={{ height: "55px"}}
              />
              <div className="d-grid gap-2 mt-4">
                <Button type="submit" variant="success" size="md">
                  Add
                </Button>
              </div>
            </form>
          </Col>
        </Row>
      </Container>
    </>
  );
}