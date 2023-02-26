import React from "react";

const Table = ({ headerData, children }) => {
  return (
    <>
      <div className="relative overflow-x-auto rounded-lg shadow-md ">
        <table className="w-full text-sm text-left">
          <thead className="text-xs  uppercase border-2 ">
            <tr>
              {headerData.map((name, index) => {
                return (
                  <th key={index} scope="col" className="px-6 py-3">
                    {name}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="text-gray-300">{children}</tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
