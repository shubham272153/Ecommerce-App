import { useState } from "react";

const Login = () => {
  const [currentState, setCurrentState] = useState("Sign Up");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-=[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currentState} </p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>
      {currentState === "Login" ? (
        ""
      ) : (
        <input
          type="test"
          className="border border-gray-800 rounded py-1.5 px-3 w-full"
          placeholder="Name"
          required
        />
      )}

      <input
        type="email"
        className="border border-gray-800 rounded py-1.5 px-3 w-full"
        placeholder="Email "
        required
      />
      <input
        type="password"
        className="border border-gray-800 rounded py-1.5 px-3 w-full"
        placeholder="Password"
        required
      />
      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p
          onClick={() => setCurrentState("Sign Up")}
          className="cursor-pointer"
        >
          Forgot password ?
        </p>
        {currentState === "Login" ? (
          <p
            onClick={() => setCurrentState("Sign Up")}
            className="cursor-pointer"
          >
            Create new Account
          </p>
        ) : (
          <p
            onClick={() => setCurrentState("Login")}
            className="cursor-pointer"
          >
            Login Now
          </p>
        )}
      </div>
      {/* ............login/signup button.............. */}
      <button className=" text-white  border-blue-400 border-[2px] px-10 py-2 bg-black  text-sm">
        {currentState === "Login" ? "Login" : "Sign Up"}
      </button>
    </form>
  );
};

export default Login;
