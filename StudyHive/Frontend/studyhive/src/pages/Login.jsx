import React from "react";

export default function Login() {
  return (
    <div className="max-w-2xl mx-auto py-12 px-4 text-center">
      <h2 className="text-3xl font-bold mb-6">SIGN IN</h2>
      <form className="space-y-4">
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
        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input type="checkbox" className="form-checkbox" />
            <span className="ml-2">Remember me</span>
          </label>
          <a href="/forgot-password" className="text-[#275e49] hover:underline">Forgot Password?</a>
        </div>
        <button className="bg-[#275e49] text-white px-6 py-3 rounded-md w-full font-bold hover:bg-green-800">
          Sign In
        </button>
      </form>
      <p className="mt-6">
        Don't have an account? <a href="/signup" className="text-[#275e49] hover:underline">Sign Up</a>
      </p>
    </div>
  );
}