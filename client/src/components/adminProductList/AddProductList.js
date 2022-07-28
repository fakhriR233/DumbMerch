import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useMutation } from "react-query";

import AdminHeader from "../AdminHeader";

import { API } from "../../config/api";
import CheckBox from "../form/checkBox";

const AddProductList = () => {
  let navigate = useNavigate();

  const [categories, setCategories] = useState([]); //Store all category data
  const [categoryId, setCategoryId] = useState([]); //Save the selected category id
  const [preview, setPreview] = useState(null); //For image preview

  const [form, setForm] = useState({
    name: "",
    image: "",
    desc: "",
    price: "",
    qty: "",
  });

  const getCategories = async () => {
    try {
      const response = await API.get("/categories");
      setCategories(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // For handle if category selected
  const handleChangeCategoryId = (e) => {
    const id = e.target.value;
    const checked = e.target.checked;

    if (checked) {
      // Save category id if checked
      setCategoryId([...categoryId, parseInt(id)]);
    } else {
      // Delete category id from variable if unchecked
      let newCategoryId = categoryId.filter((categoryIdItem) => {
        return categoryIdItem !== id;
      });
      setCategoryId(newCategoryId);
    }
  };

  // Handle change data on form
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });

    // Create image url for preview
    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };

  const [message, setMessage] = useState(null);

  // Create function for handle insert product data with useMutation here ...
  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Configuration Content-type
      const config = {
        method: "POST",
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      const formData = new FormData();
      formData.set("image", form?.image[0], form?.image[0].name);
      formData.set("name", form.name);
      formData.set("desc", form.desc);
      formData.set("price", form.price);
      formData.set("qty", form.qty);
      formData.set("categoryId", categoryId);
      console.log(form);
      //console.log(formData);

      // Insert data user to database
      const response = await API.post("/product", formData, config);
      console.log(response);

      navigate("/ListProduct");
      // Handling response here

      if (response.data.status === "Success") {
        const alert = (
          <Alert variant="success" className="py-1">
            {response.data.status}
          </Alert>
        );
        setMessage(alert);
        setForm({
          name: "",
          image: "",
          desc: "",
          price: "",
          qty: "",
        });
      }
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div>
      <AdminHeader />
      <Container className="py-5">
        <Row>
          <Col xs="12">
            <div className="mb-4" style={Style.textHeaderCategory}>
              Add Product
            </div>
          </Col>
          <Col xs="12">
            <form onSubmit={(e) => handleSubmit.mutate(e)}>
              {preview && (
                <div>
                  <img
                    src={preview}
                    style={{
                      maxWidth: "150px",
                      maxHeight: "150px",
                      objectFit: "cover",
                    }}
                    alt={preview}
                  />
                </div>
              )}
              <input
                type="file"
                id="upload"
                name="image"
                hidden
                onChange={handleChange}
              />
              <label for="upload" style={Style.labelFileAddProduct}>
                Upload file
              </label>
              <input
                type="text"
                placeholder="Product Name"
                name="name"
                onChange={handleChange}
                className="mt-4"
                style={Style.inputEditCategory}
              />
              <textarea
                placeholder="Product Desc"
                name="desc"
                onChange={handleChange}
                className="input-edit-category mt-4"
                style={Style.inputEditCategoryDesc}
              ></textarea>
              <input
                type="number"
                placeholder="Price (Rp.)"
                name="price"
                onChange={handleChange}
                className="mt-4"
                style={Style.inputEditCategory}
              />
              <input
                type="number"
                placeholder="Stock"
                name="qty"
                onChange={handleChange}
                className="mt-4"
                style={Style.inputEditCategory}
              />

              <div className="card-form-input mt-4 px-2 py-1 pb-2">
                <div
                  className="text-secondary mb-1"
                  style={{ fontSize: "15px" }}
                >
                  Category
                </div>
                {categories.map((item, index) => (
                  <label
                    className="checkbox-inline me-4"
                    key={index}
                    style={{ color: "white" }}
                  >
                    <input
                      type="checkbox"
                      value={item.id}
                      onClick={handleChangeCategoryId}
                    />{" "}
                    {item.name}
                  </label>
                ))}
              </div>

              <div className="d-grid gap-2 mt-4">
                <Button type="submit" variant="success" size="md">
                  Add Product
                </Button>
              </div>
            </form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const Style = {
  textHeaderCategory: {
    fontStyle: "normal",
    fontWeight: 600,
    fontSize: "24px",
    lineHeight: "33px",
    color: "white",
  },
  labelFileAddProduct: {
    background: "#f74d4d",
    color: "white",
    padding: "0.5rem 1rem",
    fontFamily: "sans-serif",
    borderRadius: "0.3rem",
    cursor: "pointer",
    marginTop: "1rem",
  },
  inputEditCategory: {
    width: "100%",
    background: "rgba(210, 210, 210, 0.25)",
    border: "2px solid #bcbcbc",
    boxSizing: "border-box",
    borderRadius: "5px",
    padding: "5px 10px",
    color: "white",
  },
  inputEditCategoryDesc: {
    width: "100%",
    background: "rgba(210, 210, 210, 0.25)",
    border: "2px solid #bcbcbc",
    boxSizing: "border-box",
    borderRadius: "5px",
    padding: "5px 10px",
    color: "white",
    height: "130px",
  },
};

export default AddProductList;
