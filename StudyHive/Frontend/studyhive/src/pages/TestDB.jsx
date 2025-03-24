import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function TestDB() {
  const [dbInfo, setDbInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const testConnection = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/verify-users`);
        setDbInfo(res.data);
      } catch (err) {
        console.error('Test failed:', err);
      } finally {
        setLoading(false);
      }
    };
    testConnection();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Database Connection Test</h1>
      
      {loading ? (
        <p>Testing connection...</p>
      ) : dbInfo ? (
        <div className="bg-gray-100 p-4 rounded-md">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <h2 className="font-semibold">Database Info</h2>
              <p>Name: {dbInfo.database}</p>
              <p>Collection: {dbInfo.collection}</p>
              <p>User Count: {dbInfo.count}</p>
            </div>
            <div>
              <h2 className="font-semibold">Connection Status</h2>
              <p className="text-green-600">✔ Successful connection</p>
            </div>
          </div>

          <h3 className="font-semibold mt-4">Latest Users</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border">Username</th>
                  <th className="py-2 px-4 border">Email</th>
                  <th className="py-2 px-4 border">Role</th>
                  <th className="py-2 px-4 border">Created</th>
                </tr>
              </thead>
              <tbody>
                {dbInfo.users.slice(0, 5).map(user => (
                  <tr key={user._id}>
                    <td className="py-2 px-4 border">{user.username}</td>
                    <td className="py-2 px-4 border">{user.email}</td>
                    <td className="py-2 px-4 border">{user.role}</td>
                    <td className="py-2 px-4 border">
                      {new Date(user.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <p className="text-red-500">Failed to connect to database</p>
      )}
    </div>
  );
}