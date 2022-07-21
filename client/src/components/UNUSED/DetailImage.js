import React from "react";
import Image from "react-bootstrap/esm/Image";
import ViperMini from "../../assets/images/viper-mini.jpg";
import { home } from "../../dataDummy";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { API } from "../../config/api";

const DetailImage = () => {
  let { id } = useParams();

  let { data: product } = useQuery("productCache", async () => {
    const response = await API.get("/product/" + id);

    return response.data.data;
  });

  console.log(product);

  return (
    <div>
      <div>
        <Image src={product.image} style={ImgSize} alt={product.name} />
      </div>
    </div>
  );
};

const ImgSize = {
  width: "436px",
  height: "555px",
  objectFit: "cover",
};

export default DetailImage;
