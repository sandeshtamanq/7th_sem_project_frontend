import React, { useEffect, useState } from "react";
import { getProducts } from "../../../api/products/getProducts";
import TableSkeleton from "../../skeletons/TableSkeleton";
import Table from "../static/Table";
import Modal from "../../common/Modal";
import { deleteProduct } from "../../../api/products/deleteProduct";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState(null);

  const headerData = [
    "Name",
    "Description",
    "Price",
    "Amount",
    "Brand",
    "Created At",
    "Image",
    "Action",
  ];

  const fetchProducts = async () => {
    setFetching(true);
    try {
      const response = await getProducts(10, pageNumber);
      if (response.status === 200) {
        setProducts(response.data.items);
        setTotalPages(response.data.meta.totalPages);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [pageNumber]);

  const confirmDelete = (id) => {
    setProductIdToDelete(id);
    setOpenDeleteModal(true);
  };

  const removeProduct = async () => {
    try {
      const response = await deleteProduct(productIdToDelete, fetchProducts);
    } catch (err) {
      console.error(err);
    } finally {
      setOpenDeleteModal(false);
      setProductIdToDelete(null);
    }
  };

  return (
    <>
      <Link
        to="/admin/product/add"
        className="bg-secondary text-white p-1 cursor-pointer text-xs rounded-full inline-block my-2"
      >
        Add Product
      </Link>
      <div>
        {!fetching ? (
          <Table headerData={headerData}>
            {products.map(
              (
                {
                  productName,
                  productDescription,
                  productPrice,
                  productAmount,
                  brandName,
                  createdAt,
                  productImage,
                  id,
                },
                index
              ) => (
                <tr
                  className={index % 2 === 0 ? "bg-primary" : "bg-secondary"}
                  key={index}
                >
                  <td className="px-6 py-4">{productName}</td>
                  <td className="px-6 py-4">
                    {productDescription.slice(0, 30) + "..."}
                  </td>
                  <td className="px-6 py-4">{`Rs.${productPrice}`}</td>
                  <td className="px-6 py-4">{productAmount}</td>
                  <td className="px-6 py-4">{brandName?.brandName}</td>
                  <td className="px-6 py-4">
                    {dayjs(createdAt).format("YYYY-MM-DD")}
                  </td>
                  <td className="px-6 py-4">
                    <img
                      className="h-[3rem] w-[3rem]"
                      src={`${productImage}`}
                      alt=""
                    />
                  </td>
                  <td className="px-6 py-4 text-xs">
                    <div className="flex items-center gap-x-4">
                      <div
                        className="rounded-md bg-red-500 py-1 px-2 text-white cursor-pointer"
                        onClick={() => confirmDelete(id)}
                      >
                        Delete
                      </div>
                      <Link
                        to={`/admin/${id}/edit`}
                        className="rounded-md bg-blue-500 text-white py-1 px-2"
                      >
                        Edit
                      </Link>
                    </div>
                  </td>
                </tr>
              )
            )}
            {products.length <= 0 && (
              <div className=" p-4 text-black">No any products</div>
            )}
          </Table>
        ) : (
          <TableSkeleton />
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <Modal show={openDeleteModal} onClose={() => setOpenDeleteModal(false)}>
        <div className="p-5">
          <h3>Are you sure you want to delete this product?</h3>
          <div className="flex justify-end gap-x-4 mt-4">
            <button
              onClick={() => setOpenDeleteModal(false)}
              className="bg-gray-500 text-white px-5 py-2 rounded-md"
            >
              Cancel
            </button>
            <button
              onClick={removeProduct}
              className="bg-red-500 text-white px-5 py-2 rounded-md"
            >
              Yes, Delete
            </button>
          </div>
        </div>
      </Modal>

      <div className="flex justify-end mt-5">
        <nav>
          <ul className="flex -space-x-px">
            {pageNumber > 1 && (
              <li
                onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))}
              >
                <div className="px-3 py-2 block leading-tight border rounded-l-lg bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white">
                  Previous
                </div>
              </li>
            )}

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((i) => (
              <li key={i} onClick={() => setPageNumber(i)}>
                <div
                  className={`px-3 py-2 ${
                    pageNumber === i
                      ? "bg-gray-700 text-white"
                      : "bg-gray-800 text-gray-400"
                  } leading-tight border border-gray-700 hover:bg-gray-700 hover:text-white`}
                >
                  {i}
                </div>
              </li>
            ))}

            {pageNumber < totalPages && (
              <li
                onClick={() =>
                  setPageNumber((prev) => Math.min(prev + 1, totalPages))
                }
              >
                <div className="px-3 py-2 block leading-tight border rounded-r-lg bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white">
                  Next
                </div>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Product;
