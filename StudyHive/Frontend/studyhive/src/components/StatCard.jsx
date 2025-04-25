import React from 'react';

const StatCard = ({ title, count, color }) => {
  const bgColor = color === 'orange' ? 'bg-orange-50' : 'bg-lime-50';
  return (
    <div className={`flex-1 p-6 rounded-2xl ${bgColor} flex items-center gap-4`}>
      <div className="text-3xl font-bold text-gray-800">{count}</div>
      <div className="text-sm text-gray-600">{title}</div>
    </div>
  );
};

export default StatCard;
