import React, { useEffect, useState } from "react";
import DropDown from "../../../common/DropDown";
import { getAllBrands } from "../../../../api/brand/brand";
import { addProducts } from "../../../../api/products/addProducts";
import RichTextEditor from "../../../common/RichTextEditor";
import Loader from "../../../common/Loader";
import { useNavigate } from "react-router-dom";
import { getSingleProduct } from "../../../../api/products/getSingleProduct";
import { useDispatch } from "react-redux";
import { openAction } from "../../../../redux/reducers/openReducer";
const AddProduct = () => {
  const navigate = useNavigate();
  const [brands, setBrands] = useState([]);
  const dispatch = useDispatch();
  const [productDescription, setProductDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [productDetail, setProductDetail] = useState({
    productName: "",
    productPrice: "",
    productAmount: "",
    brandName: "Select One",
  });
  const [productImage, setProductImage] = useState("");

  const fetchBrands = async () => {
    const response = await getAllBrands();
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
    setLoading(true);
    const response = await addProducts(formData);
    if (response.status === 201) {
      setLoading(false);
      navigate("/admin/product");
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("productName", productDetail.productName);
    formData.append("productDescription", productDescription);
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
            <div className="h-[20rem] w-[200px] z-[100] left-0 rounded-md absolute overflow-y-scroll bg-slate-50 top-[100%] shadow-md border  ">
              {brands.map((brand, index) => {
                return (
                  <div key={index} className="h-[2rem]">
                    <div
                      className="hover:bg-gray-200 cursor-pointer rounded-md"
                      onClick={() => {
                        setProductDetail((preVal) => {
                          return {
                            ...preVal,
                            brandName: brand.brandName,
                          };
                        });
                        dispatch(openAction());
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
          <RichTextEditor onChange={setProductDescription} value={productDescription} />
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
        <button className="text-white bg-secondary px-2 py-1 rounded-lg my-4">{loading ? <Loader /> : "Add Product"}</button>
      </form>
    </div>
  );
};

export default AddProduct;
