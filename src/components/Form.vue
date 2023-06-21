<script setup>
import { computed, reactive, ref, watch } from 'vue';
import { isEmail, isEmpty } from '../validators/form/validators';
import { petFormErrors as errors } from '../validators/form/error-messages';
import Alert from './Alert.vue';

const patient = reactive({
  petName: '',
  owner: '',
  email: '',
  symptoms: '',
  releaseDate: '',
});

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

const isFormValid = computed(() => {
  return !Object.values(isFieldValid).some((value) => !value);
});

const isFormSubmitted = ref(false);

const validateForm = () => {
  for (const key of Object.keys(isVisitedField)) {
    isVisitedField[key] = true;
  }

  isFormSubmitted.value = true;
};

const validateField = (e) => {
  const field = e.target;

  switch (field.id) {
    case 'petName':
      isFieldValid.petName = !isEmpty(field.value);
      break;
    case 'owner':
      isFieldValid.owner = !isEmpty(field.value);
      break;
    case 'email':
      isFieldValid.email = isEmail(field.value);
      break;
    case 'releaseDate':
      isFieldValid.releaseDate = !isEmpty(field.value);
      break;
    default:
      break;
  }
};

const interactWithField = (e) => {
  isVisitedField[e.target.id] = true;

  validateField(e);
};

watch(patient, () => {
  isFormSubmitted.value = false;
});
</script>

<template>
  <div class="md:w-1/2">
    <h2 class="font-black text-3xl text-center">Patient monitoring</h2>
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
          v-model="patient.petName"
          @blur="interactWithField"
          @input="interactWithField"
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
          v-model="patient.owner"
          @blur="interactWithField"
          @input="interactWithField"
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
          v-model="patient.email"
          @blur="interactWithField"
          @input="interactWithField"
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
          v-model="patient.releaseDate"
          @blur="interactWithField"
          @input="interactWithField"
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
          v-model="patient.symptoms"
        ></textarea>
      </div>
      <input
        type="submit"
        class="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
      />
    </form>
  </div>
</template>
