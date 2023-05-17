import React from "react";

const About = () => {
  const brandList = [
    {
      url: "https://firebasestorage.googleapis.com/v0/b/mobile-shop-7540e.appspot.com/o/brand-images%2Fapple.png?alt=media&token=dd366574-aca4-4e0f-a399-457087463792",
    },
    {
      url: "https://firebasestorage.googleapis.com/v0/b/mobile-shop-7540e.appspot.com/o/brand-images%2Foneplus.png?alt=media&token=7df302e7-d462-42e8-940d-d523bb427dfc",
    },
    {
      url: "https://firebasestorage.googleapis.com/v0/b/mobile-shop-7540e.appspot.com/o/brand-images%2Foppo.png?alt=media&token=9f4db12b-8d2a-4a98-97ed-aa2ee4fc09e9",
    },
    {
      url: "https://firebasestorage.googleapis.com/v0/b/mobile-shop-7540e.appspot.com/o/brand-images%2Frealme.png?alt=media&token=46150dbf-6767-4415-bfae-b29cbd11131a",
    },
    {
      url: "https://firebasestorage.googleapis.com/v0/b/mobile-shop-7540e.appspot.com/o/brand-images%2Fsamsung.png?alt=media&token=7622b56c-41c2-4458-b3d8-416020f0ae87",
    },
    {
      url: "https://firebasestorage.googleapis.com/v0/b/mobile-shop-7540e.appspot.com/o/brand-images%2Fxiaomi.png?alt=media&token=7a82ffa2-a663-449a-bbc5-4e587963606c",
    },
  ];
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
          <p>Welcome to Online Mobile Store! We are dedicated to providing our customers with a seamless shopping experience for all their mobile phone needs.</p>
          <br />
          <p>
            At our store, we offer a wide range of mobile phones from top brands, including Apple, Samsung, Xiaomi, Oppo, Huawei, and many more. Whether you're looking for the latest model or a
            budget-friendly option, we have something for everyone.
          </p>

          <br />
          <p>
            We take pride in our commitment to providing exceptional customer service. Our knowledgeable staff is available to assist you with any questions or concerns you may have, and we strive to
            ensure that every customer leaves our store satisfied with their purchase.
          </p>
          <br />
          <p>
            Our website is designed to make shopping easy and convenient. You can browse our selection of products, read detailed descriptions, and compare prices all from the comfort of your own
            home. We also offer fast and reliable shipping to ensure that your purchase arrives on time.
          </p>
          <br />
          <p>Thank you for choosing our online mobile store. We look forward to serving you and helping you find the perfect mobile phone and accessories for your needs.</p>
        </div>
        <br />
        <div>
          <h2 className="text-2xl font-bold mb-4 text-center">Our Popular Brands</h2>
          <div className="grid grid-cols-3 gap-2">
            {brandList.map((brand) => {
              return <img src={brand.url} className="h-[20rem] w-[20rem] object-contain" />;
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default About;
