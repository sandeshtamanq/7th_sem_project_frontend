import React from "react";
const Infocard = ({ number, background, icon, heading, reveneu }) => {
  return (
    <div className={`text-white ${background} rounded-md px-10 py-4 h-[10rem] flex-1 border shadow-md`}>
      <h1>{heading}</h1>
      <div className={``}>
        <div className="flex items-center gap-x-4">
          <h1 className="text-6xl">{icon}</h1>
          <h1 className="text-6xl">
            {reveneu && "Rs."}
            {number}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Infocard;
