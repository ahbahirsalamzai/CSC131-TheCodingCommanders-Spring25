import React from "react";

const UserTable = ({ title, users, onDelete }) => {
    return (
        <div className="w-[1149px] rounded-[12px] border border-[#E3E8EF] p-5 space-y-6 bg-white shadow-sm">
            <h3 className="text-lg font-medium text-gray-800 mb-4">{title}</h3>
            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 text-sm">
                    <thead className="bg-gray-100">
                        <tr className="text-left text-gray-600">
                            <th className="p-3 border">Name</th>
                            <th className="p-3 border">Last Session</th>
                            <th className="p-3 border">Sessions</th>
                            <th className="p-3 border">Creation Date</th>
                            <th className="p-3 border">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="p-4 text-center text-gray-500">
                                    No users found.
                                </td>
                            </tr>
                        ) : (
                            users.map((user) => (
                                <tr key={user._id} className="hover:bg-gray-50">
                                    <td className="p-3 border">{user.username}</td>
                                    <td className="p-3 border">{user.lastSession || "N/A"}</td>
                                    <td className="p-3 border">{user.sessionsCount || 0}</td>
                                    <td className="p-3 border">
                                        {new Date(user.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="p-3 border">
                                        <button
                                            onClick={() => onDelete(user._id)}
                                            className="bg-[#FF5A8A] text-white px-6 py-2 rounded-md text-sm hover:opacity-90 transition"
                                        >
                                            Delete
                                        </button>

                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserTable;
