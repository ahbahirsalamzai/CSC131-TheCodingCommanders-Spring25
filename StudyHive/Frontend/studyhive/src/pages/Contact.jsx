import React from "react";

export default function Contact() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 text-center">
      {/* Section for user inquiries */}
      <h2 className="text-3xl font-bold mb-6">GET IN TOUCH</h2>
      <form className="space-y-4">
        {/* Name input field */}
        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-3 rounded-md bg-gray-100 border border-gray-300"
        />
        {/* Email input field */}
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 rounded-md bg-gray-100 border border-gray-300"
        />
        {/* Message input field */}
        <textarea
          placeholder="Message"
          rows="5"
          className="w-full p-3 rounded-md bg-gray-100 border border-gray-300"
        ></textarea>
        {/* Submit button */}
        <button className="bg-green-500 text-white px-6 py-3 rounded-md w-full font-bold hover:bg-green-600">
          Send
        </button>
      </form>

      {/* Section displaying location and contact details */}
      <h2 className="text-2xl font-bold mt-12">LOCATION AND CONTACT INFORMATION</h2>
      <div className="mt-6 flex flex-col md:flex-row items-center md:justify-center gap-8">
        {/* Embedded Google Map for location visualization */}
        <iframe
          className="w-full md:w-1/2 h-64 rounded-lg shadow-md"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345093666!2d144.95373531531886!3d-37.81627997975148!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDQ4JzU4LjYiUyAxNDTCsDU3JzEzLjQiRQ!5e0!3m2!1sen!2sus!4v1631706343040!5m2!1sen!2sus"
          allowFullScreen=""
          loading="lazy"
        ></iframe>

        {/* Contact information section */}
        <div className="text-left space-y-4 text-gray-700">
          <p className="flex items-center">
            <span className="text-red-500 mr-2">📍</span>
            something Rd, Sacramento, CA 95820
          </p>
          <p className="flex items-center">
            <span className="text-red-500 mr-2">✉️</span>
           something1@gmail.com
          </p>
          <p className="flex items-center">
            <span className="text-red-500 mr-2">📞</span>
            916-228-4655
          </p>
        </div>
      </div>
    </div>
  );
}