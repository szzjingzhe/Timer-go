import { create } from 'zustand';

const useTimerStore = create((set, get) => ({
  timers: [{
    id: 'default',
    name: '默认计时器',
    description: '',
    duration: 0,
    remaining: 0,
    isRunning: false,
    isCountdown: false,
    countdownDuration: 0,
    ringtone: 'default',
  }],
  activeTimerId: 'default',
  availableRingtones: [
    { id: 'default', name: '默认铃声' },
    { id: 'bell', name: '铃声' },
    { id: 'chime', name: '钟声' },
    { id: 'alarm', name: '警报' },
  ],

  setActiveTimer: (id) => {
    set({ activeTimerId: id });
  },

  addNewTimer: () => {
    const newTimer = {
      id: `timer-${Date.now()}`,
      name: `计时器 ${get().timers.length + 1}`,
      description: '',
      duration: 0,
      remaining: 0,
      isRunning: false,
      isCountdown: false,
      countdownDuration: 0,
      ringtone: 'default',
    };

    set(state => ({
      timers: [...state.timers, newTimer],
      activeTimerId: newTimer.id,
    }));
  },

  deleteTimer: (id) => {
    set(state => {
      if (state.timers.length <= 1) return state;

      const newTimers = state.timers.filter(t => t.id !== id);
      return {
        timers: newTimers,
        activeTimerId: id === state.activeTimerId ? newTimers[0].id : state.activeTimerId,
      };
    });
  },

  startTimer: () => {
    const state = get();
    const timer = state.timers.find(t => t.id === state.activeTimerId);
    if (!timer || timer.isRunning) return;

    set(state => ({
      timers: state.timers.map(t =>
        t.id === state.activeTimerId ? { ...t, isRunning: true } : t
      ),
    }));

    const interval = setInterval(() => {
      const currentState = get();
      const currentTimer = currentState.timers.find(t => t.id === currentState.activeTimerId);

      if (!currentTimer.isRunning) {
        clearInterval(interval);
        return;
      }

      set(state => ({
        timers: state.timers.map(t => {
          if (t.id !== state.activeTimerId) return t;

          if (t.isCountdown) {
            const remaining = Math.max(0, t.remaining - 1);
            if (remaining === 0) {
              clearInterval(interval);
              playNotificationSound(t.ringtone);
              return { ...t, remaining, isRunning: false };
            }
            return { ...t, remaining };
          } else {
            return { ...t, duration: t.duration + 1 };
          }
        }),
      }));
    }, 1000);
  },

  pauseTimer: () => {
    set(state => ({
      timers: state.timers.map(t =>
        t.id === state.activeTimerId ? { ...t, isRunning: false } : t
      ),
    }));
  },

  resetTimer: () => {
    set(state => ({
      timers: state.timers.map(t => {
        if (t.id !== state.activeTimerId) return t;
        return {
          ...t,
          isRunning: false,
          remaining: t.isCountdown ? t.countdownDuration : 0,
          duration: 0,
        };
      }),
    }));
  },

  setQuickTimer: (minutes) => {
    set(state => ({
      timers: state.timers.map(t => {
        if (t.id !== state.activeTimerId) return t;
        return {
          ...t,
          isCountdown: true,
          countdownDuration: minutes * 60,
          remaining: minutes * 60,
          duration: 0,
          isRunning: false,
        };
      }),
    }));
  },

  updateTimerSettings: (settings) => {
    set(state => ({
      timers: state.timers.map(t =>
        t.id === state.activeTimerId ? { ...t, ...settings } : t
      ),
    }));
  },
}));

const playNotificationSound = (ringtone) => {
  const audio = new Audio(`https://nocode.meituan.com/photo/search?keyword=${ringtone}&width=1&height=1`);
  audio.play().catch(error => {
    console.log('音频播放失败:', error);
  });
};

export default useTimerStore;
