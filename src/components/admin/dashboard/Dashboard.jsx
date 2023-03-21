import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../../../api/users/totalUsers";
import Infocard from "./integrate/Infocard";
import { FiUsers } from "react-icons/fi";
import Table from "../static/Table";
import Chart from "react-apexcharts";
import { getUserStat } from "../../../api/users/getUserStat";
export const tableHeaders = ["Full Name", "Address", "Contact", "Email", "Created At", "Role"];

function Dashboard() {
  const [data, setData] = useState([]);
  const [category, setCategory] = useState([]);
  const [tab, setTab] = useState("user");
  const navigate = useNavigate();
  const [users, setUsers] = useState({
    users: [],
    admins: [],
  });
  const fetchUsers = async () => {
    const response = await getUsers();
    if (response.status === 200) {
      const users = response.data.items?.filter((user) => {
        return user.role === "user";
      });
      const admins = response.data.items?.filter((user) => {
        return user.role === "admin";
      });
      setUsers({
        users,
        admins,
      });
    }

    if (response.status === 401) {
      navigate("/");
      localStorage.clear();
    }
  };
  const fetchUserStat = async () => {
    const response = await getUserStat();
    if (response.status === 200) {
      const data = response.data.reduce((acc, current) => [...acc, ...current["number_of_users"]], ["0"]);
      setData(data);
      const category = response.data.reduce((acc, current) => [...acc, current["day"].split("T")[0]], ["start"]);
      setCategory(category);
    }
  };
  useEffect(() => {
    fetchUsers();
    fetchUserStat();
  }, []);

  const series = [
    {
      name: "Users",
      data,
    },
  ];

  const options = {
    chart: {
      id: "basic-bar",
    },
    xaxis: {
      categories: category,
    },
  };

  return (
    <div>
      <div className="flex items-center w-full">
        <Infocard number={users.totalUser} heading={"Total Users"} background={"bg-red-400"} icon={<FiUsers />} />
        <Infocard number={users.totalUser} background={"bg-red-400"} />
        <Infocard number={users.totalUser} background={"bg-red-400"} />
      </div>
      <Chart options={options} series={series} type="line" width={"50%"} />
      <div className="mt-10">
        <div className="flex justify-end items-center gap-x-5 py-2">
          <p className={`text-sm cursor-pointer ${tab === "user" && "bg-yellow-600 text-white shadow-md"} rounded-full px-2 py-1`} onClick={() => setTab("user")}>
            Users
          </p>
          <p className={`text-sm ${tab === "admin" && "bg-red-500 text-white shadow-md"} cursor-pointer rounded-full px-2 py-1`} onClick={() => setTab("admin")}>
            Admins
          </p>
        </div>
        <div>
          {tab === "user" && (
            <Table headerData={tableHeaders}>
              {users?.users.map(({ firstName, lastName, address, contactNumber, email, role, createdAt }, index) => (
                <tr className={index % 2 === 0 ? "bg-gray-800" : "bg-gray-900"} key={index}>
                  <td className="px-6 py-4">{`${firstName} ${lastName}`}</td>
                  <td className="px-6 py-4">{address ? address : "No Data"}</td>
                  <td className="px-6 py-4">{contactNumber}</td>
                  <td className="px-6 py-4">{email}</td>
                  <td className="px-6 py-4">{createdAt}</td>
                  <td className="px-6 py-4 flex">
                    <p className={`px-2 rounded-full border ${role === "admin" ? "border-red-500 bg-red-500" : "border-yellow-600 bg-yellow-600"}`}>{role}</p>
                  </td>
                </tr>
              ))}
            </Table>
          )}
          {tab === "admin" && (
            <Table headerData={tableHeaders}>
              {users?.admins.map(({ firstName, lastName, address, contactNumber, email, role, createdAt }, index) => (
                <tr className={index % 2 === 0 ? "bg-gray-800" : "bg-gray-900"} key={index}>
                  <td className="px-6 py-4">{`${firstName} ${lastName}`}</td>
                  <td className="px-6 py-4">{address ? address : "No Data"}</td>
                  <td className="px-6 py-4">{contactNumber}</td>
                  <td className="px-6 py-4">{email}</td>
                  <td className="px-6 py-4">{createdAt}</td>
                  <td className="px-6 py-4 flex">
                    <p className={`px-2 rounded-full border ${role === "admin" ? "border-red-500 bg-red-500" : "border-yellow-600 bg-yellow-600"}`}>{role}</p>
                  </td>
                </tr>
              ))}
            </Table>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
