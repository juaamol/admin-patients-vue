<script setup>
import { computed } from 'vue';

const props = defineProps({
  message: {
    type: String,
    required: true,
  },
  type: { type: String, required: true },
});

const isError = computed(() => {
  return props.type === 'error';
});
</script>
<template>
  <div
    :class="[isError ? 'bg-red-600' : 'bg-green-500']"
    class="text-white text-center p-3 uppercase font-bold mb-3 rounded-md"
  >
    {{ message }}
  </div>
</template>
