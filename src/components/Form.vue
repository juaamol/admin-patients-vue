<script setup>
import { ref, watch } from 'vue';
import Alert from './Alert.vue';

const props = defineProps({
  errors: Object,
  touched: Object,
  patient: Object,
  isValid: Boolean,
});

const emit = defineEmits([
  'releaseDate',
  'petName',
  'owner',
  'email',
  'symptoms',
  'submit',
]);

const isSubmitted = ref(false);

watch(isSubmitted, (_, _2, onCleanup) => {
  const timeout = setTimeout(() => {
    isSubmitted.value = false;
  }, 3000);

  onCleanup(() => clearTimeout(timeout));
});
</script>

<template>
  <div class="md:w-1/2">
    <h2 class="font-black text-3xl text-center">Patients monitoring</h2>
    <p class="text-lg mt-5 text-center mb-10">
      Add patients
      <span class="text-indigo-600 font-bold">Manage</span>
    </p>
    <Alert
      :show="isValid && isSubmitted"
      type="success"
      message="Form data saved successfully"
    />
    <Alert
      :show="!isValid && isSubmitted"
      type="error"
      message="Some fields are missing"
    />
    <form
      class="bg-white shadow-md rounder-lg py-10 px-5 mb-10 rounded-xl"
      @submit.prevent="$emit('submit')"
    >
      <div class="mb-5">
        <label for="petName" class="block text-gray-700 uppercase font-bold">
          Pet name
        </label>
        <input
          id="petName"
          type="text"
          placeholder="Pet name"
          class="border-2 w-full p-2 mt-2 placeholder-gray-400 rounder-md"
          :value="patient.petName"
          @input="$emit('petName', $event)"
        />
        <p
          v-if="errors.petName && touched.petName"
          class="text-sm mb-0 mt-1 text-red-500"
        >
          {{ errors.petName }}
        </p>
      </div>
      <div class="mb-5">
        <label for="owner" class="block text-gray-700 uppercase font-bold">
          Owner
        </label>
        <input
          id="owner"
          type="text"
          placeholder="Owner's name"
          class="border-2 w-full p-2 mt-2 placeholder-gray-400 rounder-md"
          :value="patient.owner"
          @input="$emit('owner', $event)"
        />
        <p
          v-if="errors.owner && touched.owner"
          class="text-sm mb-0 mt-1 text-red-500"
        >
          {{ errors.owner }}
        </p>
      </div>
      <div class="mb-5">
        <label for="email" class="block text-gray-700 uppercase font-bold">
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="Email"
          class="border-2 w-full p-2 mt-2 placeholder-gray-400 rounder-md"
          :value="patient.email"
          @input="$emit('email', $event)"
        />
        <p
          v-if="errors.email && touched.email"
          class="text-sm mb-0 mt-1 text-red-500"
        >
          {{ errors.email }}
        </p>
      </div>
      <div class="mb-5">
        <label for="release" class="block text-gray-700 uppercase font-bold">
          Release date
        </label>
        <input
          id="releaseDate"
          type="date"
          class="border-2 w-full p-2 mt-2 placeholder-gray-400 rounder-md"
          :value="patient.releaseDate"
          @input="$emit('releaseDate', $event)"
        />
        <p
          v-if="errors.releaseDate && touched.releaseDate"
          class="text-sm mb-0 mt-1 text-red-500"
        >
          {{ errors.releaseDate }}
        </p>
      </div>
      <div class="mb-5">
        <label for="symptoms" class="block text-gray-700 uppercase font-bold">
          Symptoms
        </label>
        <textarea
          id="symptoms"
          placeholder="Describe the symptoms of the patient"
          class="border-2 w-full p-2 mt-2 placeholder-gray-400 rounder-md"
          :value="patient.symptoms"
          @input="$emit('symptoms', $event)"
        ></textarea>
      </div>
      <input
        type="submit"
        class="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
      />
    </form>
  </div>
</template>
