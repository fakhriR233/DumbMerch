import React from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { Link } from 'react-router-dom'
import { Col, Row } from "react-bootstrap";

const TableCategoryProduct = () => {
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
              // onClick={addCategory}
              className="btn-dark"
              style={{ width: '150px' }}
            >
              New Category
            </Button>
        </Col>
          <Table className="mt-2" variant="dark" bordered hover style={{ color: "white" }}>
            <thead>
              <tr>
                <th>No</th>
                <th>Category Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Mouse</td>
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
            </tbody>
          </Table>
      </Row>
        </div>
    </div>
  );
};

export default TableCategoryProduct;
