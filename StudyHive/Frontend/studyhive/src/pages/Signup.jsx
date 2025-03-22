import React, { useState } from "react";

export default function Signup() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        termsAccepted: false,
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });

        // Clear error when user starts typing
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "",
        }));
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.username.trim()) {
            newErrors.username = "Username is required.";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Enter a valid email address.";
        }

        if (!formData.password) {
            newErrors.password = "Password is required.";
        } else {
            if (formData.password.length < 8) {
                newErrors.password = "Password must be at least 8 characters.";
            }
            if (!/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) {
                newErrors.password = "Include at least one special character.";
            }
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = "Please confirm your password.";
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match.";
        }

        if (!formData.termsAccepted) {
            newErrors.termsAccepted = "You must accept the terms.";
        }

        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        console.log("✅ Form submitted successfully!", formData);
        // Proceed with actual submission logic here
    };

    return (
        <div className="max-w-2xl mx-auto py-12 px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">SIGN UP</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="text-left">
                    <label className="block text-sm font-medium text-gray-700">Select Your Role:</label>
                    <div className="mt-2">
                        <label className="inline-flex items-center">
                            <input type="radio" name="role" value="tutor" className="form-radio" />
                            <span className="ml-2">Tutor</span>
                        </label>
                        <label className="inline-flex items-center ml-6">
                            <input type="radio" name="role" value="student" className="form-radio" />
                            <span className="ml-2">Student</span>
                        </label>
                    </div>
                </div>

                <div className="text-left">
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        className="w-full p-3 rounded-md bg-gray-100 border border-gray-300"
                        value={formData.username}
                        onChange={handleChange}
                    />
                    {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
                </div>

                <div className="text-left">
                    <input
                        type="text" // Changed from "email" to "text" to remove yellow tooltip
                        name="email"
                        placeholder="Enter your email"
                        className="w-full p-3 rounded-md bg-gray-100 border border-gray-300"
                        value={formData.email}
                        onChange={handleChange}
                        autoComplete="off" // Optional: Prevent autofill interference
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div className="text-left">
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="w-full p-3 rounded-md bg-gray-100 border border-gray-300"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                </div>

                <div className="text-left">
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        className="w-full p-3 rounded-md bg-gray-100 border border-gray-300"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />
                    {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                </div>

                <div className="text-left">
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            name="termsAccepted"
                            className="form-checkbox"
                            checked={formData.termsAccepted}
                            onChange={handleChange}
                        />
                        <span className="ml-2">I Accept Terms & Conditions</span>
                    </label>
                    {errors.termsAccepted && <p className="text-red-500 text-sm mt-1">{errors.termsAccepted}</p>}
                </div>

                <button className="bg-[#275e49] text-white px-6 py-3 rounded-md w-full font-bold hover:bg-green-800">
                    Sign Up
                </button>
            </form>

            <p className="mt-6">
                Already have an account? <a href="/login" className="text-[#275e49] hover:underline">Sign In</a>
            </p>
        </div>
    );
}
