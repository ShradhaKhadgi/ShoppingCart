import React, { useEffect, useState } from "react";
import { RiArrowGoBackLine } from "react-icons/ri";
import { FiShoppingCart } from "react-icons/fi";
import { data } from "./data";
import { Link } from "react-router-dom";
import { useCart } from "react-use-cart";

const Products = () => {
  const [search, setSearch] = useState("");
  const [product, setProduct] = useState(data);
  const [catData, setCatData] = useState([]);
  const [cat, setCat] = useState([]);
  const [size, setSize] = useState([]);
  const [qty, setQty] = useState({ quantity: 1, val: 1 });
  const { addItem, totalUniqueItems } = useCart();
  const getCat = () => {
    let category = data.map((elem) => {
      return elem.category;
    });
    setCat([...new Set(category)]);
  };
  const SelectCategory = () => {
    const value = document.getElementById("cat").value;
    let ct = data.filter((elem) => {
      return elem.category === value;
    });
    if (value === "All") {
      setProduct(data);
    } else {
      setProduct(ct);
      setCatData(ct);
      const sz = ct.map((elem) => {
        return elem.size;
      });
      setSize([...new Set(sz)]);
      setQty({ quantity: 1, val: 1 });
    }
  };
  const SelectSize = () => {
    const value = document.getElementById("size").value;
    const sz = catData.filter((elem) => {
      return elem.size === value;
    });
    if (value === "none") {
      setProduct(catData);
    } else {
      setQty({ quantity: 1, val: 1 });
      setProduct(sz);
    }
  };
  const defaultVal = () => {
    const value = document.getElementById("cat");
    setProduct(data);
    setSize([]);
    value.selectedIndex = 0;
    setQty({ quantity: 1, val: 1 });
  };

  useEffect(() => {
    getCat();
  }, []);
  return (
    <>
      <div className="container">
        <div className="row my-4">
          <h4 className="mb-3">Products</h4>
          <div className="col-6">
            <div className="row">
              <div className="col">
                <select
                  className="form-select form-select-sm"
                  id="cat"
                  onChange={SelectCategory}
                >
                  <option value="All">Select</option>
                  {cat.map((elem) => {
                    return <option value={elem} key={elem.id}>{elem}</option>;
                  })}
                </select>
              </div>
              <div className="col">
                <select
                  className="form-select form-select-sm mx-3"
                  id="size"
                  onChange={SelectSize}
                >
                  <option value="none">Size</option>
                  {size.map((elem) => {
                    return <option value={elem} key={elem.id}>{elem}</option>;
                  })}
                </select>
              </div>
              <div className="col">
                <p className="text-primary icon" onClick={defaultVal}>
                  <RiArrowGoBackLine className="mx-2" /> Reset
                </p>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="row">
              <div className="col-8">
                <input
                  className="form-control form-control-sm"
                  type="search"
                  placeholder="Search"
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="col-4">
                <Link to="/cart">
                  <FiShoppingCart className="fs-4 ms-3 text-dark icon" />
                </Link>
                <span className="badge position-absolute translate-middle bg-dark border border-light rounded-circle">
                  {totalUniqueItems}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <table className="table table-hover table-borderless">
            <thead className="table-light">
              <tr>
                <th scope="col">Image</th>
                <th scope="col">Name</th>
                <th scope="col">Color</th>
                <th scope="col">Stock</th>
                <th scope="col">Price</th>
                <th scope="col">Buy</th>
              </tr>
            </thead>
            <tbody>
              {product
                .filter((val) => {
                  if (search === "") {
                    return val;
                  } else if (
                    val.title.toLowerCase().includes(search.toLowerCase())
                  ) {
                    return val;
                  }
                })
                .map((elem) => {
                  return (
                    <tr key={elem.id}>
                      <td>
                        <img
                          src={elem.image}
                          alt={elem.title}
                          style={{ width: "100px", height: "100px" }}
                        />
                      </td>
                      <td className="w-50">{elem.title}</td>
                      <td>{elem.color}</td>
                      <td className="text-success">{elem.available}</td>
                      <td>${elem.price}</td>
                      <td>
                        <div className="d-flex">
                          <input
                            className="form-control form-control-sm"
                            type="text"
                            style={{ width: "2rem" }}
                            value={qty.val}
                            id="quantity"
                            onChange={(e) =>
                              setQty({ [e.target.id]: e.target.value })
                            }
                          />
                          <div
                            className="bg-dark mx-3 icon"
                            onClick={() =>
                              addItem(elem, parseInt(qty.quantity))
                            }
                          >
                            <FiShoppingCart className="mx-3 fs-4 text-white" />
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Products;
