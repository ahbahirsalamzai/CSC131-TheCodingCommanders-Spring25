import React, { useState } from "react";
import union from "../assets/union.png";

export default function SignUp() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({
    email: "",
    password: ""
  });

  const validateField = (name, value) => {
    let error = "";
    if (!value) {
      error = `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
    } else {
      if (name === "email" && !/\S+@\S+\.\S+/.test(value)) {
        error = "Invalid email format";
      } else if (name === "password" && value.length < 6) {
        error = "Password must be at least 6 characters";
      }
    }
    return error;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Live validation
    setTimeout(() => {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }, 300);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {
      email: validateField("email", formData.email),
      password: validateField("password", formData.password)
    };

    setErrors(newErrors);

    if (!Object.values(newErrors).some((error) => error)) {
      console.log("Submitting:", formData);
      // Handle form submission here
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-[1440px] flex justify-center items-center">
        {/* Image Section */}
        <div className="hidden xl:block w-[500px] h-[700px] mb-[100px] mt-20 overflow-hidden rounded-[31px] mr-12">
          <img
            className="w-full h-full object-cover"
            src={union}
            alt="Illustration for sign-in page"
          />
        </div>

        {/* Form Section */}
        <div className="w-full max-w-[471px] mt-[100px] ml-[50px] mr-[50px] bg-white rounded-[31px] outline outline-1 outline-[#eaeaea] p-6">
          <div className="text-center text-black text-[40px] font-bold font-['Mulish']">
            Sign In
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full items-center mt-6">
            <div className="flex flex-col w-full">
              <label className="text-black text-base font-bold font-['Mulish']">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="abc12@gmail.com"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3.5 bg-white rounded-lg border border-[#e0e0e0] text-black"
                required
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div className="flex flex-col w-full">
              <label className="text-black text-base font-bold font-['Mulish']">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="*******"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-3.5 bg-white rounded-lg border border-[#e0e0e0] text-black"
                required
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <div className="flex justify-between w-full">
              <label className="flex items-center text-black text-sm font-medium">
                <input type="checkbox" className="mr-2" /> Remember me
              </label>
              <a href="/" className="text-[#1f1f1f] text-sm font-semibold">
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full px-[30px] py-4 mb-2 bg-[#1f4d39] rounded-lg text-white text-base font-semibold hover:bg-[#163a2b] transition"
              disabled={
                !!errors.email ||
                !!errors.password ||
                !formData.email ||
                !formData.password
              }
            >
              Sign In
            </button>
          </form>

          <div className="flex justify-center items-center mt-4">
            <span className="text-black text-base font-normal">
              Don’t have an account?
            </span>
            <a href="/" className="text-[#1f4d39] text-base font-bold ml-2">
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
