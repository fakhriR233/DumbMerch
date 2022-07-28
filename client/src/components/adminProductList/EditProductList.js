import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import { API } from "../../config/api";
import { Col, Row } from "react-bootstrap";
import CheckBox from "../form/checkBox";

const EditProductList = () => {
  let navigate = useNavigate();
  const [categories, setCategories] = useState([]); //Store all category data
  const [categoryId, setCategoryId] = useState([]); //Save the selected category id
  const [preview, setPreview] = useState(null); //For image preview
  const [product, setProduct] = useState({}); //Store product data
  const [form, setForm] = useState({
    image: "",
    name: "",
    desc: "",
    price: "",
    qty: "",
  }); //Store product data

  let { id } = useParams();

  let { data: products, refetch } = useQuery("productCache", async () => {
    const response = await API.get("/product/" + id);
    return response.data.data.product;
  });

  let { data: categoriesData, refetch: refetchCategories } = useQuery(
    "categoriesCache",
    async () => {
      const response = await API.get("/categories");
      setCategories(response.data.data);
    }
  );

  useEffect(() => {
    if (products) {
      setPreview(products.image);
      setForm({
        ...form,
        name: products.name,
        desc: products.desc,
        price: products.price,
        qty: products.qty,
      });
      setProduct(products);
    }

    if (categoriesData) {
      setCategories(categoriesData);
    }
  }, [products]);

  //console.log(categoriesData);

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

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Configuration
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      // Store data with FormData as object
      const formData = new FormData();
      if (form.image) {
        formData.set("image", form?.image[0], form?.image[0]?.name);
      }
      formData.set("name", form.name);
      formData.set("desc", form.desc);
      formData.set("price", form.price);
      formData.set("qty", form.qty);
      formData.set("categoryId", categoryId);

      // Insert product data
      const response = await API.patch(
        "/product/" + product.id,
        formData,
        config
      );
      console.log(response.data);

      navigate("/ListProduct");
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    const newCategoryId = product?.categories?.map((item) => {
      return item.id;
    });

    setCategoryId(newCategoryId);
  }, [product]);

  return (
    <div>
      <div>
        <div style={{ height: "97vh" }}>
          <Row>
            <div className="px-5 pt-4 mx-5 mt-5">
              <Col xs="12">
                <div className="mb-5">
                  <h4 style={Styles.WhiteText}> Edit Product</h4>
                </div>
              </Col>
              <Col xs="12">
                <form onSubmit={(e) => handleSubmit.mutate(e)}>
                  <div className="d-flex">
                    <div className="me-4">
                      <input
                        type="file"
                        id="upload"
                        name="image"
                        hidden
                        onChange={handleChange}
                      />
                      <label for="upload" className="label-file-add-product">
                        Upload file
                      </label>
                    </div>
                    <div className="p-2" style={Styles.WhiteText}>
                      <p>Placeholder.jpg</p>
                      {preview && (
                        <div>
                          <img
                            src={preview}
                            style={{
                              maxWidth: "150px",
                              maxHeight: "150px",
                              objectFit: "cover",
                            }}
                            alt="preview"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="mt-3">
                    <input
                      type="text"
                      placeholder="Product Name"
                      name="name"
                      onChange={handleChange}
                      value={form?.name}
                      className="input-edit-category mt-4"
                    />
                  </div>
                  <div style={Styles.WhiteText}>
                    <div className="mt-3">
                      <Form.Label for="desc">Description</Form.Label>
                      <textarea
                        placeholder="Product Desc"
                        name="desc"
                        onChange={handleChange}
                        value={form?.desc}
                        className="input-edit-category mt-4"
                        style={{ height: "130px" }}
                      ></textarea>
                    </div>
                    <div className="mt-3">
                      <Form.Label for="price">Price</Form.Label>
                      <input
                        type="number"
                        placeholder="Price (Rp.)"
                        name="price"
                        onChange={handleChange}
                        value={form?.price}
                        className="input-edit-category mt-4"
                      />
                    </div>
                    <div className="mt-3">
                      <Form.Label htmlFor="qty">Quantity</Form.Label>
                      <input
                        type="number"
                        placeholder="Stock"
                        name="qty"
                        onChange={handleChange}
                        value={form?.qty}
                        className="input-edit-category mt-4"
                      />
                    </div>
                    <div className="card-form-input mt-4 px-2 py-1 pb-2">
                      <div
                        className="text-secondary mb-1"
                        style={{ fontSize: "15px" }}
                      >
                        Category
                      </div>
                      {products &&
                        categories?.map((item, index) => (
                          <label key={index} className="checkbox-inline me-4">
                            <CheckBox
                              categoryId={categoryId}
                              value={item?.id}
                              handleChangeCategoryId={handleChangeCategoryId}
                            />
                            <span className="ms-2">{item?.name}</span>
                          </label>
                        ))}
                    </div>
                  </div>
                  <div className="my-4 pt-4">
                    <Button type="submit" className="w-100" variant="success">
                      Save
                    </Button>
                  </div>
                </form>
              </Col>
            </div>
          </Row>
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
