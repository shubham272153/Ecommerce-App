import { assets } from "../assets/frontend_assets/assets";
const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div>
          <img src={assets.logo} className="h-16" alt="" />
          <p className="w-full md:w-2/3 text-gray-600">
            Thank you for visiting! We hope you found what you needed. Stay in
            touch for updates, special offers, and more. If you have any
            questions, our support team is here to help. Your satisfaction
            matters to us! Follow us on social media for the latest news and
            deals. We look forward to seeing you again soon!
          </p>
        </div>
        <div>
          <p className="text-xl font-medium mb-1">COMPANY</p>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
            <li>Contact</li>
          </ul>
        </div>
        <div>
          <p className="text-xl font-medium mb-1">Get in Touch</p>
          <ul>
            <li>91-770404xxxx</li>
            <li>anandstore@gmail.com</li>
          </ul>
        </div>
      </div>
      <div>
        <hr />
        <p className="py-5 text-center text-gray-600 text-sm">
          Copyright &copy; 2024 Anand Store. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
