<script setup>
import { computed } from 'vue';

const props = defineProps({
  message: {
    type: String,
    required: true,
  },
  show: Boolean,
  type: { type: String, required: true },
});

const isError = computed(() => {
  return props.type === 'error';
});
</script>
<template>
  <div
    :class="[
      isError ? 'bg-red-600' : 'bg-green-500',
      show ? 'opacity-100' : 'opacity-0',
    ]"
    class="text-white text-center p-3 uppercase font-bold mb-3 rounded-md transition-opacity duration-1000 fixed w-11/12 sm:w-9/12 md:w-6/12 m-auto left-0 right-0 bottom-4"
  >
    {{ message }}
  </div>
</template>
