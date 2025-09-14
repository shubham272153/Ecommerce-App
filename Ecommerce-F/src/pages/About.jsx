import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";
import Newslatter from "../components/NewslatterBox";
const About = () => {
  return (
    <div>
      <div className=" text-2xl text-center pt-8  border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16 ">
        <img className="w-full md:max-w-[450px]" src={assets.about_img} />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            Anand Store is a great place to find quality clothes that mix
            traditional and modern styles. Whether you need ethnic wear, casual
            outfits, or formal clothes, they offer a wide variety to choose
            from. Each item is carefully made to look stylish and feel
            comfortable. Anand Store is perfect for anyone looking for classic
            yet trendy clothing.{" "}
          </p>
          <p>
            Whether you need ethnic wear, casual outfits, or formal clothes,
            they offer a wide variety to choose from
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            {" "}
            they offer a wide variety to choose from. Each item is carefully
            made to look stylish and feel comfortable. Anand Store is perfect
            for anyone looking for classic
          </p>
        </div>
      </div>
      <div className=" text-2xl py-4  ">
        <Title text1={"WHY"} text2={"CHOOSE"} />
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance:</b>
          <p className="text-gray-500">
            For Anand Store, quality assurance (QA) ensures that the E-Commerce
            app works smoothly and reliably for users. QA involves testing have
            a trouble-free shopping experience. This helps build customer trust
            and keeps the app running efficiently without errors or disruptions.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convinience:</b>
          <p className="text-gray-500">
            At Anand Store, we focus on making shopping as easy as possible. Our
            app lets you quickly browse products, order, and pay securely in
            simple returns. We’ve designed the app to make shopping convenient
            and stress-free, so you can get what you need without any hassle.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service:</b>
          <p className="text-gray-500">
            At Anand Store, we prioritize giving you the best customer service.
            Whether you have a question, need help with an order, or want to
            contact us through live chat, email, or phone, and well work quickly
            to solve any issues. Our goal is to make sure you are happy with
            every interaction, making your shopping experience smooth and
            hassle-free.
          </p>
        </div>
      </div>
      <Newslatter />
    </div>
  );
};

export default About;
