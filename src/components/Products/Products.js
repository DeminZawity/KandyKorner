import { useState, useEffect } from "react";
import "./Products.css";

export const ProductList = () => {
  const [AllProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8088/products`)
      .then((response) => response.json())
      .then((productArray) => {
        setProducts(productArray);
        setAllProducts(productArray);
      });
  }, []);

  return (
    <>
      <h3>Our Products</h3>

      <button className="productBotton" onClick={() => setProducts(products.filter((obj) => obj.pricePerUnit > 2.0))}>Top Priced</button>

      <button className="productBotton all" onClick={() => setProducts(AllProducts)}>All Products</button>

      <article className="productContainer">
        {products.map((product) => {
          return (
            <section className="product">
              <h4>Name : {product.name}</h4>
              <div>Price : ${product.pricePerUnit}</div>
            </section>
          );
        })}
      </article>

      {products.length < 1 && (
        <section className="product">
          <h4>There are not products to see here</h4>
        </section>
      )}
    </>
  );
};
