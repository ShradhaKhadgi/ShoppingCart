import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "react-use-cart";

const Cart = () => {
  let navigate = useNavigate();
  const { isEmpty, items, updateItemQuantity, removeItem, cartTotal } = useCart();

  return (
    <>
      <div className="container mt-5">
        <div className="d-flex justify-content-between">
          <h4 className="mb-5">Checkout Summary</h4>
          <div>
            <button
              className="btn btn-sm btn-primary icon"
              onClick={() => navigate(-1)}
            >
              Back
            </button>
          </div>
        </div>
        {isEmpty ? (
          <h2>No items in cart</h2>
        ) : (
          <div className="row">
            <div className="col-lg-8 col-sm-12">
              <table class="table table-borderless align-middle">
                <thead>
                  <tr>
                    <th colSpan={2} scope="col">
                      Product
                    </th>
                    <th scope="col">Price</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((elem) => {
                    return (
                      <tr key={elem.id}>
                        <td>
                          <span
                            className="fs-5 me-5 icon text-secondary"
                            onClick={() => {
                              removeItem(elem.id);
                            }}
                          >
                            𐤕
                          </span>
                          <img
                            src={elem.image}
                            alt={elem.category}
                            style={{ width: "100px", height: "100px" }}
                          />
                        </td>
                        <td className="w-25">{elem.title}</td>
                        <td className="text-secondary">${elem.price}</td>
                        <td>
                          <div className="d-flex justify-content-between align-items-center rounded-pill p-1 border text-secondary">
                            <div
                              className="fs-3 ms-2 icon"
                              onClick={() =>
                                updateItemQuantity(elem.id, elem.quantity - 1)
                              }
                            >
                              -
                            </div>
                            <div> {elem.quantity} </div>
                            <div
                              className="fs-3 me-2 icon"
                              onClick={() =>
                                updateItemQuantity(elem.id, elem.quantity + 1)
                              }
                            >
                              +
                            </div>
                          </div>
                        </td>
                        <td className="text-primary">
                          ${elem.quantity * elem.price}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="col-lg-4 col-sm-12">
              <div className="order_details p-3">
                <h5 className="mb-3">Cart Totals</h5>
                <div className="d-flex justify-content-between">
                  <p>Subtotal</p>
                  <p className="text-primary">{cartTotal}</p>
                </div>
                <hr />
                <div className="d-flex justify-content-between mb-3">
                  <strong>Total</strong>
                  <strong className="text-primary">{cartTotal}</strong>
                </div>
                <div className="d-grid">
                  <button
                    className="btn btn-sm btn-primary rounded-pill text-uppercase fw-bold p-2"
                    onClick={() => navigate("/thankU")}
                  >
                    proceed to checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
