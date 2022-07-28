import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import { Link, useNavigate, useParams } from "react-router-dom";

import { API } from "../../config/api";
import { useMutation, useQuery } from "react-query";

const EditCategory = () => {
  let title = "Edit Category";
  document.title = "DumbMerch | " + title;

  let navigate = useNavigate();
  let { id } = useParams();

  // Create variabel for store categories
  const [category, setCategory] = useState({ name: "" });

  let { data: categoryData } = useQuery("categoriesCache", async () => {
    const response = await API.get("/category/" + id);
    //console.log(response);
    return response.data.data.category.name;
  });

  useEffect(() => {
    if (categoryData) {
      //console.log(categories);
      setCategory({ name: categoryData });
    }
  }, [categoryData]);

  const handleChange = (e) => {
    setCategory({
      ...category,
      name: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const body = JSON.stringify(category);

      await API.patch("/category/" + id, body, config);

      navigate("/ListCategory");
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <div>
      <div className="px-5 pt-4 mx-5 mt-5">
        <div className="mb-5">
          <h2 style={{ color: "white" }}> Edit Category</h2>
        </div>
        <div className="mt-3">
          <form onSubmit={(e) => handleSubmit.mutate(e)}>
            <input
              onChange={handleChange}
              value={category?.name}
              placeholder="category"
              className="input-edit-category mt-4"
            />
            <div className="d-grid gap-2 mt-4">
              <Button type="submit" variant="success" size="md">
                Save
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditCategory;
