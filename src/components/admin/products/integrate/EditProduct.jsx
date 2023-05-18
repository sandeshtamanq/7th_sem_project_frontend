import React, { useEffect, useState } from "react";
import DropDown from "../../../common/DropDown";
import { getAllBrands } from "../../../../api/brand/brand";
import RichTextEditor from "../../../common/RichTextEditor";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleProduct } from "../../../../api/products/getSingleProduct";
import { updateProduct } from "../../../../api/products/updateProduct";
import { successToast } from "../../../common/toastify";
import Loader from "../../../common/Loader";

const EditProduct = () => {
  const { id } = useParams();
  const [brands, setBrands] = useState([]);
  const [productDescription, setProductDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [productDetail, setProductDetail] = useState({
    productName: "",
    productPrice: "",
    productAmount: "",
    brandName: "Select One",
  });
  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await updateProduct(productDetail, id, productDescription);
    if (response.status === 200) {
      successToast("Product updated successfully");
      setLoading(false);
      navigate("/admin/product");
    }
  };

  const fetchBrands = async () => {
    const response = await getAllBrands();
    if (response.status === 200) {
      setBrands(response.data);
    }
  };

  const fetchSingleProduct = async (id) => {
    const response = await getSingleProduct(id);
    if (response.status === 200) {
      setProductDescription(response.data.productDescription);
      setProductDetail({
        ...response.data,
      });
    }
  };

  useEffect(() => {
    fetchBrands();
    fetchSingleProduct(id);
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

  return (
    <div className="p-5">
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="productName">Product Name</label>
          <input type="text" name="productName" id="productName" placeholder="Enter Product Name" value={productDetail.productName} onChange={changeHandler} />
        </div>
        <div className="relative flex items-center my-4">
          <div>{productDetail.brandName.brandName}</div>
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
          <img src={productDetail.productImage} alt="" className="h-[10rem] w-[13rem]" />
          <input
            type="file"
            name="productImage"
            onChange={(e) => {
              setProductImage(e.target.files[0]);
            }}
          />
        </div>
        <button className="text-white bg-secondary px-2 py-1 rounded-lg my-4">{loading ? <Loader /> : "Update Product"}</button>
      </form>
    </div>
  );
};

export default EditProduct;
