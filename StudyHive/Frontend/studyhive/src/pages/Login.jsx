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
    </div>
  );
}