import React from "react";
import Button from "react-bootstrap/esm/Button";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import { API } from "../../config/api";
import { home } from "../../dataDummy";

const DetailDesc = () => {
  let { id } = useParams();

  let { data: product } = useQuery("productCache", async () => {
    const response = await API.get("/product/" + id);

    return response.data.data;
  });
  // const params = useParams()

  // const indx = params.id

  return (
    <div>
      <div>
        <div>
          <h2 style={Styles.RedText}> {product.name}</h2>
        </div>
        <div>
          <h5 style={Styles.RedText}> Stock: {product.qty}</h5>
        </div>
        <div>
          <p style={Styles.WhiteText}>{product.desc}</p>
        </div>
        <div style={Styles.Button}>
          <div>
            <p style={Styles.RedText} className="text-end my-3">
              Rp. {product.price}
            </p>
          </div>
          <div className="d-flex justify-content-md-end mt-auto">
            <Button variant="danger" className="p-2 w-100">
              Buy
            </Button>
            <Link to="/CompareProduct">
              <Button variant="warning" className="p-2 ms-2">
                Compare
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const Styles = {
  RedText: {
    color: "red",
  },
  WhiteText: {
    color: "white",
    textAlign: "justify",
  },
  Button: {
    marginTop: "178px",
  },
};

export default DetailDesc;
