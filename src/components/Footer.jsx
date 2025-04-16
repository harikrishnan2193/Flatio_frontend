import React from "react";

function Footer() {
  return (
    <div className="bg-gray-800 text-white mx-auto lg:px-lg-padding xl:px-xl-padding">
      <div className="mx-auto py-3 px-8 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <i className="fa-solid fa-building text-5xl"></i>
            <p className="text-2xl font-bold font-raleway">Flat<span className="text-purple-400">ios</span></p>
          </div>
          <p className="text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum
            praesentium necessitatibus quasi consequatur nobis.
          </p>
        </div>

        <div className="space-y-3">
          <h4 className="text-lg font-semibold">Links</h4>
          <ul className="space-y-1">
            <li><a href="#" className="hover:text-purple-500">Home Page</a></li>
            <li><a href="#" className="hover:text-purple-500">Cp Page</a></li>
            <li><a href="#" className="hover:text-purple-500">Project Page</a></li>
          </ul>
        </div>

        <div className="space-y-3">
          <h4 className="text-lg font-semibold">Assistance</h4>
          <ul className="space-y-1">
            <li><a href="#" className="hover:text-purple-500">React</a></li>
            <li><a href="#" className="hover:text-purple-500">Fontawsome</a></li>
            <li><a href="#" className="hover:text-purple-500">Font Awesome</a></li>
          </ul>
        </div>

        <div className="space-y-3">
          <h4 className="text-lg font-semibold">Contact Us</h4>
          <div className="flex">
            <input
              type="text"
              placeholder="Enter your email-id"
              className="p-2 rounded-l-md w-2/3 text-black"
            />
            <button className="bg-purple-500 text-white px-4 py-2 rounded-r-md hover:bg-purple-700">
              Subscribe
            </button>
          </div>
          <div className="flex space-x-4 mt-4">
            <i className="fa-brands fa-facebook text-2xl hover:text-purple-500"></i>
            <i className="fa-brands fa-twitter text-2xl hover:text-purple-500"></i>
            <i className="fa-brands fa-whatsapp text-2xl hover:text-purple-500"></i>
            <i className="fa-brands fa-instagram text-2xl hover:text-purple-500"></i>
            <i className="fa-brands fa-youtube text-2xl hover:text-purple-500"></i>
          </div>
        </div>
      </div>

      <div className="text-center text-sm pb-3">
        <p>Copyright © 2023 Flatio-s @ Pvt Ltd</p>
      </div>
    </div>
  );
}

export default Footer;
