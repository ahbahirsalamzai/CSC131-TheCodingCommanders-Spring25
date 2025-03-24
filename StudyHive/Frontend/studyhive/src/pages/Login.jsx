import { useLocation } from 'react-router-dom';

export default function Login() {
  const location = useLocation();
  
  return (
    <div>
      {location.state?.fromSignup && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          Account created successfully! Please login with your email: {location.state.email}
        </div>
      )}
      {/* Rest of your login form */}
    </div>
  );
}