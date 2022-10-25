import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Products.css";

export const ProductList = () => {
  const [AllProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const localKandyUser = localStorage.getItem("kandy_user");
  const kandyUserObject = JSON.parse(localKandyUser);

  useEffect(() => {
    fetch(`http://localhost:8088/products?_expand=productTypes`)
      .then((response) => response.json())
      .then((productArray) => {
        setProducts(productArray);
        setAllProducts(productArray);
      });
  }, []);

  //   <div class="box mood">
  //   <select name="moodForTheDay" id="moodInput">
  //     <option value=""></option>
  //     <option value="Happy">Happy</option>
  //     <option value="Fine">Fine</option>
  //     <option value="Sad">Sad</option>
  //   </select>
  // </div>
  const filterOptions = (event) => {
    // console.log(event.target.value);
    console.log(AllProducts);

    var filtered = AllProducts.filter((obj) => obj.productTypes.name == event.target.value);

    console.log(filtered);
  };

  return (
    <>
      <h3>Our Products</h3>
      {kandyUserObject.staff ? (
        <>
          <button className="productBotton" onClick={() => setProducts(products.filter((obj) => obj.pricePerUnit > 2.0))}>
            Top Priced
          </button>

          <button className="productBotton all" onClick={() => setProducts(AllProducts)}>
            All Products
          </button>

          <button className="productBotton" onClick={() => navigate("/products/create")}>
            Add Product
          </button>
        </>
      ) : (
        <></>
      )}
      <article className="productContainer">
        {products.map((product) => {
          return (
            <section className="product" key={`products--${product.id}`}>
              <h4>Name : {product.name}</h4>
              <div>Price : ${product.pricePerUnit}</div>
              <div>Type : {product.productTypes.name}</div>
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
