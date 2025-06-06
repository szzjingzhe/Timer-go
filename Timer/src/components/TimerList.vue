<template>
  <div class="bg-white rounded-lg shadow">
    <div v-if="timers.length === 0" class="p-4 text-center text-gray-500">
      暂无计时器
    </div>
    
    <div v-else>
      <div 
        v-for="timer in timers" 
        :key="timer.id"
        class="flex items-center justify-between p-4 border-b border-gray-100"
        :class="{ 'bg-blue-50': timer.id === activeTimerId }"
      >
        <div class="flex-1">
          <div class="font-medium text-gray-800">{{ timer.name }}</div>
          <div class="text-sm text-gray-500">
            {{ timer.isCountdown ? '倒计时' : '正计时' }} - 
            {{ timer.isCountdown ? formatTime(timer.remaining) : formatTime(timer.duration) }}
          </div>
        </div>
        
        <div class="flex space-x-2">
          <van-button 
            size="small" 
            type="primary" 
            @click="$emit('select', timer.id)"
          >
            选择
          </van-button>
          <van-button 
            size="small" 
            type="danger" 
            @click="$emit('delete', timer.id)"
          >
            删除
          </van-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    timers: {
      type: Array,
      required: true,
    },
    activeTimerId: {
      type: String,
      required: true,
    },
  },
  methods: {
    formatTime(seconds) {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    },
  },
};
</script>
