import React from "react";

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section - Large banner with a background image and call-to-action */}
      <section className="relative w-full h-screen flex items-center justify-center bg-cover bg-center text-white"
        style={{ backgroundImage: "url('/your-hero-image.jpg')" }}>
        <div className="text-center bg-black bg-opacity-50 p-10 rounded-lg">
          <h1 className="text-5xl font-bold">Empowering Students, One Session At A Time</h1>
          <p className="mt-4 text-lg">More than 1000 active users who are very satisfied with our courses.</p>
          <button className="mt-6 px-6 py-3 bg-[#1F4D39] hover:bg-green-700 rounded-lg">Get Started</button>
        </div>
      </section>

      {/* About Section - Brief introduction to StudyHive */}
      <section className="py-16 bg-[#E1EADF]">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-green-700">About StudyHive</h2>
          <p className="mt-4 text-lg">Our tutoring center is dedicated to providing personalized and effective learning experiences for students of all ages.</p>
        </div>
      </section>

      {/* Services Section - Overview of available tutoring services */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-green-700">Our Services</h2>
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            {/* Dynamically rendering service cards */}
            {["1-on-1 Tutoring", "Test Preparation", "Homework Help"].map((service, index) => (
              <div key={index} className="p-6 border border-gray-200 rounded-lg shadow-md">
                <h3 className="text-xl font-bold">{service}</h3>
                <p className="mt-2">Personalized attention tailored to individual learning styles and needs.</p>
              </div>
            ))}
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