<template>
  <div class="relative w-64 h-64">
    <!-- 计时器背景圆环 -->
    <svg class="w-full h-full" viewBox="0 0 100 100">
      <circle
        cx="50"
        cy="50"
        r="45"
        fill="none"
        stroke="#e5e7eb"
        stroke-width="8"
      />
      <circle
        cx="50"
        cy="50"
        r="45"
        fill="none"
        stroke="#409EFF"
        stroke-width="8"
        stroke-dasharray="283"
        :stroke-dashoffset="progressOffset"
        stroke-linecap="round"
        transform="rotate(-90 50 50)"
      />
    </svg>
    
    <!-- 计时器显示 -->
    <div class="absolute inset-0 flex flex-col items-center justify-center">
      <div class="text-4xl font-bold text-gray-800 mb-2">
        {{ formattedTime }}
      </div>
      <div v-if="timer.isCountdown" class="text-sm text-gray-500">
        倒计时
      </div>
      <div v-else class="text-sm text-gray-500">
        正计时
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    timer: {
      type: Object,
      required: true,
    },
  },
  computed: {
    formattedTime() {
      if (this.timer.isCountdown) {
        // 倒计时显示
        const minutes = Math.floor(this.timer.remaining / 60);
        const seconds = this.timer.remaining % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      } else {
        // 正计时显示
        const hours = Math.floor(this.timer.duration / 3600);
        const minutes = Math.floor((this.timer.duration % 3600) / 60);
        const seconds = this.timer.duration % 60;
        
        if (hours > 0) {
          return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        } else {
          return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
      }
    },
    progressOffset() {
      if (!this.timer.isCountdown) return 0;
      
      const total = this.timer.countdownDuration;
      const remaining = this.timer.remaining;
      const progress = (total - remaining) / total;
      return 283 * (1 - progress);
    },
  },
};
</script>
