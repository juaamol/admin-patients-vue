<script setup>
import { computed, reactive, ref, watch } from 'vue';
import { isEmail, isEmpty } from '../validators/form/validators';
import { petFormErrors as errors } from '../validators/form/error-messages';
import Alert from './Alert.vue';

const props = defineProps({
  petName: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  symptoms: {
    type: String,
    required: true,
  },
  releaseDate: {
    type: String,
    required: true,
  },
});

const emit = defineEmits([
  'update:releaseDate',
  'update:petName',
  'update:owner',
  'update:email',
  'update:symptoms',
  'save-patient',
]);

const isVisitedField = reactive({
  petName: false,
  owner: false,
  email: false,
  releaseDate: false,
});

const isFieldValid = reactive({
  petName: false,
  owner: false,
  email: false,
  releaseDate: false,
});

const isFormSubmitted = ref(false);
const isFormValid = computed(() => {
  return !Object.values(isFieldValid).some((value) => !value);
});

const validateForm = () => {
  for (const key of Object.keys(isVisitedField)) {
    isVisitedField[key] = true;
  }

  isFormSubmitted.value = true;

  if (isFormValid.value) {
    emit('save-patient');
  }
};

watch(
  () => props.petName,
  (value) => {
    isFieldValid.petName = !isEmpty(value);
    isVisitedField.petName = true;
  },
);

watch(
  () => props.owner,
  (value) => {
    isFieldValid.owner = !isEmpty(value);
    isVisitedField.owner = true;
  },
);

watch(
  () => props.email,
  (value) => {
    isFieldValid.email = isEmail(value);
    isVisitedField.email = true;
  },
);

watch(
  () => props.releaseDate,
  (value) => {
    isFieldValid.releaseDate = !isEmpty(value);
    isVisitedField.releaseDate = true;
  },
);

watch(props, () => {
  isFormSubmitted.value = false;
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
      v-if="isFormValid && isFormSubmitted"
      type="success"
      message="Form data saved successfully"
    />
    <Alert
      v-if="!isFormValid && isFormSubmitted"
      type="error"
      message="Some fields are missing"
    />
    <form
      class="bg-white shadow-md rounder-lg py-10 px-5 mb-10"
      @submit.prevent="validateForm"
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
          :value="petName"
          @input="$emit('update:petName', $event.target.value)"
        />
        <p
          v-if="!isFieldValid.petName && isVisitedField.petName"
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
          :value="owner"
          @input="$emit('update:owner', $event.target.value)"
        />
        <p
          v-if="!isFieldValid.owner && isVisitedField.owner"
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
          :value="email"
          @input="$emit('update:email', $event.target.value)"
        />
        <p
          v-if="!isFieldValid.email && isVisitedField.email"
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
          :value="releaseDate"
          @input="$emit('update:releaseDate', $event.target.value)"
        />
        <p
          v-if="!isFieldValid.releaseDate && isVisitedField.releaseDate"
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
          :value="symptoms"
          @input="$emit('update:symptoms', $event.target.value)"
        ></textarea>
      </div>
      <input
        type="submit"
        class="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
      />
    </form>
  </div>
</template>
