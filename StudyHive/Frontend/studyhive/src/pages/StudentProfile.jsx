import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import api from '../services/api';

export default function StudentProfilePage() {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    dob: '',
    phone: '',
    newSubject: '',
    subjects: [],
    learningGoals: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    api.get('/student/profile')
      .then(res => {
        const { name, email, dob, phone, subjects, learningGoals } = res.data;
        setProfile(prev => ({
          ...prev,
          name: name || '',
          email: email || '',
          dob: dob || '',
          phone: phone || '',
          subjects: subjects || [],
          learningGoals: learningGoals || ''
        }));
      })
      .catch(err => console.error('Failed to load student profile', err));
  }, []);

  const updateField = (key, val) => setProfile(prev => ({ ...prev, [key]: val }));

  const handleSubjectKeyDown = (e) => {
    if (e.key === 'Enter' && profile.newSubject.trim() !== '') {
      e.preventDefault();
      setProfile(prev => ({
        ...prev,
        subjects: [...prev.subjects, prev.newSubject],
        newSubject: ''
      }));
    }
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone) => /^[0-9-]+$/.test(phone);
  const validateDOB = (dob) => /^(January|February|March|April|May|June|July|August|September|October|November|December)\s\d{1,2},\s\d{4}$/i.test(dob);

  return (
    <div className="flex pt-20 bg-gray-100 min-h-screen">
      <div className="w-80 min-h-screen mt-[-8%] ml-[-10%] bg-[#E3EAE0] shadow-md border-r hidden md:flex">
        <Sidebar />
      </div>

      <div className="flex-1 p-6 space-y-6">
        {/* Personal Info Section */}
        <div className="bg-white border rounded-xl p-6 mb-6">
          <h3 className="text-lg font-semibold text-neutral-800 mb-4">Personal Info</h3>
          <p className="text-sm text-gray-500 mb-4">Update your photo and personal details.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="text-sm text-gray-700">Name</label>
              <input
                type="text"
                placeholder="Name"
                className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 placeholder-gray-400 w-full"
                value={profile.name}
                onChange={(e) => updateField('name', e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm text-gray-700">Email</label>
              <input
                type="email"
                placeholder="Email"
                className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 placeholder-gray-400 w-full"
                value={profile.email}
                onChange={(e) => updateField('email', e.target.value)}
              />
              {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
            </div>
            <div className="flex flex-col">
              <label className="text-sm text-gray-700">Date of Birth</label>
              <input
                type="text"
                placeholder="March 15, 2020"
                className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 placeholder-gray-400 w-full"
                value={profile.dob}
                onChange={(e) => updateField('dob', e.target.value)}
              />
              {errors.dob && <span className="text-red-500 text-sm">{errors.dob}</span>}
            </div>
            <div className="flex flex-col">
              <label className="text-sm text-gray-700">Phone</label>
              <input
                type="text"
                placeholder="Phone Number"
                className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 placeholder-gray-400 w-full"
                value={profile.phone}
                onChange={(e) => updateField('phone', e.target.value)}
              />
              {errors.phone && <span className="text-red-500 text-sm">{errors.phone}</span>}
            </div>
          </div>
          <div className="flex gap-4 justify-end mt-4">
            <button className="px-6 py-2 bg-white hover:bg-gray-100 text-[#1F4D39] border border-[#1F4D39] text-base font-semibold capitalize rounded-lg">Cancel</button>
            <button className="px-6 py-2 bg-[#1F4D39] hover:bg-[#17382a] text-white text-base font-semibold capitalize rounded-lg">Update</button>
          </div>
        </div>

        {/* Academic Details Section */}
        <div className="bg-white border rounded-xl p-6 mb-6">
          <h3 className="text-lg font-semibold text-neutral-800 mb-4">Academic Details</h3>
          <p className="text-sm text-gray-500 mb-4">Update your academic details.</p>

          <h4 className="text-md font-semibold text-neutral-700 mb-2">Subject of Interest</h4>
          <div className="flex mb-4">
            <input
              type="text"
              placeholder="Enter subject"
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-gray-700 placeholder-gray-400"
              value={profile.newSubject}
              onChange={(e) => updateField('newSubject', e.target.value)}
              onKeyDown={handleSubjectKeyDown}
            />
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {profile.subjects.map((subject, idx) => (
              <div key={idx} className="bg-gray-200 px-3 py-1 rounded-full flex items-center">
                {subject}
                <button
                  className="ml-2 text-red-600 hover:text-red-800"
                  onClick={() => {
                    setProfile(prev => ({
                      ...prev,
                      subjects: prev.subjects.filter((_, i) => i !== idx)
                    }));
                  }}
                >
                  &times;
                </button>
              </div>
            ))}
          </div>

          <div className="flex flex-col mb-4">
            <label className="text-sm text-gray-700">Learning Goals</label>
            <textarea
              placeholder="Enter your learning goals"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 placeholder-gray-400"
              rows="4"
              value={profile.learningGoals}
              onChange={(e) => updateField('learningGoals', e.target.value)}
            ></textarea>
          </div>

          <div className="flex gap-4 justify-end mt-4">
            <button className="px-6 py-2 bg-white hover:bg-gray-100 text-[#1F4D39] border border-[#1F4D39] text-base font-semibold capitalize rounded-lg">Cancel</button>
            <button className="px-6 py-2 bg-[#1F4D39] hover:bg-[#17382a] text-white text-base font-semibold capitalize rounded-lg">Update</button>
          </div>
        </div>

        {/* Password Section */}
        <div className="bg-white border rounded-xl p-6 mb-6">
          <h3 className="text-lg font-semibold text-neutral-800 mb-4">Password</h3>
          <p className="text-sm text-gray-500 mb-4">Update your password.</p>

          <div className="flex flex-col mb-6 relative">
            <label className="text-sm text-gray-700">Current Password</label>
            <input
              type={showCurrentPassword ? 'text' : 'password'}
              placeholder="Current Password"
              className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 placeholder-gray-400 w-full"
              value={profile.currentPassword}
              onChange={(e) => updateField('currentPassword', e.target.value)}
            />
            <button
              type="button"
              className="absolute right-3 top-9 text-sm text-gray-600"
              onClick={() => setShowCurrentPassword(prev => !prev)}
            >
              {showCurrentPassword ? 'Hide' : 'Show'}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col relative">
              <label className="text-sm text-gray-700">New Password</label>
              <input
                type={showNewPassword ? 'text' : 'password'}
                placeholder="New Password"
                className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 placeholder-gray-400 w-full"
                value={profile.newPassword}
                onChange={(e) => updateField('newPassword', e.target.value)}
              />
              <button
                type="button"
                className="absolute right-3 top-9 text-sm text-gray-600"
                onClick={() => setShowNewPassword(prev => !prev)}
              >
                {showNewPassword ? 'Hide' : 'Show'}
              </button>
            </div>

            <div className="flex flex-col relative">
              <label className="text-sm text-gray-700">Confirm New Password</label>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm New Password"
                className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 placeholder-gray-400 w-full"
                value={profile.confirmPassword}
                onChange={(e) => updateField('confirmPassword', e.target.value)}
              />
              <button
                type="button"
                className="absolute right-3 top-9 text-sm text-gray-600"
                onClick={() => setShowConfirmPassword(prev => !prev)}
              >
                {showConfirmPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <div className="flex gap-4 justify-end mt-4">
            <button className="px-6 py-2 bg-white hover:bg-gray-100 text-[#1F4D39] border border-[#1F4D39] text-base font-semibold capitalize rounded-lg">Cancel</button>
            <button className="px-6 py-2 bg-[#1F4D39] hover:bg-[#17382a] text-white text-base font-semibold capitalize rounded-lg">Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
}
