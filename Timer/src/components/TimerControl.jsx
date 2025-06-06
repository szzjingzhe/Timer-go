import React from 'react';

const TimerControl = ({ timer }) => {
  const formatTime = () => {
    if (timer.isCountdown) {
      const minutes = Math.floor(timer.remaining / 60);
      const seconds = timer.remaining % 60;
      return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    } else {
      const hours = Math.floor(timer.duration / 3600);
      const minutes = Math.floor((timer.duration % 3600) / 60);
      const seconds = timer.duration % 60;

      if (hours > 0) {
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      } else {
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      }
    }
  };

  const progressOffset = () => {
    if (!timer.isCountdown) return 0;
    const total = timer.countdownDuration;
    const remaining = timer.remaining;
    const progress = (total - remaining) / total;
    return 283 * (1 - progress);
  };

  return (
    <div className="relative w-64 h-64">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="#fbcfe8"
          strokeWidth="8"
        />
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="#ec4899"
          strokeWidth="8"
          strokeDasharray="283"
          strokeDashoffset={progressOffset()}
          strokeLinecap="round"
          transform="rotate(-90 50 50)"
        />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        <div className="text-4xl font-bold text-pink-600 mb-2" style={{ fontFamily: 'Microsoft YaHei' }}>
          {formatTime()}
        </div>
        <div className="text-sm text-pink-600" style={{ fontFamily: 'Microsoft YaHei' }}>
          {timer.isCountdown ? '倒计时' : '正计时'}
        </div>
      </div>
    </div>
  );
};

export default TimerControl;
