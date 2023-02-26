import React, { useEffect, useState } from "react";
import { getProducts } from "../../../api/products/getProducts";
import TableSkeleton from "../../skeletons/TableSkeleton";
import Table from "../static/Table";

const Product = () => {
  const [products, setProducts] = useState([]);
  const headerData = ["Name", "Description", "Price", "Amount", "Brand", "Created At", "Image", "Action"];
  const fetchProducts = async () => {
    const response = await getProducts();
    console.log(response);
    if (response.status === 200) {
      setProducts(response.data);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      {products.length > 0 ? (
        <Table headerData={headerData}>
          {products.map(({ productName, productDescription, productPrice, productAmount, brandName, createdAt, productImage }, index) => (
            <tr className={index % 2 === 0 ? "bg-gray-800" : "bg-gray-900"} key={index}>
              <td className="px-6 py-4">{productName}</td>
              <td className="px-6 py-4">{productDescription}</td>
              <td className="px-6 py-4">{`Rs.${productPrice}`}</td>
              <td className="px-6 py-4">{productAmount}</td>
              <td className="px-6 py-4">{brandName?.brandName}</td>
              <td className="px-6 py-4">{createdAt}</td>
              <td className="px-6 py-4">
                <img className="h-[3rem] w-[3rem]" src={`${productImage}`} alt="" />
              </td>
              <td className="px-6 py-4 text-xs">
                <div className="flex items-center gap-x-4">
                  <div className="rounded-md bg-red-500 py-1 px-2 text-white">Delete</div>
                  <div className="rounded-md bg-blue-500 text-white py-1 px-2">Edit</div>
                </div>
              </td>
            </tr>
          ))}
        </Table>
      ) : (
        <TableSkeleton />
      )}
    </div>
  );
};

export default Product;
