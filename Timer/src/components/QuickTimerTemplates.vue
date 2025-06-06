<template>
  <div class="bg-white rounded-lg shadow p-4">
    <h3 class="text-lg font-medium text-gray-700 mb-3">常用计时</h3>
    
    <div class="grid grid-cols-3 gap-3">
      <van-button 
        v-for="template in templates" 
        :key="template.minutes"
        type="default"
        size="small"
        @click="$emit('select', template.minutes)"
      >
        {{ template.label }}
      </van-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      templates: [
        { minutes: 1, label: '1分钟' },
        { minutes: 5, label: '5分钟' },
        { minutes: 10, label: '10分钟' },
        { minutes: 15, label: '15分钟' },
        { minutes: 30, label: '30分钟' },
        { minutes: 60, label: '1小时' },
      ],
    };
  },
};
</script>
