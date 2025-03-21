import React from "react";
import {Link} from "react-router-dom";
import { useState } from "react";

export function RoleSelector({ role, setRole }) {
    

    return( 
        <div className="flex justify-center items-center gap-4">

            {/* Tutor Option */}

            <label className= "flex items-center gap-2 cursor-pointer">
                <input

                    type="radio"
                    name="role"
                    value="Tutor"
                    checked={role === "Tutor"}
                    onChange={()=> setRole("Tutor")}
                    className="hidden"

                />

                <div className={`w-4 h-4 border border-gray-400 rounded-full flex items-center justify-center ${ 
                    role === "Tutor" ? "border-blue-500" : ""
                }`}>
                    { role === "Tutor" && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
                </div>
                <span className="text-sm font-medium">Tutor</span>
            </label>

{/* Student Option */}        

            <label className= "flex items-center gap-2 cursor-pointer">
                <input

                    type="radio"
                    name="role"
                    value="Student"
                    checked={role === "Student"}
                    onChange={()=> setRole("Student")}
                    className="hidden"

                />

                <div className={`w-4 h-4 border border-gray-400 rounded-full flex items-center justify-center ${ 
                    role === "Student" ? "border-blue-500" : ""
                }`}>
                    { role === "Student" && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
                </div>
                <span className="text-sm font-medium">Student</span>
            </label>

            </div>
            


        );
        }

export default function SignUp() {

    const[role, setRole] = useState("");

    return (

<div className="max-w-screen-xl w-full min-h-screen bg-slate-50 flex flex-col md:flex-row items-center justify-center px-4 py-10">
    <div className="flex flex-col items-center gap-10 w-full max-w-lg">
        <h1 className="text-neutral-800 text-4xl font-bold text-center">Sign Up</h1>

        <div className="flex flex-col items-center gap-6 w-full">
            <div className="flex flex-col gap-6 w-full">

                
                {/* Role Selection */}
            <div className="flex flex-col gap-3 w-full">
                    <label className="text-neutral-800 text-base font-bold">Select Your Role:</label>
                    <RoleSelector role={role} setRole={setRole}/>
                </div>


                {/* Input Fields */}
                {["Username", "Email", "Password", "Confirm Password"].map((field, index) => (
                    <div key={index} className="flex flex-col gap-2 w-full">
                        <label className="text-neutral-800 text-base font-bold">{field}</label>
                        <input
                            type={field.toLowerCase().includes("password") ? "password" : "text"}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base"
                            placeholder={`Enter your ${field.toLowerCase()}`}
                        />
                    </div>
                ))}

                {/* Terms & Conditions */}
                <div className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4" />
                    <span className="text-sm">I Accept Terms & Conditions</span>
                </div>

                {/* Sign Up Button */}
                <button className="w-full py-4 bg-green-900 text-white font-semibold rounded-lg hover:bg-green-800 transition">
                    Sign Up
                </button>

                {/* Already have an account? */}
                <div className="text-sm">
                    Already have an account? <Link to ="/login" className="text-blue-700 font-bold">Sign In</Link>
                </div>
            </div>
        </div>
    </div>

    {/* Right-side Illustration or Background (Optional) */}
    <div className="hidden md:block w-1/2 bg-black bg-opacity-50 rounded-2xl h-[600px] ml-5 mt-40"></div>

</div>

);
}