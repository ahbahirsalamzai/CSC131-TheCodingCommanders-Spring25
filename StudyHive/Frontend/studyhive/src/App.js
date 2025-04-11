import React, { useState } from 'react';

export default function StudentProfile() {
  const [profile, setProfile] = useState({
    name: 'James Dupont',
    email: 'johndoe@example.com',
    dob: '2002-03-15',
    phone: '123-456-7931',
    newSubject: '',
    subjects: ['Mathematics', 'Physics', 'Computer Science'],
    goals: 'I want to improve my problem-solving skills in math and gain a deeper understanding of programming concepts.',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const updateField = (field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }));
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

  const handleUpdate = () => alert('Updated!');
  const handlePasswordUpdate = () => {
    if (profile.newPassword !== profile.confirmPassword) {
      alert('Passwords do not match.');
    } else {
      alert('Password updated.');
    }
  };

  const styles = {
    container: { display: 'flex', minHeight: '100vh', fontFamily: 'Plus Jakarta Sans, sans-serif', backgroundColor: '#FCFCFD' },
    sidebar: { width: 264, background: '#E1EADF', padding: 20, display: 'flex', flexDirection: 'column', gap: 32 },
    logo: { fontSize: 34, fontWeight: 700, color: '#232323' },
    navBtn: { padding: 12, background: 'white', border: 'none', borderRadius: 6, fontSize: 16, color: '#1F4D39', marginBottom: 10, textAlign: 'left', cursor: 'pointer' },
    main: { flex: 1, padding: 40 },
    header: { background: 'white', padding: '14px 24px', borderRadius: 6, boxShadow: '0px 2px 12px rgba(0, 0, 0, 0.06)', marginBottom: 32, display: 'flex', justifyContent: 'flex-end' },
    userName: { fontWeight: 600, color: '#1F1F1F', margin: 0 },
    userEmail: { color: '#697586', fontSize: 14, margin: 0 },
    card: { background: 'white', padding: 24, borderRadius: 12, marginBottom: 32, boxShadow: '0px 2px 12px rgba(0, 0, 0, 0.06)' },
    cardTitle: { fontSize: 18, fontWeight: 600, marginBottom: 16 },
    row: { display: 'flex', gap: 24, flexWrap: 'wrap' },
    formGroup: { flex: 1, display: 'flex', flexDirection: 'column', marginBottom: 16 },
    label: { fontWeight: 500, marginBottom: 4, color: '#121926' },
    input: { padding: '14px 16px', border: '1px solid #CDD5DF', borderRadius: 8, fontSize: 16, width: '100%', boxSizing: 'border-box' },
    textarea: { resize: 'none', height: 100 },
    buttonRow: { display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 24 },
    cancelBtn: { background: 'white', color: '#1F4D39', padding: '10px 24px', border: '1px solid #1F4D39', borderRadius: 6, fontWeight: 600, cursor: 'pointer' },
    submitBtn: { background: '#1F4D39', color: 'white', padding: '10px 24px', border: 'none', borderRadius: 6, fontWeight: 600, cursor: 'pointer' },
    chipContainer: { display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 12 },
    chip: { padding: '6px 12px', borderRadius: 48, border: '1px solid #697586', fontSize: 14, color: '#4B5565', display: 'flex', alignItems: 'center' },
    chipBtn: { marginLeft: 8, background: 'transparent', border: 'none', fontSize: 14, cursor: 'pointer', color: '#4B5565' },
    addBtn: { marginTop: 8, background: '#1F4D39', color: 'white', border: 'none', padding: '6px 12px', borderRadius: 6, cursor: 'pointer' }
  };

  return (
    <div style={styles.container}>
      <aside style={styles.sidebar}>
        <h1 style={styles.logo}>Study<span style={{ color: '#1F4D39' }}>Hive</span></h1>
        <button style={styles.navBtn}>Dashboard</button>
        <button style={styles.navBtn}>Schedule Session</button>
        <button style={styles.navBtn}>Logout</button>
      </aside>

      <main style={styles.main}>
        <header style={styles.header}>
          <div>
            <p style={styles.userName}>John Doe</p>
            <p style={styles.userEmail}>johndoe@example.com</p>
          </div>
        </header>

        <section style={styles.card}>
          <h2 style={styles.cardTitle}>Personal Info</h2>
          <div style={styles.row}>
            <Input label="Name" value={profile.name} onChange={val => updateField('name', val)} styles={styles} />
            <Input label="Email" value={profile.email} onChange={val => updateField('email', val)} styles={styles} />
          </div>
          <div style={styles.row}>
            <Input label="Date of Birth" type="date" value={profile.dob} onChange={val => updateField('dob', val)} styles={styles} />
            <Input label="Phone" value={profile.phone} onChange={val => updateField('phone', val)} styles={styles} />
          </div>
          <ActionButtons onUpdate={handleUpdate} styles={styles} />
        </section>

        <section style={styles.card}>
          <h2 style={styles.cardTitle}>Academic Details</h2>
          <Input label="Subjects of Interest" value={profile.newSubject} onChange={val => updateField('newSubject', val)} styles={styles} />
          <button style={styles.addBtn} onClick={addSubject}>Add</button>
          <div style={styles.chipContainer}>
            {profile.subjects.map((sub, i) => (
              <span style={styles.chip} key={i}>{sub} <button style={styles.chipBtn} onClick={() => removeSubject(sub)}>×</button></span>
            ))}
          </div>
          <Textarea label="Learning Goals" value={profile.goals} onChange={val => updateField('goals', val)} styles={styles} />
          <ActionButtons onUpdate={handleUpdate} styles={styles} />
        </section>

        <section style={styles.card}>
          <h2 style={styles.cardTitle}>Password</h2>
          <Input label="Current Password" type="password" value={profile.currentPassword} onChange={val => updateField('currentPassword', val)} styles={styles} />
          <div style={styles.row}>
            <Input label="New Password" type="password" value={profile.newPassword} onChange={val => updateField('newPassword', val)} styles={styles} />
            <Input label="Confirm Password" type="password" value={profile.confirmPassword} onChange={val => updateField('confirmPassword', val)} styles={styles} />
          </div>
          <ActionButtons onUpdate={handlePasswordUpdate} submitText="Submit" styles={styles} />
        </section>
      </main>
    </div>
  );
}

function Input({ label, value, onChange, type = 'text', styles }) {
  return (
    <div style={styles.formGroup}>
      <label style={styles.label}>{label}</label>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} style={styles.input} />
    </div>
  );
}

function Textarea({ label, value, onChange, styles }) {
  return (
    <div style={styles.formGroup}>
      <label style={styles.label}>{label}</label>
      <textarea value={value} onChange={e => onChange(e.target.value)} style={{ ...styles.input, ...styles.textarea }} />
    </div>
  );
}

function ActionButtons({ onUpdate, submitText = 'Update', styles }) {
  return (
    <div style={styles.buttonRow}>
      <button style={styles.cancelBtn}>Cancel</button>
      <button style={styles.submitBtn} onClick={onUpdate}>{submitText}</button>
    </div>
  );
}
