import React, { useState } from 'react';
import useTimerStore from '../stores/useTimerStore';
import TimerControl from '../components/TimerControl';
import TimerList from '../components/TimerList';
import QuickTimerTemplates from '../components/QuickTimerTemplates';
import TimerSettingsDialog from '../components/TimerSettingsDialog';
import CustomTimeDialog from '../components/CustomTimeDialog';

const Index = () => {
  const {
    timers,
    activeTimerId,
    startTimer,
    pauseTimer,
    resetTimer,
    setQuickTimer,
    setActiveTimer,
    addNewTimer,
    deleteTimer,
    updateTimerSettings,
  } = useTimerStore();

  const activeTimer = timers.find(t => t.id === activeTimerId);
  const [gifUrl, setGifUrl] = useState('https://nocode.meituan.com/photo/search?keyword=cat&width=400&height=300');

  const handleGifUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setGifUrl(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleToggleCountMode = () => {
    if (activeTimer) {
      updateTimerSettings({
        isCountdown: !activeTimer.isCountdown,
        remaining: activeTimer.isCountdown ? 0 : activeTimer.countdownDuration,
        duration: 0,
      });
    }
  };

  return (
    <div className="min-h-screen bg-pink-50 p-4">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-pink-600" style={{ fontFamily: 'Microsoft YaHei' }}>计时器</h1>
            <div className="flex gap-2">
              <TimerSettingsDialog />
              <CustomTimeDialog />
            </div>
          </div>

          <div className="flex justify-center mb-4">
            <div className="relative w-64 h-64">
              <TimerControl timer={activeTimer} />
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                <img
                  src={gifUrl}
                  alt="计时器动图"
                  className="w-32 h-32 object-cover rounded-full"
                  style={{
                    animation: activeTimer?.isRunning ? 'spin 2s linear infinite' : 'none',
                  }}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-center mb-4">
            <label className="px-4 py-2 bg-pink-300 hover:bg-pink-400 text-white rounded-lg cursor-pointer" style={{ fontFamily: 'Microsoft YaHei' }}>
              上传动图
              <input
                type="file"
                accept="image/gif"
                className="hidden"
                onChange={handleGifUpload}
              />
            </label>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <button
              className={`px-4 py-2 rounded-lg ${
                activeTimer?.isRunning
                  ? 'bg-pink-300 cursor-not-allowed'
                  : 'bg-pink-300 hover:bg-pink-400 text-white'
              }`}
              onClick={startTimer}
              disabled={activeTimer?.isRunning}
              style={{ fontFamily: 'Microsoft YaHei' }}
            >
              启动
            </button>
            <button
              className={`px-4 py-2 rounded-lg ${
                !activeTimer?.isRunning
                  ? 'bg-pink-300 cursor-not-allowed'
                  : 'bg-pink-300 hover:bg-pink-400 text-white'
              }`}
              onClick={pauseTimer}
              disabled={!activeTimer?.isRunning}
              style={{ fontFamily: 'Microsoft YaHei' }}
            >
              暂停
            </button>
            <button
              className="px-4 py-2 bg-pink-300 hover:bg-pink-400 text-white rounded-lg"
              onClick={resetTimer}
              style={{ fontFamily: 'Microsoft YaHei' }}
            >
              重置
            </button>
          </div>

          <div className="mt-4">
            <button
              className="w-full px-4 py-2 bg-pink-300 hover:bg-pink-400 text-white rounded-lg"
              onClick={handleToggleCountMode}
              style={{ fontFamily: 'Microsoft YaHei' }}
            >
              {activeTimer?.isCountdown ? '切换为正计时' : '切换为倒计时'}
            </button>
          </div>
        </div>

        <QuickTimerTemplates onSelect={setQuickTimer} />

        <div className="mt-6">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-medium text-pink-600" style={{ fontFamily: 'Microsoft YaHei' }}>我的计时器</h2>
            <button
              className="px-3 py-1 text-sm text-white bg-pink-300 hover:bg-pink-400 rounded"
              onClick={addNewTimer}
              style={{ fontFamily: 'Microsoft YaHei' }}
            >
              添加计时器
            </button>
          </div>

          <TimerList
            timers={timers}
            activeTimerId={activeTimerId}
            onSelect={setActiveTimer}
            onDelete={deleteTimer}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
