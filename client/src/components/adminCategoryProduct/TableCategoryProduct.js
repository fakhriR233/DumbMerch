import React from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from 'react-router-dom'
import { Col, Row } from "react-bootstrap";

// import { fakeCategory } from "../../fakeCategory";

import { API } from '../../config/api';
import { useQuery } from "react-query";

const TableCategoryProduct = () => {

  let navigate = useNavigate();

  let { data: categories } = useQuery('categoriesCache', async () => {
    const response = await API.get('/categories');
    //console.log(response.data.data.categories);
    return response.data.data.categories;
  });

  

  const addCategory = () => {
    navigate('/AddCategory');
  };

  return (
    <div>
        <div className="p-5 mx-5 my-3">
      <Row>
        <Col>
          <h2 style={{ color: "white" }} className="mb-3">
            List Category
          </h2>
        </Col>
        <Col className="text-end">
            <Button
              onClick={addCategory}
              className="btn-dark"
              style={{ width: '150px' }}
            >
              New Category
            </Button>
        </Col>
        {categories?.length !== 0 ? (
          <Table className="mt-2" variant="dark" bordered hover style={{ color: "white" }}>
            <thead>
              <tr>
                <th>No</th>
                <th>Category Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
            {categories?.map((item, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>
                  <Link to="/EditCategory">
                    <Button style={{ width: "150px" }} variant="success">
                      Edit
                    </Button>
                  </Link>
                  <Link to="/EditCategory">
                    <Button className="ms-2" style={{ width: "150px" }} variant="danger">
                      Delete
                    </Button>
                  </Link>
                </td>
              </tr>
            ))}
            </tbody>
          </Table>
        ) : (
          <div className="text-center pt-5">
            <div className="mt-3">No data category</div>
          </div>
        )}
      </Row>
        </div>
    </div>
  );
};

export default TableCategoryProduct;
