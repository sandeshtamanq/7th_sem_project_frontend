import React from "react";

const Contact = () => {
  return (
    <div className="bg-white">
      <header className="">
        <div className="container mx-auto py-4 px-8">
          <h1 className="text-4xl font-bold">Contact Us</h1>
        </div>
      </header>
      <main className="container mx-auto py-8 px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
            <form className="space-y-4">
              <div className="flex flex-col">
                <label htmlFor="name" className="mb-2 font-medium">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-300"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="email" className="mb-2 font-medium">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-300"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="message" className="mb-2 font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-300"
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-secondary text-white py-2 px-4 rounded hover:bg-gray-800 focus:outline-none focus:shadow-outline"
              >
                Send
              </button>
            </form>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
            <ul className="space-y-2">
              <li>
                <h3 className="font-medium">Address</h3>
                <p>Birendra Road</p>
                <p>Ramailo Chowk, Bharatpur-10, Chitwan</p>
              </li>
              <li>
                <h3 className="font-medium">Phone</h3>
                <p>+977-9812345678</p>
              </li>
              <li>
                <h3 className="font-medium">Email</h3>
                <p>info@onlinemobilestore.com</p>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contact;
