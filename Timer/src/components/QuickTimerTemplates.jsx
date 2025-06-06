import React from 'react';

const QuickTimerTemplates = ({ onSelect }) => {
  const templates = [
    { minutes: 1, label: '1分钟' },
    { minutes: 5, label: '5分钟' },
    { minutes: 10, label: '10分钟' },
    { minutes: 15, label: '15分钟' },
    { minutes: 30, label: '30分钟' },
    { minutes: 60, label: '1小时' },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="text-lg font-medium text-pink-600 mb-3" style={{ fontFamily: 'Microsoft YaHei' }}>常用计时</h3>

      <div className="grid grid-cols-3 gap-3">
        {templates.map(template => (
          <button
            key={template.minutes}
            className="px-3 py-2 text-sm bg-pink-50 hover:bg-pink-100 rounded text-pink-600"
            onClick={() => onSelect(template.minutes)}
            style={{ fontFamily: 'Microsoft YaHei' }}
          >
            {template.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickTimerTemplates;
