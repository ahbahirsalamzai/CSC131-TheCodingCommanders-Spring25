import React from "react";
import { Link } from 'react-router-dom';
import FallCampusSign from "../assets/fall.jpg";
import GradRateImage from "../assets/gradrate.jpg";
import User1 from "../assets/girlpink.jpeg";
import User2 from "../assets/girlred.jpeg";
import User3 from "../assets/guyblue.jpeg";
import User4 from "../assets/lightblueguy.jpeg";
import LargeImage from "../assets/libhall.jpg"; 
import SmallImage from "../assets/studybook.jpg";
import Brain from "../assets/brain.webp";


export default function Home() {
  return (
    <div className="w-full overflow-x-hidden">
    {/* Hero Section */}
<section className="relative w-full min-h-[90vh] md:min-h-screen flex items-center justify-center text-white px-4 sm:px-6 lg:px-8 pt-16">
  <div className="relative w-full max-w-6xl lg:h-[643px] rounded-3xl shadow-lg border border-black overflow-hidden mx-auto">
    <img src={FallCampusSign} alt="StudyHive Campus" className="w-full h-full object-cover" />
    <div className="absolute inset-0 bg-black/45"></div>

    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-6">
      {/* Welcome text - hidden on mobile */}
      <div className="text-sm font-bold uppercase tracking-widest mb-4 hidden sm:block">
        Welcome to StudyHive
      </div>
      
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-normal capitalize leading-snug px-4">
        Empowering Students, One Session at a Time
      </h1>
      
      <div className="flex items-center space-x-[-10px] mt-6">
        {[User1, User2, User3, User4].map((user, index) => (
          <img key={index} className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-white" 
              src={user} alt={`User ${index + 1}`} />
        ))}
      </div>

      {/* Added text with responsive visibility */}
      <p className="mt-4 hidden md:block text-lg font-light max-w-md">
        More than 1000+ active users who are very satisfied with our courses.
      </p>
      
      {/* Modified button with adjusted spacing */}
      <Link to="/signup" className="mt-4 md:mt-6">
        <button className="px-4 py-2 md:px-6 md:py-3 text-xs md:text-sm bg-transparent text-white font-semibold border border-white rounded-lg hover:bg-white hover:text-black transition-colors">
          Get Started
        </button>
      </Link>
    </div>
  </div>
</section>

      {/* About Section */}
      <section className="w-full bg-[#E1EADF] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-center items-center gap-8 lg:gap-16">
          <div className="relative w-full max-w-xl">
            <div className="hidden lg:block absolute w-4/5 h-4/5 bg-green-900 rounded-lg -left-6 top-20"></div>
            <img className="w-full rounded-2xl shadow-lg relative z-10" 
                src={GradRateImage} alt="StudyHive Students" />
          </div>

          <div className="max-w-2xl flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 bg-green-900 rounded-full"></div>
              <h2 className="text-green-900 text-2xl font-bold">About StudyHive</h2>
            </div>
            <h2 className="text-3xl md:text-4xl font-semibold">
              Shaping Brighter Futures Through Quality Education
            </h2>
            <p className="text-lg leading-relaxed">
              Our tutoring center is dedicated to providing personalized and effective learning experiences for students of all ages.
            </p>
            <ul className="space-y-4">
              {[
                "Our mission is to empower students with the knowledge and skills they need to succeed academically and beyond.",
                "We believe in quality education, individualized attention, and a supportive learning environment.",
                "Emotional well-being, creating a safe space for new beginnings."
              ].map((text, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-2.5 h-2.5 bg-black rounded-full mt-1.5"></div>
                  <p className="text-lg">{text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="w-full bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-12">
            <div className="flex justify-center items-center gap-2">
              <div className="w-2.5 h-2.5 bg-green-900 rounded-full"></div>
              <h2 className="text-green-900 text-2xl font-bold">What We Offer</h2>
            </div>
            <h3 className="text-3xl md:text-4xl font-semibold mt-4">
              Our Services For Interactive Learning & Growth
            </h3>
            <p className="mx-auto max-w-2xl text-lg mt-4">
              Our tutoring center is dedicated to providing personalized and effective learning experiences for students of all ages.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="relative group">
                <div className="absolute inset-0 bg-[#E1EADF] rounded-lg transform -rotate-3 transition-transform group-hover:rotate-0"></div>
                <div className="relative p-8 bg-green-900 rounded-lg text-white hover:bg-green-800 transition-colors">
                  <img className="w-14 h-14 mb-4 mx-auto" 
                      src={Brain} alt="Service" />
                  <h3 className="text-2xl font-semibold mb-4">
                    {['1-on-1 Tutoring', 'Test Preparation', 'Homework Help'][item-1]}
                  </h3>
                  <p className="text-lg font-light">
                    Personalized attention tailored to individual learning styles and needs.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="w-full bg-[#E1EADF] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start gap-12">
          <div className="w-full lg:w-1/2 grid grid-cols-2 gap-6">
            <img src={LargeImage} alt="StudyHive Students" 
                className="w-full h-96 object-cover rounded-lg shadow-lg" />
            <img src={SmallImage} alt="Classroom Scene" 
                className="w-full h-48 mt-24 object-cover rounded-lg shadow-md" />
          </div>

          <div className="w-full lg:w-1/2 flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 bg-green-900 rounded-full"></div>
              <h2 className="text-green-900 text-2xl font-bold">Why Choose StudyHive</h2>
            </div>
            <h3 className="text-3xl md:text-4xl font-bold">
              Qualified and experienced educators
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                {['Expert Tutors', 'Interactive Learning'].map((text) => (
                  <div key={text} className="flex items-center gap-3">
                    <div className="w-2.5 h-1.5 bg-green-900"></div>
                    <p className="text-lg">{text}</p>
                  </div>
                ))}
              </div>
              <div className="space-y-4">
                {['Flexible Scheduling', 'Proven Results'].map((text) => (
                  <div key={text} className="flex items-center gap-3">
                    <div className="w-2.5 h-1.5 bg-green-900"></div>
                    <p className="text-lg">{text}</p>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-lg">
              Engaging methods that make learning fun and effective. Personalized attention tailored to individual learning styles and needs.
            </p>
            <button className="mt-4 px-8 py-3 bg-green-900 text-white rounded-lg hover:bg-green-700 w-fit">
              Contact us
            </button>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="w-full bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            What Our Students and Parents Say?
          </h2>
          <figure>
            <blockquote className="text-xl italic text-gray-700">
              “Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo expedita voluptas culpa sapiente alias
              molestiae. Numquam corrupti in laborum sed rerum et corporis.”
            </blockquote>
            <figcaption className="mt-8 flex items-center justify-center gap-4">
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330" 
                  alt="Judith Black" 
                  className="w-16 h-16 rounded-full" />
              <div className="text-left">
                <p className="font-semibold">Jacob Lake</p>
                <p className="text-gray-600">STUDENT</p>
              </div>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full bg-[#E1EADF] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-12">
            <div className="flex items-center justify-center gap-2">
              <div className="w-2.5 h-2.5 bg-green-900 rounded-full"></div>
              <h2 className="text-green-900 text-2xl font-bold">Any Question?</h2>
            </div>
            <h3 className="text-3xl md:text-4xl font-bold mt-4">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="space-y-4 text-left">
            {[
              "How do I sign up?",
              "What subjects do you offer?",
              "How do I become a tutor?",
              "What are the costs?"
            ].map((question, index) => (
              <details key={index} className="p-6 bg-white rounded-lg shadow-md cursor-pointer">
                <summary className="font-semibold text-lg flex justify-between items-center">
                  {question}
                  <span className="text-green-900">▼</span>
                </summary>
                <p className="mt-4 text-gray-600">This is the answer to the question.</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}