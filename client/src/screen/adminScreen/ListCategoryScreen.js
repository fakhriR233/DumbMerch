import React from "react";
import TableList from "../../components/adminCategoryProduct/TableCategoryProduct";
import AdminHeader from "../../components/AdminHeader";

const ListCategoryScreen = () => {
  return (
    <div>
      <AdminHeader />
      <div>
        <div>
          <TableList />
        </div>
      </div>
    </div>
  );
};

export default ListCategoryScreen;
