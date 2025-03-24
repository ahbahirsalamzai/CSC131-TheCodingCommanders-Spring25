import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student',
    acceptedTerms: false
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Client-side validation
    if (!formData.acceptedTerms) {
      setError('You must accept the terms and conditions');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/signup`,
        {
          username: formData.username,
          email: formData.email,
          password: formData.password,
          role: formData.role
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.status === 201) {
        navigate('/login', { 
          state: { 
            registrationSuccess: true,
            email: formData.email 
          } 
        });
      }
    } catch (err) {
      let errorMessage = 'Registration failed. Please try again.';
      
      if (err.response) {
        if (err.response.status === 409) {
          errorMessage = err.response.data.error || 'Username or email already exists';
        } else {
          errorMessage = err.response.data.message || `Server error (${err.response.status})`;
        }
      } else if (err.request) {
        errorMessage = 'No response from server - check your connection';
      }
      
      setError(errorMessage);
      console.error('Signup error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear errors when user types
    if (error) setError('');
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Role Selection */}
        <div className="flex gap-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="role"
              value="student"
              checked={formData.role === 'student'}
              onChange={handleChange}
              className="form-radio"
            />
            <span className="ml-2">Student</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="role"
              value="tutor"
              checked={formData.role === 'tutor'}
              onChange={handleChange}
              className="form-radio"
            />
            <span className="ml-2">Tutor</span>
          </label>
        </div>

        {/* Form Fields */}
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="w-full p-2 border rounded-md"
          value={formData.username}
          onChange={handleChange}
          required
          minLength="3"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-2 border rounded-md"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password (min 8 characters)"
          className="w-full p-2 border rounded-md"
          value={formData.password}
          onChange={handleChange}
          required
          minLength="8"
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          className="w-full p-2 border rounded-md"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />

        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              type="checkbox"
              name="acceptedTerms"
              checked={formData.acceptedTerms}
              onChange={handleChange}
              className="form-checkbox"
              required
            />
          </div>
          <div className="ml-3 text-sm">
            <label className="font-medium text-gray-700">
              I Accept Terms & Conditions
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-2 px-4 rounded-md text-white ${
            isSubmitting ? 'bg-gray-500' : 'bg-[#275e49] hover:bg-green-800'
          }`}
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" 
                   xmlns="http://www.w3.org/2000/svg" 
                   fill="none" 
                   viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Creating Account...
            </>
          ) : 'Sign Up'}
        </button>
      </form>

      <p className="mt-6 text-center">
        Already have an account?{' '}
        <a href="/login" className="text-[#275e49] hover:underline font-medium">
          Sign In
        </a>
      </p>
    </div>
  );
}