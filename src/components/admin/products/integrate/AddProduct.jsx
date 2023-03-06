import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import DropDown from "../../../common/DropDown";
import { getBrands } from "../../../../api/brand/brand";
import { addProducts } from "../../../../api/products/addProducts";
const AddProduct = () => {
  const [brands, setBrands] = useState([]);
  const [productDetail, setProductDetail] = useState({
    productName: "",
    productDescription: "",
    productPrice: "",
    productAmount: "",
    brandName: "Select One",
  });
  const [productImage, setProductImage] = useState("");
  const fetchBrands = async () => {
    const response = await getBrands();
    if (response.status === 200) {
      setBrands(response.data);
    }
  };
  useEffect(() => {
    fetchBrands();
  }, []);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setProductDetail((preVal) => {
      return {
        ...preVal,
        [name]: value,
      };
    });
  };

  const postProduct = async (formData) => {
    const response = await addProducts(formData);
    if (response.status === 201) {
      console.log(response);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(productImage);
    const formData = new FormData();
    formData.append("productName", productDetail.productName);
    formData.append("productDescription", productDetail.productDescription);
    formData.append("productPrice", productDetail.productPrice);
    formData.append("productAmount", productDetail.productAmount);
    formData.append("productImage", productImage);
    formData.append("brandName", productDetail.brandName);
    postProduct(formData);
  };
  return (
    <div className="p-5">
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="productName">Product Name</label>
          <input type="text" name="productName" id="productName" placeholder="Enter Product Name" value={productDetail.productName} onChange={changeHandler} />
        </div>
        <div className="relative flex items-center my-4">
          <div>{productDetail.brandName}</div>
          <DropDown>
            <div className="min-h-[2rem] w-[200px] right-[200px] rounded-md absolute bg-slate-50 top-[100%] shadow-md border  ">
              {brands.map((brand, index) => {
                return (
                  <div key={index} className="z-[100]">
                    <div
                      className="hover:bg-gray-200 cursor-pointer rounded-md"
                      onClick={() => {
                        setProductDetail((preVal) => {
                          return {
                            ...preVal,
                            brandName: brand.brandName,
                          };
                        });
                      }}
                    >
                      {brand.brandName}
                    </div>
                  </div>
                );
              })}
            </div>
          </DropDown>
        </div>
        <div>
          <label htmlFor="productDescription">Product Description</label>
          <input type="text" name="productDescription" value={productDetail.productDescription} onChange={changeHandler} id="productDescription" placeholder="Enter Product Description" />
        </div>
        <div>
          <label htmlFor="productPrice">Product Price</label>
          <input type="number" name="productPrice" id="productPrice" placeholder="Enter Product Price" value={productDetail.productPrice} onChange={changeHandler} />
        </div>
        <div>
          <label htmlFor="productAmount">Product Amount</label>
          <input type="number" name="productAmount" id="productAmount" placeholder="Enter Product Amount" value={productDetail.productAmount} onChange={changeHandler} />
        </div>
        <div className="mt-5">
          {/* <label htmlFor="productImage">Product Image</label>s */}
          <input
            type="file"
            name="productImage"
            onChange={(e) => {
              setProductImage(e.target.files[0]);
            }}
          />
        </div>
        <button className="text-white bg-secondary px-2 py-1 rounded-lg my-4">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
