import React from "react";

export default function SignUp() {
    return (
    <div className="max-w-2xl mx-auto py-12 px-4 text-center">
        <h2 className="text-3xl font-bold mb-6">SIGN UP</h2>
        <form className="space-y-4">
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
        <input
            type="text"
            placeholder="Username"
            className="w-full p-3 rounded-md bg-gray-100 border border-gray-300"
        />
        <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-md bg-gray-100 border border-gray-300"
        />
        <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-md bg-gray-100 border border-gray-300"
        />
        <input
            type="password"
            placeholder="Confirm Password"
            className="w-full p-3 rounded-md bg-gray-100 border border-gray-300"
        />
        <label className="flex items-center">
            <input type="checkbox" className="form-checkbox" />
            <span className="ml-2">I Accept Terms & Conditions</span>
        </label>
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