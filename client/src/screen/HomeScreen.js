import React, { useContext } from "react";
import Header from "../components/Header";
import HomeScreenBody from "../components/HomeScreenBody/HomeScreenBody";
//import { useLocation } from 'react-router-dom'

import { UserContext } from "../context/userContext";

import { useQuery } from "react-query";
import { API } from "../config/api";

const HomeScreen = () => {
  //const location = useLocation();
  let [state] = useContext(UserContext);

  const imgEmpty =
    "https://img.freepik.com/free-vector/empty-concept-illustration_114360-1233.jpg?t=st=1658402964~exp=1658403564~hmac=03787b368611e198a16cb1fe551d3df6765f44fcc9c02027cc48effc80f04675&w=740";
  const title = "Shop";
  document.title = "DumbMerch | " + title;

  let { data: products } = useQuery("productsCache", async () => {
    const response = await API.get("/products");

    // console.log(response.data.data);
    return response.data.data.product;
  });

  return (
    <div>
      <Header />
      {products?.length !== 0 ? (
        <div>
          <HomeScreenBody products={products} />
        </div>
      ) : (
        <div className="text-center pt-5">
          <img
            src={imgEmpty}
            className="img-fluid"
            style={{ width: "40%" }}
            alt="empty"
          />
          <div className="mt-3" style={{ color: "white" }}>
            No data product
          </div>
        </div>
      )}
      )
    </div>
  );
};

export default HomeScreen;
