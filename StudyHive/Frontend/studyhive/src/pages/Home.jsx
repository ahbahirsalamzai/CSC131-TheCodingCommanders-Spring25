import React from "react";
import { Link } from 'react-router-dom';
import FallCampusSign from "../assets/fall.jpg";
import GradRateImage from "../assets/gradrate.jpg";
import User1 from "../assets/girlpink.jpeg";
import User2 from "../assets/girlred.jpeg";
import User3 from "../assets/guyblue.jpeg";
import User4 from "../assets/lightblueguy.jpeg";


export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section - Now Positioned Correctly Below Navbar */}
      <section className="relative w-full h-screen flex items-center justify-center text-white">

        
        {/* Image Container */}
        <div className="relative w-[1283px] h-[643px] rounded-[30px] shadow-lg border border-black overflow-hidden">
          
          {/* Background Image */}
          <img src={FallCampusSign} alt="StudyHive Campus" className="w-full h-full object-cover" />
          
          {/* Overlay */}
          <div className="absolute top-0 left-0 w-full h-full bg-black/45"></div> 

          {/* Text Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            
            {/* Welcome Message */}
            <div className="w-[942px] text-center justify-center text-white text-sm font-bold uppercase tracking-[3px] mb-4">
              Welcome to StudyHive
            </div>

            {/* Main Heading */}
            <h1 className="w-[942px] text-center justify-center text-white text-6xl font-normal capitalize leading-[74px] mt-4">
              Empowering Students, One Session at a Time
            </h1>

            {/* Profile Images */}
            <div className="flex items-center space-x-[-10px] mt-6">
              <img className="w-12 h-12 relative rounded-full border-2 border-white" src={User1} alt="User 1" />
              <img className="w-12 h-12 relative rounded-full border-2 border-white" src={User2} alt="User 2" />
              <img className="w-12 h-12 relative rounded-full border-2 border-white" src={User3} alt="User 3" />
              <img className="w-12 h-12 relative rounded-full border-2 border-white" src={User4} alt="User 4" />
            </div>

            {/* Subtext */}
            <p className="mt-4 text-lg font-light">
              More than 1000 active users who are very satisfied with our courses.
            </p>

            {/* Call-to-Action Button */}
            <Link to="/signup">
              <button className="mt-8 px-5 py-2 text-sm bg-transparent text-white font-semibold border border-white rounded-lg transition duration-300 hover:bg-white hover:text-black">
                Get Started
              </button>
            </Link>
              
          </div>
        </div>
      </section>

      <div className="w-full">
      {/* About Section - Bri
      ef Introduction to StudyHive */}
      <section className="w-full bg-[#E1EADF] flex justify-center items-center gap-16 py-28">
      
      {/* Image Container (Relative for Layering) */}
      <div className="relative w-[554px] h-[615px]">
        
        {/* Green Box Positioned Behind Image */}
        <div className="absolute w-96 h-96 bg-green-900 rounded-lg -left-6 top-6 z-0" />

        {/* Main Image */}
        <img 
          className="w-[554px] h-[615px] rounded-2xl shadow-lg relative z-10"
          src={GradRateImage} 
          alt="StudyHive Students"
        />
      </div>

      {/* Text Content */}
      <div className="w-[596px] flex flex-col justify-start items-start gap-6">
        
        {/* Title Section */}
        <div className="self-stretch flex flex-col justify-start items-start gap-6">
          <div className="w-[566px] flex flex-col justify-start items-start gap-4">
            
            {/* Title Icon */}
            <div className="inline-flex justify-start items-center gap-2">
              <div className="w-2.5 h-2.5 bg-green-900 rounded-full" />
              <div className="text-green-900 text-2xl font-bold font-['Montserrat'] leading-loose">
                About STUDYHIVE
              </div>
            </div>

            {/* Main Heading */}
            <div className="self-stretch text-black text-4xl font-semibold font-['Montserrat'] leading-10">
              Shaping Brighter Futures Through Quality Education
            </div>
          </div>

          {/* Description */}
          <div className="w-[587px] text-zinc-700 text-lg font-normal font-['Montserrat'] leading-relaxed">
            Our tutoring center is dedicated to providing personalized and effective learning experiences for students of all ages.
          </div>
        </div>

        {/* Mission & Values Section */}
        <div className="self-stretch flex flex-col justify-start items-start gap-2">
          {/* List Items */}
          {[
            "Our mission is to empower students with the knowledge and skills they need to succeed academically and beyond.",
            "We believe in quality education, individualized attention, and a supportive learning environment.",
            "Emotional well-being, creating a safe space for new beginnings."
          ].map((text, index) => (
            <div key={index} className="self-stretch pb-2 inline-flex justify-start items-start gap-4">
              <div className="w-2.5 h-1.5 bg-black/70 outline outline-1 outline-offset-[-0.5px] outline-white" />
              <div className="w-[530px] text-zinc-700 text-lg font-normal font-['Montserrat'] leading-relaxed">
                {text}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
    </div>


    <section className="w-full bg-white py-16 flex flex-col items-center text-center">
  {/* Section Title */}
  <div className="mb-10">
    <div className="flex justify-center items-center gap-2">
      <div className="w-2.5 h-2.5 bg-green-900 rounded-full"></div>
      <h2 className="text-green-900 text-2xl font-bold font-['Montserrat'] leading-loose">
        What We Offer
      </h2>
    </div>
    <h3 className="text-black text-4xl font-semibold font-['Commissioner'] leading-10 mt-2">
      Our Services For Interactive Learning & Growth
    </h3>
    <p className="w-[900px] mx-auto text-zinc-700 text-lg font-normal font-['Montserrat'] leading-relaxed mt-4">
      Our tutoring center is dedicated to providing personalized and effective learning experiences for students of all ages.
    </p>
  </div>

  {/* Services Cards Section */}
  <div className="flex justify-center items-center gap-8 mb-20">
    {/* Service 1 - 1-on-1 Tutoring */}
    <div className="relative w-96">
      <div className="w-full h-72 bg-stone-300 rounded-[10.22px] rotate-[-4.80deg] absolute top-4 left-4"></div>
      <div className="w-full p-8 bg-green-900 rounded-[10.22px] relative z-10">
        <img className="w-14 h-14 mb-2" src="https://placehold.co/55x55" alt="Tutoring" />
        <h3 className="text-white text-3xl font-normal font-['Commissioner'] leading-10">
          1-on-1 Tutoring
        </h3>
        <p className="text-white text-2xl font-light font-['Montserrat'] leading-9">
          Personalized attention tailored to individual learning styles and needs.
        </p>
      </div>
    </div>

    {/* Service 2 - Test Preparation */}
    <div className="relative w-96">
      <div className="w-full h-72 bg-stone-300 rounded-[10.22px] rotate-[-4.80deg] absolute top-4 left-4"></div>
      <div className="w-full p-8 bg-green-900 rounded-[10.22px] relative z-10">
        <img className="w-14 h-14 mb-2" src="https://placehold.co/55x55" alt="Test Prep" />
        <h3 className="text-white text-3xl font-normal font-['Commissioner'] leading-10">
          Test Preparation
        </h3>
        <p className="text-white text-2xl font-light font-['Montserrat'] leading-9">
          Personalized attention tailored to individual learning styles and needs.
        </p>
      </div>
    </div>

    {/* Service 3 - Homework Help */}
    <div className="relative w-96">
      <div className="w-full h-72 bg-stone-300 rounded-[10.22px] rotate-[-4.80deg] absolute top-4 left-4"></div>
      <div className="w-full p-8 bg-green-900 rounded-[10.22px] relative z-10">
        <img className="w-14 h-14 mb-2" src="https://placehold.co/55x55" alt="Homework Help" />
        <h3 className="text-white text-3xl font-normal font-['Commissioner'] leading-10">
          Homework Help
        </h3>
        <p className="text-white text-2xl font-light font-['Montserrat'] leading-9">
          Personalized attention tailored to individual learning styles and needs.
        </p>
      </div>
    </div>
  </div>
</section>



      {/* Why Choose StudyHive - Highlights the benefits of the service */}
      <section className="py-16 bg-[#E1EADF]">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-green-700">Why Choose StudyHive?</h2>
          <p className="mt-4 text-lg">Qualified and experienced educators with flexible scheduling and proven results.</p>
          <button className="mt-6 px-6 py-3 bg-[#1F4D39] hover:bg-green-700 rounded-lg">Contact Us</button>
        </div>
      </section>

      {/* Testimonial Section - Displays a positive review from a student */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-green-700">What Our Students Say</h2>
          <blockquote className="mt-6 text-lg italic">"StudyHive transformed my child’s learning experience — their grades and confidence have soared!"</blockquote>
        </div>
      </section>

      {/* FAQs Section - Expandable list of frequently asked questions */}
      <section className="py-16 bg-[#E1EADF]">
        <div className="continer mx-auto text-center">
          <h2 className="text-3xl font-bold text-green-700">Frequently Asked Questions</h2>
          <div className="mt-8 space-y-4">
            {/* Rendering questions dynamically */}
            {["How do I sign up?", "What subjects do you offer?", "How do I become a tutor?", "What are the costs?"].map((question, index) => (
              <details key={index} className="p-4 bg-white rounded-lg shadow-md cursor-pointer">
                <summary className="text-lg font-bold">{question}</summary>
                <p className="mt-2 text-gray-600">This is the answer to the question.</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}