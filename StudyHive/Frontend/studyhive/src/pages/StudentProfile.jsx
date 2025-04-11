import React, { useState } from 'react';

export default function StudentProfilePage() {
  const [profile, setProfile] = useState({
    name: 'James Dupont',
    email: 'johndoe@example.com',
    dob: '2002-03-15',
    phone: '123-456-7931',
    subjects: ['Mathematics', 'Physics', 'Computer Science'],
    newSubject: '',
    goals: 'I want to improve my problem-solving skills in math and gain a deeper understanding of programming concepts.',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleInputChange = (key, value) => {
    setProfile(prev => ({ ...prev, [key]: value }));
  };

  const addSubject = () => {
    if (profile.newSubject && !profile.subjects.includes(profile.newSubject)) {
      setProfile(prev => ({
        ...prev,
        subjects: [...prev.subjects, prev.newSubject],
        newSubject: ''
      }));
    }
  };

  const removeSubject = (subject) => {
    setProfile(prev => ({
      ...prev,
      subjects: prev.subjects.filter(s => s !== subject)
    }));
  };

  const handleUpdate = () => {
    alert('Profile updated!');
  };

  const handlePasswordSubmit = () => {
    if (profile.newPassword === profile.confirmPassword) {
      alert('Password updated!');
    } else {
      alert('Passwords do not match!');
    }
  };

  return (
    <div style={{ display: 'flex', fontFamily: 'Plus Jakarta Sans', background: '#FCFCFD' }}>
      {/* Sidebar */}
      <div style={{ width: 264, background: '#E1EADF', height: '100vh', padding: 20 }}>
        <h1 style={{ fontSize: 34, fontWeight: 700 }}>Study<span style={{ color: '#1F4D39' }}>Hive</span></h1>
        <div style={{ marginTop: 32 }}>
          <button style={navBtn}>Dashboard</button>
          <button style={navBtn}>Schedule Session</button>
        </div>
        <button style={{ ...navBtn, marginTop: 'auto' }}>Logout</button>
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: 40 }}>
        {/* Top Bar */}
        <div style={topBar}>
          <div>
            <div style={{ fontWeight: 600 }}>John Doe</div>
            <div style={{ color: '#697586' }}>{profile.email}</div>
          </div>
        </div>

        {/* Profile Section */}
        <div style={card}>
          <h2>Personal Info</h2>
          <div style={row}>
            <TextInput label="Name" value={profile.name} onChange={val => handleInputChange('name', val)} />
            <TextInput label="Email" value={profile.email} onChange={val => handleInputChange('email', val)} />
          </div>
          <div style={row}>
            <TextInput label="Date of Birth" value={profile.dob} onChange={val => handleInputChange('dob', val)} type="date" />
            <TextInput label="Phone" value={profile.phone} onChange={val => handleInputChange('phone', val)} />
          </div>
          <div style={buttonRow}>
            <button style={cancelBtn}>Cancel</button>
            <button style={updateBtn} onClick={handleUpdate}>Update</button>
          </div>
        </div>

        {/* Academic Section */}
        <div style={card}>
          <h2>Academic Details</h2>
          <TextInput label="Add Subject" value={profile.newSubject} onChange={val => handleInputChange('newSubject', val)} />
          <button onClick={addSubject} style={{ marginTop: 8 }}>Add</button>
          <div style={{ marginTop: 12, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {profile.subjects.map((subj, idx) => (
              <div key={idx} style={chip}>
                {subj}
                <span onClick={() => removeSubject(subj)} style={{ marginLeft: 8, cursor: 'pointer' }}>×</span>
              </div>
            ))}
          </div>
          <TextArea label="Learning Goals" value={profile.goals} onChange={val => handleInputChange('goals', val)} />
          <div style={buttonRow}>
            <button style={cancelBtn}>Cancel</button>
            <button style={updateBtn} onClick={handleUpdate}>Update</button>
          </div>
        </div>

        {/* Password Section */}
        <div style={card}>
          <h2>Password</h2>
          <div style={row}>
            <TextInput label="Current Password" value={profile.currentPassword} onChange={val => handleInputChange('currentPassword', val)} type="password" />
          </div>
          <div style={row}>
            <TextInput label="New Password" value={profile.newPassword} onChange={val => handleInputChange('newPassword', val)} type="password" />
            <TextInput label="Confirm Password" value={profile.confirmPassword} onChange={val => handleInputChange('confirmPassword', val)} type="password" />
          </div>
          <div style={buttonRow}>
            <button style={cancelBtn}>Cancel</button>
            <button style={updateBtn} onClick={handlePasswordSubmit}>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function TextInput({ label, value, onChange, type = 'text' }) {
  return (
    <div style={{ flex: 1, marginRight: 16 }}>
      <label>{label}</label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{
          width: '100%',
          padding: '14px 16px',
          border: '1px solid #CDD5DF',
          borderRadius: 8,
          marginTop: 4
        }}
      />
    </div>
  );
}

function TextArea({ label, value, onChange }) {
  return (
    <div style={{ width: '100%', marginTop: 16 }}>
      <label>{label}</label>
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{
          width: '100%',
          height: 100,
          padding: '14px 16px',
          border: '1px solid #CDD5DF',
          borderRadius: 8,
          marginTop: 4
        }}
      />
    </div>
  );
}

const card = {
  background: 'white',
  padding: 24,
  borderRadius: 12,
  marginBottom: 32,
  boxShadow: '0px 2px 12px rgba(0, 0, 0, 0.06)'
};

const row = {
  display: 'flex',
  gap: 24,
  marginBottom: 16
};

const buttonRow = {
  display: 'flex',
  justifyContent: 'flex-end',
  gap: 12,
  marginTop: 24
};

const updateBtn = {
  background: '#1F4D39',
  color: 'white',
  padding: '10px 24px',
  borderRadius: 6,
  fontWeight: 600,
  border: 'none'
};

const cancelBtn = {
  background: 'white',
  color: '#1F4D39',
  padding: '10px 24px',
  borderRadius: 6,
  fontWeight: 600,
  border: '1px solid #1F4D39'
};

const navBtn = {
  width: '100%',
  padding: '12px 16px',
  background: 'white',
  borderRadius: 6,
  marginBottom: 8,
  textAlign: 'left',
  fontSize: 16,
  border: 'none',
  cursor: 'pointer'
};

const topBar = {
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  padding: '14px 24px',
  background: 'white',
  marginBottom: 32,
  boxShadow: '0px 2px 12px rgba(0,0,0,0.06)',
  borderRadius: 6
};

const chip = {
  padding: '6px 12px',
  borderRadius: 48,
  border: '1px solid #697586',
  fontSize: 14,
  color: '#4B5565',
  display: 'flex',
  alignItems: 'center'
};
