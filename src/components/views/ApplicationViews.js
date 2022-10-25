import { Outlet, Route, Routes } from "react-router-dom";
import { DataList } from "../DataList/DataList";
import { ProductList } from "../Products/Products";
import { ProductForm } from "../Products/ProductForm";

export const ApplicationViews = () => {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <h1>Kandy Korner</h1>
              <h2>Your one-stop-shop for all your sugar needs!</h2>

              <Outlet />
            </>
          }
        >
          <Route path="locations" element={<DataList />} />
          <Route path="products" element={<ProductList />} />
          <Route path="products/create" element={<ProductForm />} />
        </Route>
      </Routes>
    </>
  );
};
