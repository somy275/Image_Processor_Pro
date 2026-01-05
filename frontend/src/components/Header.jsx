import React from "react";
import { LuFileImage } from "react-icons/lu";
import { useDispatch } from "react-redux";
import { Link, NavLink } from "react-router";
import { onTabChange } from "../features/Tab/Tab";
const Header = () => {
  const dispatch=useDispatch()
  return (
    <header className="mx-auto py-8">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <LuFileImage className="w-12 h-12 text-indigo-600 mr-3" />
          <h1 className="text-[clamp(1.375rem,0.875rem+4vw,2rem)] md:text-4xl lg:text-[clamp(1.5rem,0.9098rem+0.9221vw,2.0625rem)] font-bold text-gray-800">
            Image Processor Pro
          </h1>
        </div>
        <p className="text-gray-600 text-[clamp(0.9375rem,0.7875rem+1.2vw,1.125rem)] min-[450px]:text-[clamp(1.202rem,0.733rem+1.3937vw,1.625rem)] lg:text-[clamp(1.0025rem,0.3723rem+0.9221vw,1.625rem)]">
          Convert, resize, compress, crop, rotate images and create PDFs
        </p>
      </div>
      <nav
      className="bg-white rounded-xl shadow-lg px-6 py-4 max-w-full  lg:max-w-[80%] mx-auto flex justify-around items-center overflow-auto">
        {["Convert", "Resize", "Compress", "Create PDF", "Image Watermark"].map((tab,idx) => {
          return (
            <NavLink
            key={idx}
              className={({ isActive }) =>
                `${
                  isActive
                    ? "text-indigo-600 border-b-2 border-indigo-600"
                    : "text-gray-500 hover:text-gray-700"
                } px-6 py-2 text-[clamp(0.9375rem,0.7875rem+1.2vw,1.125rem)] min-[450px]:text-[clamp(1.202rem,0.733rem+1.3937vw,1.625rem)] lg:text-[clamp(0.8775rem,0.3273rem+0.9221vw,1.5rem)] font-semibold transition-colors whitespace-nowrap`
              }
              to={`/${tab!="Convert"?tab:""}`}
            >
              {tab}
            </NavLink>
          );
        })}
      </nav>
    </header>
  );
};

export default Header;
