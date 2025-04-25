import React, { useState } from "react"; 
import { Link } from 'react-router-dom';
import FallCampusSign from "../assets/fall.jpg";
import GradRateImage from "../assets/gradrate.jpg";
import User1 from "../assets/girlpink.jpeg";
import User2 from "../assets/girlred.jpeg";
import User3 from "../assets/guyblue.jpeg";
import User4 from "../assets/lightblueguy.jpeg";
import LargeImage from "../assets/libhall.jpg"; 
import CollegeBoy from "../assets/collegeboy.jpeg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { faLightbulb } from '@fortawesome/free-solid-svg-icons';

const scrollToSection = (id) => {
  const element = document.getElementById(id);
  if (element) {
    const offset = 80; // Adjust this value based on your navbar height
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = element.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
};

export default function Home() {
  const [openIndex, setOpenIndex] = useState(null); // State for FAQ open/close

  const faqItems = [
    {
      question: "How do I sign up?",
      answer: "You can sign up by visiting our Sign Up page and filling out the registration form.",
    },
    {
      question: "What subjects do you offer?",
      answer: "We offer a wide range of subjects, including Math, Science, English, and more.",
    },
    {
      question: "How do I become a tutor?",
      answer: "To become a tutor, please apply through our Tutor Application page.",
    },
    {
      question: "What are the costs?",
      answer: "Our pricing varies depending on the service. Please check our Pricing page for details.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
  <div className="w-full overflow-x-hidden">
   {/* Hero Section */}
  <section id="home" className="relative w-full min-h-[90vh] md:min-h-screen flex items-center justify-center text-white pt-16">
      <div className="relative w-full max-w-6xl lg:h-[643px] rounded-3xl shadow-lg border border-black overflow-hidden mx-auto">
        <img src={FallCampusSign} alt="StudyHive Campus" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/45"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-6">
            {/* Welcome text - hidden on mobile */}
            <div className="text-sm font-bold uppercase tracking-widest mb-4 hidden sm:block">
              Welcome to StudyHive
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal capitalize leading-tight mx-auto max-w-xl px-4 md:leading-none">
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
  <section id="about" className="w-full bg-[#E1EADF] py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-center items-center gap-8 lg:gap-16">
         {/* Image Container */}
        <div className="relative w-full max-w-md">
            {/* Green Background */}
            <div className="hidden lg:block absolute w-[90%] h-[90%] bg-green-900 rounded-lg -left-8 top-20"></div>
            {/* Image */}
            <img
              className="w-full h-[400px] lg:h-[500px] object-cover rounded-2xl shadow-lg relative z-10"
              src={GradRateImage}
              alt="StudyHive Students"
              />
        </div>
         {/* Content */}
        <div className="w-full lg:w-1/2 flex flex-col gap-6">
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
                  <FontAwesomeIcon icon={faCircleCheck} className="text-gray-500 mt-1.5" />
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
    {/* Section Header */}
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

    {/* Services Grid */}
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-16">
      {[1, 2, 3].map((item) => (
        <div key={item} className="relative">
          {/* Green Background */}
          <div className="absolute inset-0 bg-[#E1EADF] rounded-lg -rotate-6 scale-140 -left-2 -top-2"></div>
          
          {/* Service Card */}
          <div className="relative p-8 bg-green-900 rounded-lg text-white text-left">
            {/* Lightbulb Icon (Smaller Size) */}
            <FontAwesomeIcon icon={faLightbulb} className="w-8 h-8 mb-4 text-white" />
            
            {/* Service Title */}
            <h3 className="text-2xl font-semibold mb-4">
              {['1-on-1 Tutoring', 'Test Preparation', 'Homework Help'][item - 1]}
            </h3>
            
            {/* Service Description */}
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
  <section className="w-full bg-[#E1EADF] py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-center items-center gap-8 lg:gap-16">
         {/* Image Container */}
        <div className="relative w-full max-w-md">
            {/* Green Background */}
            <div className="hidden lg:block absolute w-[90%] h-[90%] bg-green-900 rounded-lg -left-8 top-20"></div>
            {/* Single Image */}
            <img
              src={LargeImage}
              alt="StudyHive Students"
              className="w-full h-[400px] lg:h-[500px] object-cover rounded-2xl shadow-lg relative z-10"
              />
        </div>
         {/* Content */}
        <div className="w-full lg:w-1/2 flex flex-col gap-6">
            {/* Section Header */}
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 bg-green-900 rounded-full"></div>
              <h2 className="text-green-900 text-2xl font-bold">Why Choose StudyHive</h2>
            </div>
            {/* Subtitle */}
            <h3 className="text-3xl md:text-4xl font-bold">
              Qualified and experienced educators
            </h3>
            {/* Bullet Points */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                  {['Expert Tutors', 'Interactive Learning'].map((text) => (
                  <div key={text} className="flex items-center gap-3">
                    <FontAwesomeIcon icon={faCircleCheck} className="w-4 h-4 text-gray-500" />
                    <p className="text-lg">{text}</p>
                  </div>
                  ))}
              </div>
              <div className="space-y-4">
                  {['Flexible Scheduling', 'Proven Results'].map((text) => (
                  <div key={text} className="flex items-center gap-3">
                    <FontAwesomeIcon icon={faCircleCheck} className="w-4 h-4 text-gray-500" />
                    <p className="text-lg">{text}</p>
                  </div>
                  ))}
              </div>
            </div>
            {/* Sessions that fit around your busy life. */}
            <div className="text-black text-xl font-semibold mt-4">
              Sessions that fit around your busy life.
            </div>
            {/* Description */}
            <p className="text-lg mt-0">
              Engaging methods that make learning fun and effective. Personalized attention tailored to individual learning styles and needs.
            </p>
            {/* Updated Button with Smooth Scrolling */}
            <button
              onClick={() => scrollToSection("footer")}
            className="mt-6 px-8 py-3 bg-green-900 text-white rounded-lg hover:bg-green-800 transition-colors w-fit"
            >
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
              <img
                  src={CollegeBoy}
                  alt="Student"
                  className="w-16 h-16 rounded-full object-cover" // Use object-cover to maintain aspect ratio
                  />
              <div className="text-left">
                  <p className="font-semibold">Jacob Lake</p>
                  <p className="text-gray-600">STUDENT</p>
              </div>
            </figcaption>
        </figure>
      </div>
  </section>
   {/* FAQ Section */}
  <section id="faq" className="w-full bg-[#E1EADF] py-16 px-4 sm:px-6 lg:px-8">
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
            {faqItems.map((item, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-lg shadow-md cursor-pointer transition-all duration-300 ease-in-out"
                onClick={() => toggleFAQ(index)}
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-lg hover:text-green-900 transition-colors duration-300">
                    {item.question}
                  </h3>
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className={`text-green-900 transition-transform duration-300 transform ${
                      openIndex === index ? "rotate-180" : ""
                    } hover:scale-110`} // Arrow rotates and pops out on hover
                  />
                </div>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openIndex === index ? "max-h-40 mt-4" : "max-h-0"
                  }`}
                >
                  <p className="text-gray-600">{item.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}