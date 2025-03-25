import React, { useState } from "react";
import { Link } from "react-router-dom";
import welcome from "../assets/welcome.png";

export default function ForgotPassword() {
  const [formData, setFormData] = useState({
    email: "",
  });

  const [errors, setErrors] = useState({
    email: "",
  });

  const validateField = (name, value) => {
    let error = "";
    if (!value) {
      error = `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
    } else {
      if (name === "email" && !/\S+@\S+\.\S+/.test(value)) {
        error = "Invalid email format";
      }
    }
    return error;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Immediate validation
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      email: validateField("email", formData.email),
    };

    setErrors(newErrors);

    if (Object.values(newErrors).every((error) => !error)) {
      console.log("Submitting:", formData);
      // Handle form submission here (e.g., API call)
      setFormData({ email: "" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-[1440px] flex justify-center items-center">
        {/* Image Section */}
        <div className="hidden xl:block w-[500px] h-[700px] mb-[100px] mt-[120px] overflow-hidden rounded-[31px] mr-12">
          <img
            className="w-full h-full object-cover"
            src={welcome}
            alt="Illustration for forgot password page"
          />
        </div>

        {/* Form Section */}
        <div className="w-full max-w-[450px] mt-[100px] ml-[50px] mr-[50px] bg-white rounded-[31px] outline outline-1 outline-[#eaeaea] p-6">
          <div className="text-center text-black text-[40px] font-bold">
            Forgot Your Password?
          </div>
          <div className="text-center text-neutral-600 text-sm font-normal mt-4">
            Don’t Worry! Resetting your password is easy. Just type in the email you registered to StudyHive.
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full items-center mt-6">
            {/* Email Input */}
            <div className="flex flex-col w-full">
              <label htmlFor="email" className="text-black text-base font-bold">
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="abc12@gmail.com"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3.5 bg-white rounded-lg border border-[#e0e0e0] text-black"
                aria-invalid={!!errors.email}
                aria-describedby="email-error"
                required
              />
              {errors.email && (
                <p id="email-error" className="text-red-500 text-sm mt-1">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Send Button */}
            <button
              type="submit"
              className="w-full px-[30px] py-4 mb-2 bg-[#1f4d39] rounded-lg text-white text-base font-semibold hover:bg-[#163a2b] transition"
              disabled={!!errors.email || !formData.email}
            >
              Send
            </button>
          </form>

          {/* Sign In Link */}
          <div className="flex justify-center items-center mt-4">
            <span className="text-black text-base font-normal">
              Do you remember your password?
            </span>
            <Link to="/login" className="text-[#1f1f1f] text-sm font-semibold hover:text-blue-600 transition-colors duration-200 ml-1">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
