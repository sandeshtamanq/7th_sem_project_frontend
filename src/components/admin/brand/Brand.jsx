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
import { updateBrand } from "../../../api/brand/udpataBrand";

const headerData = ["Id", "Brand Name", "Created At", "Action"];

const schema = yup.object().shape({
  brandName: yup.string().required("Brand Name is required"),
});

const Brand = () => {
  const [totalPages, setTotalPages] = useState(1);
  const [fetching, setFetching] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(false);
  const [brands, setBrands] = useState([]);
  const [open, setOpen] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [brandIdToDelete, setBrandIdToDelete] = useState(null); // State for selected brand to delete
  const [editMode, setEditMode] = useState(false); // State to track edit mode
  const [selectedBrand, setSelectedBrand] = useState(null); // State to track the selected brand for editing

  const {
    register,
    handleSubmit,
    reset, // Used to preload form data
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const fetchBrands = async () => {
    setFetching(true);
    try {
      const response = await getBrands(pageNumber);
      if (response.status === 200) {
        setBrands(response.data.items);
        setTotalPages(response.data.meta.totalPages);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, [pageNumber]);

  const postBrand = async (data) => {
    const response = await addBrand(data, setLoading);
    if (response.status === 201) {
      setBrands((preVal) => [...preVal, response.data]);
      setOpen(false);
    }
  };

  const updateBrandHandler = async (data) => {
    try {
      const response = await updateBrand(selectedBrand.id, data, setLoading);
      if (response.status === 200) {
        setBrands((prev) =>
          prev.map((brand) =>
            brand.id === selectedBrand.id ? { ...brand, ...data } : brand
          )
        );
        reset();
        setOpen(false);
        setEditMode(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const submitHandler = (data) => {
    if (editMode) {
      updateBrandHandler(data);
    } else {
      postBrand(data);
    }
  };

  const removeBrand = async () => {
    const res = await deleteBrand(brandIdToDelete, fetchBrands);
    if (res.status === 200) {
      successToast("Brand Deleted successfully");
      setOpenDeleteModal(false);
    }
  };

  return (
    <>
      <div>
        <div
          onClick={() => {
            setEditMode(false); // Reset to add mode
            setSelectedBrand(null);
            reset({ brandName: "" });
            setOpen(true);
          }}
          className="cursor-pointer bg-secondary p-1 rounded-full inline-block text-xs my-2 text-white"
        >
          Add New
        </div>
        {!fetching ? (
          <Table headerData={headerData}>
            {brands.map(({ id, brandName, createdAt }, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-primary" : "bg-secondary"}
              >
                <td className="px-6 py-4">#{id}</td>
                <td className="px-6 py-4">{brandName}</td>
                <td className="px-6 py-4">
                  {dayjs(createdAt).format("YYYY-MM-DD")}
                </td>
                <td className="px-6 text-xs py-4">
                  <div className="flex items-center gap-x-4">
                    <div
                      className="rounded-md bg-blue-500 py-1 px-2 text-white cursor-pointer"
                      onClick={() => {
                        setEditMode(true); // Enable edit mode
                        setSelectedBrand({ id, brandName }); // Set the selected brand
                        reset({ brandName }); // Preload form with the brand's data
                        setOpen(true); // Open the modal
                      }}
                    >
                      Edit
                    </div>
                    <div
                      className="rounded-md bg-red-500 py-1 px-2 text-white cursor-pointer"
                      onClick={() => {
                        setBrandIdToDelete(id); // Set the brand ID to be deleted
                        setOpenDeleteModal(true); // Show the confirmation modal
                      }}
                    >
                      Delete
                    </div>
                  </div>
                </td>
              </tr>
            ))}
            {brands.length <= 0 && (
              <div className="p-4 text-black">No any brands</div>
            )}
          </Table>
        ) : (
          <TableSkeleton />
        )}

        {/* Add/Edit Brand Modal */}
        <Modal show={open} onClose={() => setOpen(false)}>
          <div className="p-5">
            <h3 className="text-xl font-bold mb-4">
              {editMode ? "Edit Brand" : "Add Brand"}
            </h3>
            <form className="space-y-5" onSubmit={handleSubmit(submitHandler)}>
              <div>
                <label htmlFor="brandName">Brand Name:</label>
                <input
                  type="text"
                  name="brandName"
                  id="brandName"
                  {...register("brandName")}
                />
                <div className="text-red-500">{errors?.brandName?.message}</div>
              </div>
              <button className="bg-secondary px-5 py-2 text-white rounded-md">
                {loading ? (
                  <Loader css="h-[1.5rem] w-[4.7rem]" />
                ) : editMode ? (
                  "Update Brand"
                ) : (
                  "Add Brand"
                )}
              </button>
            </form>
          </div>
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal show={openDeleteModal} onClose={() => setOpenDeleteModal(false)}>
          <div className="p-5">
            <h3>Are you sure you want to delete this brand?</h3>
            <div className="flex justify-end gap-x-4 mt-4">
              <button
                onClick={() => setOpenDeleteModal(false)}
                className="bg-gray-500 text-white px-5 py-2 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={removeBrand}
                className="bg-red-500 text-white px-5 py-2 rounded-md"
              >
                Yes, Delete
              </button>
            </div>
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
              <div className="px-3 py-2 block ml-0 leading-tight border rounded-l-lg bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white">
                Previous
              </div>
            </li>

            {(() => {
              let li = [];
              for (let i = 1; i <= totalPages; i++) {
                li.push(
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
                );
              }
              return li;
            })()}

            <li
              onClick={() => {
                if (pageNumber === totalPages) return;
                setPageNumber((preval) => preval + 1);
              }}
            >
              <div className="px-3 py-2 block ml-0 leading-tight border rounded-r-lg bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white">
                Next
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Brand;
