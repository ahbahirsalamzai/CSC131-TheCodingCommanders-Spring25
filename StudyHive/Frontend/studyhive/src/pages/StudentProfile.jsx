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

  const addSubject = () => {
    if (profile.newSubject && !profile.subjects.includes(profile.newSubject)) {
      setProfile(prev => ({
        ...prev,
        subjects: [...prev.subjects, profile.newSubject],
        newSubject: ''
      }));
    }
  };

  const removeSubject = (subj) => {
    setProfile(prev => ({
      ...prev,
      subjects: prev.subjects.filter(s => s !== subj)
    }));
  };

  const handleUpdate = () => {
    const { name, email, dob, phone, subjects, learningGoals } = profile;
    api.put('/student/profile', { name, email, dob, phone, subjects, learningGoals })
      .then(() => alert('Profile updated successfully!'))
      .catch(() => alert('Failed to update profile'));
  };

  const handlePasswordUpdate = () => {
    if (profile.newPassword !== profile.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    api.put('/student/password', {
      currentPassword: profile.currentPassword,
      newPassword: profile.newPassword
    })
      .then(() => alert('Password updated successfully!'))
      .catch(err => alert(err.response?.data?.message || 'Password update failed'));
  };

  return (
    <div className="flex pt-20 min-h-screen bg-gray-50">
      <Sidebar showBackArrow={true} />

      <div className="flex-1 p-8">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="bg-white shadow px-6 py-4 flex justify-end rounded-xl border border-slate-200">
            <div className="text-right">
              <div className="text-sm font-semibold text-[#1F1F1F]">John Doe</div>
              <div className="text-sm text-[#697586]">johndoe@example.com</div>
            </div>
          </div>

          <Section title="Personal info" subtitle="Update your photo and personal details.">
            <div className="flex flex-col md:flex-row gap-6">
              <Input label="Name" val={profile.name} set={v => updateField('name', v)} placeholder="James Dupont" />
              <Input label="Email" val={profile.email} set={v => updateField('email', v)} disabled placeholder="johndoe@example.com" />
            </div>
            <div className="flex flex-col md:flex-row gap-6">
              <Input label="Date of Birth" type="date" val={profile.dob} set={v => updateField('dob', v)} placeholder="March 15, 2002" />
              <Input label="Phone" val={profile.phone} set={v => updateField('phone', v)} placeholder="123-456-7931" />
            </div>
            <ActionButtons onUpdate={handleUpdate} />
          </Section>

          <Section title="Academic Details" subtitle="Update your academic details.">
            <Input label="Subjects of Interest" val={profile.newSubject} set={v => updateField('newSubject', v)} placeholder="Enter name" />
            <button className="bg-[#1F4D39] text-white px-4 py-2 rounded-md font-semibold" onClick={addSubject}>Add</button>
            <div className="flex flex-wrap gap-2 mt-2">
              {profile.subjects.map((s, i) => (
                <div key={i} className="flex items-center border border-[#697586] text-sm text-[#4B5565] rounded-full px-3 py-1">
                  {s} <button className="ml-2" onClick={() => removeSubject(s)}>×</button>
                </div>
              ))}
            </div>
            <TextArea label="Learning Goals" val={profile.learningGoals} set={v => updateField('learningGoals', v)} placeholder="I want to improve my problem-solving skills in math and gain a deeper understanding of programming concepts." />
            <ActionButtons onUpdate={handleUpdate} />
          </Section>

          <Section title="Password" subtitle="Update Your Password.">
            <Input label="Current Password" type="password" val={profile.currentPassword} set={v => updateField('currentPassword', v)} placeholder="***********" />
            <div className="flex flex-col md:flex-row gap-6">
              <Input label="New Password" type="password" val={profile.newPassword} set={v => updateField('newPassword', v)} placeholder="***********" />
              <Input label="Confirm Password" type="password" val={profile.confirmPassword} set={v => updateField('confirmPassword', v)} placeholder="***********" />
            </div>
            <ActionButtons onUpdate={handlePasswordUpdate} submitText="Submit" />
          </Section>
        </div>
      </div>
    </div>
  );
}

function Section({ title, subtitle, children }) {
  return (
    <div className="bg-white border border-[#E3E8EF] rounded-xl p-6">
      <h2 className="text-lg font-semibold text-[#121926] mb-1">{title}</h2>
      <p className="text-sm text-[#697586] mb-4">{subtitle}</p>
      {children}
    </div>
  );
}

function Input({ label, val, set, type = 'text', disabled = false, placeholder = '' }) {
  return (
    <div className="flex flex-col flex-1">
      <label className="font-medium text-[#121926] mb-1">{label}</label>
      <input type={type} value={val} onChange={e => set(e.target.value)} disabled={disabled} placeholder={placeholder}
             className="border border-[#CDD5DF] rounded-md px-4 py-3 text-sm text-[#121926] bg-white placeholder-[#9AA4B2]" />
    </div>
  );
}

function TextArea({ label, val, set, placeholder = '' }) {
  return (
    <div className="mt-4">
      <label className="font-medium text-[#121926] mb-1">{label}</label>
      <textarea value={val} onChange={e => set(e.target.value)} placeholder={placeholder}
                className="border border-[#CDD5DF] rounded-md px-4 py-3 text-sm text-[#121926] w-full min-h-[100px] placeholder-[#9AA4B2]" />
    </div>
  );
}

function ActionButtons({ onUpdate, submitText = 'Update' }) {
  return (
    <div className="flex justify-end gap-3 mt-4">
      <button className="border border-[#1F4D39] text-[#1F4D39] px-6 py-2 rounded-md font-semibold">Cancel</button>
      <button className="bg-[#1F4D39] text-white px-6 py-2 rounded-md font-semibold" onClick={onUpdate}>{submitText}</button>
    </div>
  );
}
