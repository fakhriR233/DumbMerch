import React from "react";
import AdminHeader from "../../components/AdminHeader";
import TableListProduct from "../../components/adminProductList/TableProductList";

const ProductListScreen = () => {
  return (
    <div>
      <AdminHeader />
      <div>
        <div>
          <TableListProduct />
        </div>
      </div>
    </div>
  );
};

export default ProductListScreen;
