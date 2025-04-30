import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import api from '../services/api';

// Utility functions
function formatPhoneNumber(value) {
  const cleaned = value.replace(/\D/g, '').slice(0, 10);
  const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
  if (!match) return value;
  const [, area, middle, last] = match;
  if (last) return `${area}-${middle}-${last}`;
  if (middle) return `${area}-${middle}`;
  return area;
}

function formatDOB(value) {
  const cleaned = value.replace(/\D/g, '').slice(0, 8);
  const match = cleaned.match(/^(\d{0,2})(\d{0,2})(\d{0,4})$/);
  if (!match) return value;
  const [, mm, dd, yyyy] = match;
  if (yyyy) return `${mm}-${dd}-${yyyy}`;
  if (dd) return `${mm}-${dd}`;
  return mm;
}

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
  const [passwordError, setPasswordError] = useState('');
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

  const updateField = (key, val) => {
    setProfile(prev => ({ ...prev, [key]: val }));
    if (key === 'newPassword' || key === 'confirmPassword') {
      setPasswordError(''); // clear error as user types
    }
  };

  const handleSubjectKeyDown = (e) => {
    if (e.key === 'Enter' && profile.newSubject.trim()) {
      e.preventDefault();
      setProfile(prev => ({
        ...prev,
        subjects: [...prev.subjects, prev.newSubject.trim()],
        newSubject: ''
      }));
    }
  };

  const handleUpdatePersonalInfo = async () => {
    const newErrors = {};
    if (!/^\d{3}-\d{3}-\d{4}$/.test(profile.phone)) {
      newErrors.phone = 'Phone must be in xxx-xxx-xxxx format';
    }
    if (!/^\d{2}-\d{2}-\d{4}$/.test(profile.dob)) {
      newErrors.dob = 'DOB must be in MM-DD-YYYY format';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await api.put('/student/profile', {
        name: profile.name,
        email: profile.email,
        phone: profile.phone,
        dob: profile.dob,
        subjects: profile.subjects,
        learningGoals: profile.learningGoals
      });
      alert('Profile updated successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to update profile.');
    }
  };

  const handleUpdatePassword = async () => {
    const { currentPassword, newPassword, confirmPassword } = profile;

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError('Please fill in all password fields');
      return;
    }

    if (newPassword.length < 8) {
      setPasswordError('New password must be at least 8 characters.');
      return;
    }

    if (!/[A-Za-z]/.test(newPassword) || !/[0-9]/.test(newPassword)) {
      setPasswordError('New password must contain at least one letter and one number.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('New password and confirmation do not match.');
      return;
    }

    try {
      await api.post('/student/update-password', { currentPassword, newPassword });
      alert('Password updated successfully!');
      setProfile(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));
      setPasswordError('');
    } catch (err) {
      console.error(err);
      setPasswordError('Failed to update password.');
    }
  };

  return (
    <div className="flex pt-20 bg-gray-100 min-h-screen">
      <div className="w-80 min-h-screen mt-[-8%] ml-[-10%] bg-[#E3EAE0] shadow-md border-r hidden md:flex">
        <Sidebar />
      </div>
      <div className="flex-1 p-6 space-y-6">

        {/* Personal Info */}
        {/* (your Personal Info and Academic Details sections stay the same) */}

        {/* Password Update */}
        <div className="bg-white border rounded-xl p-6">
          <h3 className="text-lg font-semibold">Update Password</h3>

          {/* First line: Current Password */}
          <div className="relative mt-4">
            <input
              type={showCurrentPassword ? 'text' : 'password'}
              placeholder="Current password"
              value={profile.currentPassword}
              onChange={(e) => updateField('currentPassword', e.target.value)}
              className="border rounded p-2 w-full"
            />
            <button
              type="button"
              className="absolute right-3 top-2 text-sm text-gray-600"
              onClick={() => setShowCurrentPassword(prev => !prev)}
            >
              {showCurrentPassword ? 'Hide' : 'Show'}
            </button>
          </div>

          {/* Second line: New Password + Confirm Password */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div className="relative">
              <input
                type={showNewPassword ? 'text' : 'password'}
                placeholder="New password"
                value={profile.newPassword}
                onChange={(e) => updateField('newPassword', e.target.value)}
                className="border rounded p-2 w-full"
              />
              <button
                type="button"
                className="absolute right-3 top-2 text-sm text-gray-600"
                onClick={() => setShowNewPassword(prev => !prev)}
              >
                {showNewPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm new password"
                value={profile.confirmPassword}
                onChange={(e) => updateField('confirmPassword', e.target.value)}
                className="border rounded p-2 w-full"
              />
              <button
                type="button"
                className="absolute right-3 top-2 text-sm text-gray-600"
                onClick={() => setShowConfirmPassword(prev => !prev)}
              >
                {showConfirmPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          {/* Show password error if any */}
          {passwordError && (
            <p className="text-red-500 text-sm mt-2">{passwordError}</p>
          )}

          <div className="flex justify-end gap-4 mt-4">
            <button className="px-6 py-2 bg-white hover:bg-gray-100 text-[#1F4D39] border border-[#1F4D39] text-base font-semibold capitalize rounded-lg">
              Cancel
            </button>
            <button
              className="px-6 py-2 bg-[#1F4D39] hover:bg-[#17382a] text-white text-base font-semibold capitalize rounded-lg"
              onClick={handleUpdatePassword}
            >
              Submit
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
