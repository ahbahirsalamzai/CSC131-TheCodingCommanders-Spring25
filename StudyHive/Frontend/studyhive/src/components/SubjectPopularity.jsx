import React, { useEffect, useState } from "react";
import axios from "axios";

const SubjectPopularity = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPopularity = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/sessions/popularity");
        setData(res.data);
      } catch (err) {
        setError("Failed to load subject popularity.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularity();
  }, []);

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm mt-6">
      <h2 className="text-base font-semibold text-gray-900 mb-4">Subject Popularity</h2>

      {loading ? (
        <p className="text-sm text-gray-500">Loading...</p>
      ) : error ? (
        <p className="text-sm text-red-500">{error}</p>
      ) : (
        <table className="w-full text-sm text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-700 font-semibold">
              <th className="px-4 py-2 border border-gray-200">Subject</th>
              <th className="px-4 py-2 border border-gray-200">Sessions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((subject, index) => (
              <tr key={index} className="hover:bg-gray-50 transition">
                <td className="px-4 py-2 border border-gray-200">{subject.subject}</td>
                <td className="px-4 py-2 border border-gray-200">{subject.sessions}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SubjectPopularity;
