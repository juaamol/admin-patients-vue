<script setup>
import { computed, reactive, ref, watch } from 'vue';
import { isEmail, isEmpty } from '../validators/form/validators';
import { petFormErrors as errors } from '../validators/form/error-messages';
import Alert from './Alert.vue';

const props = defineProps({
  petName: String,
  owner: String,
  email: String,
  releaseDate: String,
  symptoms: String,
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
const isFormValid = ref(false);

const validateForm = () => {
  isFormSubmitted.value = true;
  isFormValid.value = !Object.values(isFieldValid).some((value) => !value);

  for (const key of Object.keys(isVisitedField)) {
    isVisitedField[key] = !isFormValid.value;
  }

  if (isFormValid.value) {
    for (const key of Object.keys(isFieldValid)) {
      isFieldValid[key] = false;
    }

    emit('save-patient');
  }
};

const updatePetName = (event) => {
  isVisitedField.petName = true;
  isFieldValid.petName = !isEmpty(event.target.value);
  emit('update:petName', event.target.value);
};

const updateOwner = (event) => {
  isVisitedField.owner = true;
  isFieldValid.owner = !isEmpty(event.target.value);
  emit('update:owner', event.target.value);
};

const updateEmail = (event) => {
  isVisitedField.email = true;
  isFieldValid.email = isEmail(event.target.value);
  emit('update:email', event.target.value);
};

const updateReleaseDate = (event) => {
  isVisitedField.releaseDate = true;
  isFieldValid.releaseDate = !isEmpty(event.target.value);
  emit('update:releaseDate', event.target.value);
};

const updateSymptoms = (event) => {
  isVisitedField.symptoms = true;
  emit('update:symptoms', event.target.value);
};

watch(isFormSubmitted, (_, _2, onCleanup) => {
  const timeout = setTimeout(() => {
    isFormSubmitted.value = false;
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
      :show="isFormValid && isFormSubmitted"
      type="success"
      message="Form data saved successfully"
    />
    <Alert
      :show="!isFormValid && isFormSubmitted"
      type="error"
      message="Some fields are missing"
    />
    <form
      class="bg-white shadow-md rounder-lg py-10 px-5 mb-10 rounded-xl"
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
          @input="updatePetName"
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
          @input="updateOwner"
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
          @input="updateEmail"
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
          @input="updateReleaseDate"
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
          @input="updateSymptoms"
        ></textarea>
      </div>
      <input
        type="submit"
        class="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
      />
    </form>
  </div>
</template>
