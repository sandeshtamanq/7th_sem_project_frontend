import React, { useEffect, useState } from "react";
import { getUsers } from "../../../api/users/totalUsers";
import TableSkeleton from "../../skeletons/TableSkeleton";
import { tableHeaders } from "../dashboard/Dashboard";
import Table from "../static/Table";
import dayjs from "dayjs";
const Users = () => {
  const [userLists, setUserLists] = useState([]);
  const fetchUsers = async () => {
    const response = await getUsers();
    if (response.status === 200) {
      setUserLists(response.data.items);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      {userLists.length > 0 ? (
        <Table headerData={tableHeaders}>
          {userLists.map(({ firstName, lastName, address, contactNumber, email, role, createdAt }, index) => (
            <tr className={index % 2 === 0 ? "bg-gray-800" : "bg-gray-900"} key={index}>
              <td className="px-6 py-4">{`${firstName} ${lastName}`}</td>
              <td className="px-6 py-4">{address ? address : "No Data"}</td>
              <td className="px-6 py-4">{contactNumber}</td>
              <td className="px-6 py-4">{email}</td>
              <td className="px-6 py-4">{dayjs(createdAt).format("YYYY-MM-DD")}</td>
              <td className="px-6 py-4 flex">
                <p className={`px-2 rounded-full border ${role === "admin" ? "border-red-500 bg-red-500" : "border-yellow-600 bg-yellow-600"}`}>{role}</p>
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

export default Users;
