import React from "react";

const NewslatterBox = () => {
  const onSubmitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <div className="text-center">
      <p className="text-2xl font-medium text-gray-800">
        Subscribe now & get 20% off
      </p>
      <p className="text-gray-400 mt-3">
        Subscribe now and get 20% off your next purchase! By joining, you save
        right away and get access to special deals and updates on our latest
        products. It is a great way to shop smarter and enjoy exclusive perks.
        Sign up today and start saving!
      </p>
      <form
        onSubmit={onSubmitHandler}
        className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border border-gray-700 pl-3"
      >
        <input
          className="w-full sm:flex-1 outline-none"
          type="email"
          placeholder="Enter your email."
          required
        />
        <button
          type="submit"
          className="bg-black text-xs text-white hover:bg-gray-800 p-3"
        >
          SUBSCRIBE NOW
        </button>
      </form>
    </div>
  );
};

export default NewslatterBox;
