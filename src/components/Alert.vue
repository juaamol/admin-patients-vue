<script setup>
const props = defineProps({
  message: {
    type: String,
    required: true,
  },
  type: { type: String, required: true },
});
</script>
<template>
  <div
    v-if="type === 'success'"
    class="text-white text-center p-3 uppercase font-bold mb-3 rounded-md bg-green-600"
  >
    {{ message }}
  </div>
  <div
    v-if="type === 'error'"
    class="text-white text-center p-3 uppercase font-bold mb-3 rounded-md bg-red-600"
  >
    {{ message }}
  </div>
</template>
