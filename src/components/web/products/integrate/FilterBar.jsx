import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchProductsAction, filterProductsAction } from "../../../../redux/reducers/productReducer";
import { filterProduct } from "../../../../api/products/filterProduct";
import { getProducts } from "../../../../api/products/getProducts";

const FilterBar = () => {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState({
    brand: "",
    price: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (filter.brand === "" && filter.price === "") {
      const response = await getProducts(20);
      if (response.status === 200) {
        dispatch(fetchProductsAction(response.data.items));
      }
      return;
    }
    const response = await filterProduct(filter.brand, filter.price);
    if (response.status === 200) {
      dispatch(filterProductsAction(response.data));
    }
  };
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFilter((preval) => {
      return {
        ...preval,
        [name]: value,
      };
    });
  };
  return (
    <div className="">
      <form onSubmit={handleSubmit} className="flex items-center gap-x-5">
        <input type="text" placeholder="Brand Name" autoComplete="off" name="brand" value={filter.brand} onChange={changeHandler} />
        <input type="number" id="" placeholder="Price" autoComplete="off" name="price" value={filter.price} onChange={changeHandler} />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default FilterBar;
