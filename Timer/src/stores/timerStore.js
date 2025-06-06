import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useTimerStore = defineStore('timer', () => {
  // 计时器列表
  const timers = ref([
    {
      id: 'default',
      name: '默认计时器',
      duration: 0,
      remaining: 0,
      isRunning: false,
      isCountdown: false,
      countdownDuration: 0,
    }
  ]);
  
  // 当前活动计时器
  const activeTimerId = ref('default');
  
  // 获取当前活动计时器
  const activeTimer = ref(timers.value[0]);
  
  // 计时器计时器
  let timerInterval = null;
  
  // 设置活动计时器
  function setActiveTimer(id) {
    const timer = timers.value.find(t => t.id === id);
    if (timer) {
      activeTimerId.value = id;
      activeTimer.value = timer;
    }
  }
  
  // 添加新计时器
  function addNewTimer() {
    const newTimer = {
      id: `timer-${Date.now()}`,
      name: `计时器 ${timers.value.length + 1}`,
      duration: 0,
      remaining: 0,
      isRunning: false,
      isCountdown: false,
      countdownDuration: 0,
    };
    
    timers.value.push(newTimer);
    setActiveTimer(newTimer.id);
  }
  
  // 删除计时器
  function deleteTimer(id) {
    if (timers.value.length <= 1) {
      return; // 至少保留一个计时器
    }
    
    const index = timers.value.findIndex(t => t.id === id);
    if (index !== -1) {
      timers.value.splice(index, 1);
      
      // 如果删除的是当前活动计时器，切换到第一个计时器
      if (id === activeTimerId.value) {
        setActiveTimer(timers.value[0].id);
      }
    }
  }
  
  // 启动计时器
  function startTimer() {
    if (activeTimer.value.isRunning) return;
    
    activeTimer.value.isRunning = true;
    
    timerInterval = setInterval(() => {
      if (activeTimer.value.isCountdown) {
        // 倒计时模式
        if (activeTimer.value.remaining > 0) {
          activeTimer.value.remaining--;
          
          // 倒计时结束
          if (activeTimer.value.remaining === 0) {
            clearInterval(timerInterval);
            activeTimer.value.isRunning = false;
            // 播放提示音
            playNotificationSound();
          }
        }
      } else {
        // 正计时模式
        activeTimer.value.duration++;
      }
    }, 1000);
  }
  
  // 暂停计时器
  function pauseTimer() {
    if (!activeTimer.value.isRunning) return;
    
    activeTimer.value.isRunning = false;
    clearInterval(timerInterval);
  }
  
  // 重置计时器
  function resetTimer() {
    activeTimer.value.isRunning = false;
    clearInterval(timerInterval);
    
    if (activeTimer.value.isCountdown) {
      activeTimer.value.remaining = activeTimer.value.countdownDuration;
    } else {
      activeTimer.value.duration = 0;
    }
  }
  
  // 设置倒计时时间
  function setCountdown(minutes) {
    activeTimer.value.isCountdown = true;
    activeTimer.value.countdownDuration = minutes * 60;
    activeTimer.value.remaining = minutes * 60;
    activeTimer.value.duration = 0;
  }
  
  // 设置快速计时器
  function setQuickTimer(minutes) {
    setCountdown(minutes);
  }
  
  // 播放提示音
  function playNotificationSound() {
    const audio = new Audio('https://nocode.meituan.com/photo/search?keyword=notification&width=1&height=1');
    audio.play().catch(error => {
      console.log('音频播放失败:', error);
    });
  }
  
  // 初始化
  function init() {
    // 从本地存储加载计时器数据
    const savedTimers = localStorage.getItem('timers');
    if (savedTimers) {
      try {
        const parsedTimers = JSON.parse(savedTimers);
        timers.value = parsedTimers;
        setActiveTimer(activeTimerId.value);
      } catch (error) {
        console.error('加载计时器数据失败:', error);
      }
    }
    
    // 保存计时器数据到本地存储
    setInterval(() => {
      localStorage.setItem('timers', JSON.stringify(timers.value));
    }, 5000);
  }
  
  // 初始化
  init();
  
  return {
    timers,
    activeTimer,
    setActiveTimer,
    addNewTimer,
    deleteTimer,
    startTimer,
    pauseTimer,
    resetTimer,
    setCountdown,
    setQuickTimer,
  };
});
