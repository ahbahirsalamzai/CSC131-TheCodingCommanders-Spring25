<<<<<<< HEAD
import React from "react";
import union from "../assets/union.png";


export default function SignUp() {
  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="w-full max-w-[1440px] flex justify-center items-center">
        {/* Image Section - Hidden on screens smaller than 1400px */}
        <div className="hidden xl:block w-[600px] h-[800px] mb-[100px] mt-10 overflow-hidden rounded-[31px] mr-12">
          <img 
            className="w-full h-full object-cover" 
            src={union} 
            alt="Illustration for sign-in page" 
          />
        </div>

        {/* Form Section */}
        <div className="w-full max-w-[471px] mt-[-100px] ml-[50px] mr-[50px] bg-white  rounded-[31px] outline outline-1 outline-[#eaeaea] p-6">
        <div className="text-center text-black text-[40px] font-bold font-['Mulish']">Sign In</div>

          <div className="flex flex-col gap-6 w-full items-center mt-6">
            <div className="flex flex-col w-full">
              <label className="text-black text-base font-bold font-['Mulish']">Email</label>
              <input type="email" placeholder="abc12@gmail.com" className="w-full px-4 py-3.5 bg-white rounded-lg border border-[#e0e0e0] text-black" />
            </div>
            <div className="flex flex-col w-full">
              <label className="text-black text-base font-bold font-['Mulish']">Password</label>
              <input type="password" placeholder="*******" className="w-full px-4 py-3.5 bg-white rounded-lg border border-[#e0e0e0] text-black" />
            </div>
            <div className="flex justify-between w-full">
              <label className="flex items-center text-black text-sm font-medium">
                <input type="checkbox" className="mr-2" /> Remember me
              </label>
              <a href="/" className="text-[#1f1f1f] text-sm font-semibold">Forgot Password?</a>
            </div>
            <button className="w-full px-[30px] py-4 mb-2 bg-[#1f4d39] rounded-lg text-white text-base font-semibold">
              Sign In
            </button>
          </div>
          <div className="flex justify-center items-center mt-4">
            <span className="text-black text-base font-normal">Don’t have an account?</span>
            <a href="/" className="text-[#1f4d39] text-base font-bold ml-2">Sign Up</a>
          </div>
        </div>
      </div>
=======
import React, { useState } from "react";

export default function Login() {
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
      switch(name) {
        case 'email':
          if (!/\S+@\S+\.\S+/.test(value)) {
            error = "Invalid email format";
          }
          break;
        case 'password':
          if (value.length < 6) {
            error = "Password must be at least 6 characters";
          }
          break;
      }
    }
    
    return error;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Real-time validation after user stops typing for 500ms
    setTimeout(() => {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }, 500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors = {
      email: validateField('email', formData.email),
      password: validateField('password', formData.password)
    };
    
    setErrors(newErrors);

    // Submit only if no errors
    if (!Object.values(newErrors).some(error => error)) {
      console.log("Submitting:", formData);
      // Add your API call here
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4 text-center">
      <h2 className="text-3xl font-bold mb-6">SIGN IN</h2>
      <form className="space-y-4" onSubmit={handleSubmit} noValidate>
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-3 rounded-md bg-gray-100 border border-gray-300"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1 text-left">{errors.email}</p>
          )}
        </div>

        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-3 rounded-md bg-gray-100 border border-gray-300"
            value={formData.password}
            onChange={handleInputChange}
            minLength="6"
            required
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1 text-left">{errors.password}</p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input type="checkbox" className="form-checkbox" />
            <span className="ml-2">Remember me</span>
          </label>
          <a href="/forgot-password" className="text-[#275e49] hover:underline">
            Forgot Password?
          </a>
        </div>
        
        <button
          type="submit"
          className="bg-[#275e49] text-white px-6 py-3 rounded-md w-full font-bold hover:bg-green-800
                    disabled:opacity-50"
          disabled={!!errors.email || !!errors.password || !formData.email || !formData.password}
        >
          Sign In
        </button>
      </form>
      <p className="mt-6">
        Don't have an account?{" "}
        <a href="/signup" className="text-[#275e49] hover:underline">
          Sign Up
        </a>
      </p>
>>>>>>> landing-page-29
    </div>
  );
}