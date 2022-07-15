import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import { Link } from 'react-router-dom'

const EditCategory = () => {
  return (
    <div>
      <div className="px-5 pt-4 mx-5 mt-5">
        <div className="mb-5">
          <h2 style={{ color: "white" }}> Edit Category</h2>
        </div>
        <div className="mt-3">
          <Form.Select
            style={{
              backgroundColor: "gray",
              color: "white",
              border: "2px solid white",
            }}
          >
            <option>Props Option Here</option>
          </Form.Select>
        </div>
        <div className="mt-5 pt-5">
          <Link to="/ListCategory">
            <Button className="w-100" variant="success">
              Save
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EditCategory;
