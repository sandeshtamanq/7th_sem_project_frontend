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

const headerData = ["Id", "Brand Name", "Created At", "Action"];

const schema = yup.object().shape({
  brandName: yup.string().required("Brand Name is required"),
});

const Brand = () => {
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
    const response = await getBrands();
    if (response.status === 200) {
      setBrands(response.data);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

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
  return (
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
              <td className="px-6 py-4">{createdAt}</td>
              <td className="px-6 text-xs py-4">
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
  );
};

export default Brand;
