import React, { useEffect, useState } from "react";
import { getBrands } from "../../../api/brand/brand";
import Modal from "../../common/Modal";
import TableSkeleton from "../../skeletons/TableSkeleton";
import Table from "../static/Table";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { addBrand } from "../../../api/brand/addBrand";
import Loader from "../../common/Loader";
import { deleteBrand } from "../../../api/brand/removeBrand";
import { successToast } from "../../common/toastify";
import dayjs from "dayjs";

const headerData = ["Id", "Brand Name", "Created At", "Action"];

const schema = yup.object().shape({
  brandName: yup.string().required("Brand Name is required"),
});

const Brand = () => {
  const [totalPages, setTotalPages] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [brands, setBrands] = useState([]);
  const [open, setOpen] = useState(false);
  const fetchBrands = async () => {
    const response = await getBrands(pageNumber);
    if (response.status === 200) {
      setBrands(response.data.items);
      setTotalPages(response.data.meta.totalPages);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, [pageNumber]);

  const postBrand = async (data) => {
    const response = await addBrand(data, setLoading);
    if (response.status === 201) {
      setBrands((preVal) => {
        return [...preVal, response.data];
      });
      setOpen(false);
    }
  };

  const submitHandler = (data) => {
    postBrand(data);
  };

  const removeBrand = async (id) => {
    const res = await deleteBrand(id, fetchBrands);
    if (res.status === 200) successToast("Brand Deleted successfully");
  };
  return (
    <>
      <div>
        <div onClick={() => setOpen(true)} className="cursor-pointer bg-secondary p-1 rounded-full inline-block  text-xs my-2 text-white">
          Add New
        </div>
        {brands.length > 0 ? (
          <Table headerData={headerData}>
            {brands.map(({ id, brandName, createdAt }, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-gray-800" : "bg-gray-900"}>
                <td className="px-6 py-4">#{id}</td>
                <td className="px-6 py-4">{brandName}</td>
                <td className="px-6 py-4">{dayjs(createdAt).format("YYYY-MM-DD")}</td>
                <td className="px-6 text-xs py-4">
                  <div className="flex items-center gap-x-4">
                    <div className="rounded-md bg-red-500 py-1 px-2 text-white cursor-pointer" onClick={() => removeBrand(id)}>
                      Delete
                    </div>
                    {/* <div className="rounded-md bg-blue-500 text-white py-1 px-2">Edit</div> */}
                  </div>
                </td>
              </tr>
            ))}
          </Table>
        ) : (
          <TableSkeleton />
        )}

        <Modal show={open} onClose={() => setOpen(false)}>
          <div className="p-5">
            <form className="space-y-5" onSubmit={handleSubmit(submitHandler)}>
              <div>
                <label htmlFor="brandName">Brand Name:</label>
                <input type="text" name="brandName" id="brandName" {...register("brandName")} />
                <div className="text-red-500">{errors?.brandName?.message}</div>
              </div>
              <button className="bg-secondary px-5 py-2 text-white rounded-md">{loading ? <Loader css="h-[1.5rem] w-[4.7rem]" /> : "Add Brand"}</button>
            </form>
          </div>
        </Modal>
      </div>
      <div className="flex justify-end mt-5">
        <nav>
          <ul className="flex -space-x-px">
            <li
              onClick={() => {
                if (pageNumber <= 1) return;
                setPageNumber((preval) => preval - 1);
              }}
            >
              <div className="px-3 py-2 block ml-0  leading-tight  border  rounded-l-lg  bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white">Previous</div>
            </li>

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
            {/* {totalPages.map((page) => (
              <li key={page}>
                <a href="#" className="px-3 py-2 block leading-tight  border  bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white">
                  {page}
                </a>
              </li>
            ))} */}
            <li
              onClick={() => {
                if (pageNumber === totalPages) return;
                setPageNumber((preval) => preval + 1);
              }}
            >
              <div className="px-3 py-2 block leading-tight  border  rounded-r-lg  bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white">Next</div>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Brand;
