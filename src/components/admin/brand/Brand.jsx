import React, { useEffect, useState } from "react";
import { getBrands } from "../../../api/brand/brand";
import TableSkeleton from "../../skeletons/TableSkeleton";
import Table from "../static/Table";

const headerData = ["Id", "Brand Name", "Created At", "Action"];

const Brand = () => {
  const [brands, setBrands] = useState([]);
  const fetchBrands = async () => {
    const response = await getBrands();
    if (response.status === 200) {
      setBrands(response.data);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);
  return (
    <div>
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
    </div>
  );
};

export default Brand;
