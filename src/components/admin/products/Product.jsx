import React, { useEffect, useState } from "react";
import { getProducts } from "../../../api/products/getProducts";
import TableSkeleton from "../../skeletons/TableSkeleton";
import Table from "../static/Table";

import { deleteProduct } from "../../../api/products/deleteProduct";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
const Product = () => {
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);
  const headerData = ["Name", "Description", "Price", "Amount", "Brand", "Created At", "Image", "Action"];
  const fetchProducts = async () => {
    const response = await getProducts(10, pageNumber);
    if (response.status === 200) {
      setProducts(response.data.items);
      setTotalPages(response.data.meta.totalPages);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, [pageNumber]);

  const removeProduct = (id) => {
    deleteProduct(id, fetchProducts);
  };

  console.log(products);

  return (
    <>
      <Link to="/admin/product/add" className="bg-secondary text-white p-1 cursor-pointer text-xs rounded-full inline-block my-2">
        Add Product
      </Link>
      <div>
        {products.length > 0 ? (
          <Table headerData={headerData}>
            {products.map(({ productName, productDescription, productPrice, productAmount, brandName, createdAt, productImage, id }, index) => (
              <tr className={index % 2 === 0 ? "bg-gray-800" : "bg-gray-900"} key={index}>
                <td className="px-6 py-4">{productName}</td>
                <td className="px-6 py-4">{productDescription.slice(0, 30) + "..."}</td>
                <td className="px-6 py-4">{`Rs.${productPrice}`}</td>
                <td className="px-6 py-4">{productAmount}</td>
                <td className="px-6 py-4">{brandName?.brandName}</td>
                <td className="px-6 py-4">{dayjs(createdAt).format("YYYY-MM-DD")}</td>
                <td className="px-6 py-4">
                  <img className="h-[3rem] w-[3rem]" src={`${productImage}`} alt="" />
                </td>
                <td className="px-6 py-4 text-xs">
                  <div className="flex items-center gap-x-4">
                    <div className="rounded-md bg-red-500 py-1 px-2 text-white cursor-pointer" onClick={() => removeProduct(id)}>
                      Delete
                    </div>
                    <Link to={`/admin/${id}/edit`} className="rounded-md bg-blue-500 text-white py-1 px-2">
                      Edit
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </Table>
        ) : (
          <TableSkeleton />
        )}
      </div>
      <div className="flex justify-end mt-5">
        <nav>
          <ul className="flex -space-x-px">
            {pageNumber > 1 && (
              <li
                onClick={() => {
                  if (pageNumber <= 1) return;
                  setPageNumber((preval) => preval - 1);
                }}
              >
                <div className="px-3 py-2 block ml-0  leading-tight  border  rounded-l-lg  bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white">Previous</div>
              </li>
            )}

            {(() => {
              let li = [];
              for (let i = 1; i <= totalPages; i++) {
                li.push(
                  <li key={i} onClick={() => setPageNumber(i)}>
                    <div
                      className={`px-3 py-2 ${pageNumber === i ? "bg-gray-700 text-white" : "bg-gray-800 text-gray-400"} leading-tight  border   border-gray-700  hover:bg-gray-700 hover:text-white`}
                    >
                      {i}
                    </div>
                  </li>
                );
              }
              return li;
            })()}

            {pageNumber < totalPages && (
              <li
                onClick={() => {
                  if (pageNumber === totalPages) return;
                  setPageNumber((preval) => preval + 1);
                }}
              >
                <div className="px-3 py-2 block leading-tight  border  rounded-r-lg  bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white">Next</div>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Product;
