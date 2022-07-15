import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import { Link } from 'react-router-dom'

const EditProductList = () => {
  return (
    <div>
      <div>
        <div style={{ height: "97vh" }}>
          <div className="px-5 pt-4 mx-5 mt-5">
            <div className="mb-5">
              <h4 style={Styles.WhiteText}> Edit Product</h4>
            </div>
            <div className="d-flex">
              <div className="me-4">
                <Button style={{ width: "146px" }} variant="danger">
                  Edit Image
                </Button>
              </div>
              <div className="p-2" style={Styles.WhiteText}>
                <p>Placeholder.jpg</p>
              </div>
            </div>
            <div className="mt-3">
              <Form.Select style={Styles.FormBg}>
                <option>Props Option Here</option>
              </Form.Select>
            </div>
            <div style={Styles.WhiteText}>
              <div className="mt-3">
                <Form.Label htmlFor="inputDescription">Description</Form.Label>
                <Form.Control
                  as="textarea"
                  id="inputDesc"
                  rows={2}
                  style={Styles.FormBg}
                />
              </div>
              <div className="mt-3">
                <Form.Label htmlFor="inputDescription">Price</Form.Label>
                <Form.Control
                  type="text"
                  id="inputPrice"
                  style={Styles.FormBg}
                />
              </div>
              <div className="mt-3">
                <Form.Label htmlFor="inputDescription">Quantity</Form.Label>
                <Form.Control type="text" id="inputQty" style={Styles.FormBg} />
              </div>
            </div>
            <div className="my-4 pt-4">
              <Link to="/ListProduct">
                <Button className="w-100" variant="success">
                  Save
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Styles = {
  WhiteText: {
    color: "white",
  },
  FormBg: {
    backgroundColor: "gray",
    color: "white",
    border: "2px solid white",
  },
};

export default EditProductList;
