import React from "react";
import TableCategoryProduct from "../../components/adminCategoryProduct/TableCategoryProduct";
import AdminHeader from "../../components/AdminHeader";

const ListCategoryScreen = () => {
  return (
    <div>
      <AdminHeader />
      <div>
        <div>
          <TableCategoryProduct />
        </div>
      </div>
    </div>
  );
};

export default ListCategoryScreen;
