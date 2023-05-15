import React, { useEffect, useState } from "react";
import { getProducts } from "../../../api/products/getProducts";
import TableSkeleton from "../../skeletons/TableSkeleton";
import Table from "../static/Table";
import Modal from "../../common/Modal";
import AddProduct from "./integrate/AddProduct";
import { deleteProduct } from "../../../api/products/deleteProduct";
import { Link } from "react-router-dom";
const Product = () => {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const headerData = ["Name", "Description", "Price", "Amount", "Brand", "Created At", "Image", "Action"];
  const fetchProducts = async () => {
    const response = await getProducts(10);
    console.log(response);
    if (response.status === 200) {
      setProducts(response.data.items);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  const removeProduct = (id) => {
    deleteProduct(id, fetchProducts);
  };

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
                    <div className="rounded-md bg-red-500 py-1 px-2 text-white cursor-pointer" onClick={() => removeProduct(id)}>
                      Delete
                    </div>
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
      <Modal show={open} onClose={() => setOpen(false)}>
        <AddProduct />
      </Modal>
    </>
  );
};

export default Product;
