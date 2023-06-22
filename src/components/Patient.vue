<script setup>
const props = defineProps({
  patient: {
    type: {
      id: String,
      petName: String,
      owner: String,
      releaseDate: String,
      email: String,
      symptoms: String,
    },
    required: true,
  },
});

defineEmits(['edit']);
</script>

<template>
  <div class="mx-5 my-10 bg-white shadow-md px-5 py-10 rounded-xl">
    <p class="font-bold mb-3 text-gray-700 uppercase">
      ID:
      <span class="font-normal normal-case">{{ patient.id }}</span>
    </p>

    <p class="font-bold mb-3 text-gray-700 uppercase">
      Name:
      <span class="font-normal normal-case">{{ patient.petName }}</span>
    </p>

    <p class="font-bold mb-3 text-gray-700 uppercase">
      Owner:
      <span class="font-normal normal-case">{{ patient.owner }} </span>
    </p>

    <p class="font-bold mb-3 text-gray-700 uppercase">
      Email:
      <span class="font-normal normal-case">{{ patient.email }} </span>
    </p>

    <p class="font-bold mb-3 text-gray-700 uppercase">
      Release date:
      <span class="font-normal normal-case">{{ patient.releaseDate }}</span>
    </p>

    <p class="font-bold mb-3 text-gray-700 uppercase">
      Symptoms:
      <span class="font-normal normal-case">{{ patient.symptoms }} </span>
    </p>

    <div class="grid md:grid-cols-2 gap-5 mt-10">
      <button
        type="button"
        class="block w-full py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white font-bold uppercase rounded-lg"
        @click="$emit('edit', id)"
      >
        Edit
      </button>

      <button
        type="button"
        class="block w-full py-2 px-10 bg-red-600 hover:bg-red-700 text-white font-bold uppercase rounded-lg"
      >
        Delete
      </button>
    </div>
  </div>
</template>
