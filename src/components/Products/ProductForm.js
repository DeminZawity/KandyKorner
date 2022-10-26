import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const ProductForm = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState({
    name: "",
    price: "",
    type: "",
  });

  // const localKandyUser = localStorage.getItem("kandy_user");
  // const kandyUserObject = JSON.parse(localKandyUser);

  const addingNewProduct = (event) => {
    event.preventDefault();

    const productToSendToAPI = {
      name: products.name,
      productTypesId: parseInt(products.type),
      pricePerUnit: parseInt(products.price),
    };

    return fetch(`http://localhost:8088/products?_expand=productTypes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productToSendToAPI),
    })
      .then((response) => response.json())
      .then(() => {
        navigate("/products");
      });
  };

  return (
    <form className="productForm">
      <h2 className="productFormTitle">Add A New Product</h2>
      <fieldset>
        <div className="product-group">
          <label htmlFor="name">Product Name</label>
          <input
            required
            autoFocus
            type="text"
            className="form-control"
            placeholder="Name of New Product"
            value={products.name}
            onChange={(evt) => {
              const copy = { ...products };
              copy.name = evt.target.value;
              setProducts(copy);
            }}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="product-group">
          <label htmlFor="price">Price</label>
          <input
            required
            autoFocus
            type="text"
            className="form-control"
            placeholder="Price of New Product"
            value={products.price}
            onChange={(evt) => {
              const copy = { ...products };
              copy.price = evt.target.value;
              setProducts(copy);
            }}
          />
        </div>
      </fieldset>
      <fieldset>
        <input
          type="number"
          name="productTypesId"
          value={products.type.id}
          onChange={(evt) => {
            const copy = { ...products };
            copy.type = evt.target.value;
            setProducts(copy);
          }}
        />
      </fieldset>
      <button onClick={(clickEvent) => addingNewProduct(clickEvent)} className="btn btn-primary">
        Submit Ticket
      </button>
    </form>
  );
};
