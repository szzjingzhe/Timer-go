import React from 'react';
import TimerSettingsDialog from './TimerSettingsDialog';

const TimerList = ({ timers, activeTimerId, onSelect, onDelete }) => {
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white rounded-lg shadow">
      {timers.length === 0 ? (
        <div className="p-4 text-center text-pink-600" style={{ fontFamily: 'Microsoft YaHei' }}>
          暂无计时器
        </div>
      ) : (
        timers.map(timer => (
          <div
            key={timer.id}
            className={`flex items-center justify-between p-4 border-b border-gray-100 ${
              timer.id === activeTimerId ? 'bg-pink-50' : ''
            }`}
          >
            <div className="flex-1">
              <div className="font-medium text-pink-600" style={{ fontFamily: 'Microsoft YaHei' }}>{timer.name}</div>
              {timer.description && (
                <div className="text-sm text-pink-600 mt-1" style={{ fontFamily: 'Microsoft YaHei' }}>{timer.description}</div>
              )}
              <div className="text-sm text-pink-600" style={{ fontFamily: 'Microsoft YaHei' }}>
                {timer.isCountdown ? '倒计时' : '正计时'} -
                {timer.isCountdown ? formatTime(timer.remaining) : formatTime(timer.duration)}
              </div>
            </div>

            <div className="flex space-x-2">
              <button
                className="px-3 py-1 text-sm text-white bg-pink-300 hover:bg-pink-400 rounded"
                onClick={() => onSelect(timer.id)}
                style={{ fontFamily: 'Microsoft YaHei' }}
              >
                选择
              </button>
              <TimerSettingsDialog />
              <button
                className="px-3 py-1 text-sm text-white bg-pink-300 hover:bg-pink-400 rounded"
                onClick={() => onDelete(timer.id)}
                style={{ fontFamily: 'Microsoft YaHei' }}
              >
                删除
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TimerList;
