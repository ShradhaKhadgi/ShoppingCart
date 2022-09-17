import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "react-use-cart";
const ThankU = () => {
  let navigate = useNavigate();
  const { emptyCart } = useCart();
  return (
    <>
      <div className="container-fluid bg-light">
        <div className="d-flex justify-content-center align-items-center vh-100">
          <div className="shadow p-5 text-center bg-white">
            <div
              style={{ width: "100px", height: "120px" }}
              className="mx-auto"
            >
              <img
                src="https://images.freeimages.com/images/large-previews/99f/green-tick-in-circle-1147519.jpg"
                alt="done"
                className="w-100 h-100"
              />
            </div>
            <h4 className="my-3">Thank You for Shopping</h4>
            <button
              className="btn btn-outline-primary"
              onClick={() => {
                emptyCart();
                navigate("/");
              }}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ThankU;
