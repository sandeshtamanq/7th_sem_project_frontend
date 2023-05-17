import React from "react";

const About = () => {
  return (
    <div className="bg-white">
      <header className="">
        <div className="container mx-auto py-4 px-8">
          <h1 className="text-4xl font-bold text-center">About Us</h1>
        </div>
      </header>
      <main className="container mx-auto py-8 px-8">
        <h2 className="text-2xl font-bold mb-4 text-center">Our Story</h2>
        <div className="text-gray-600 mb-4 text-justify">
          <p>
            Welcome to Online Mobile Store! We are dedicated to providing our
            customers with a seamless shopping experience for all their mobile
            phone needs.
          </p>
          <br />
          <p>
            At our store, we offer a wide range of mobile phones from top
            brands, including Apple, Samsung, Xiaomi, Oppo, Huawei, and many
            more. Whether you're looking for the latest model or a
            budget-friendly option, we have something for everyone.
          </p>
          
          <br />
          <p>
            We take pride in our commitment to providing exceptional customer
            service. Our knowledgeable staff is available to assist you with any
            questions or concerns you may have, and we strive to ensure that
            every customer leaves our store satisfied with their purchase.
          </p>
          <br />
          <p>
            Our website is designed to make shopping easy and convenient. You
            can browse our selection of products, read detailed descriptions,
            and compare prices all from the comfort of your own home. We also
            offer fast and reliable shipping to ensure that your purchase
            arrives on time.
          </p>
          <br />
          <p>
            Thank you for choosing our online mobile store. We look forward to
            serving you and helping you find the perfect mobile phone and
            accessories for your needs.
          </p>
        </div><br />
        <h2 className="text-2xl font-bold mb-4 text-center">Our Popular Brands</h2>
       
      </main>
    </div>
  );
};

export default About;
