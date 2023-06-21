<script setup>
import { ref, reactive } from 'vue';
import { uid } from 'uid';
import Header from './components/Header.vue';
import Form from './components/Form.vue';
import Patient from './components/Patient.vue';

const patients = ref([]);

const patient = reactive({
  id: null,
  petName: '',
  owner: '',
  email: '',
  symptoms: '',
  releaseDate: '',
});

const savePatient = () => {
  patients.value.push({ ...patient, id: uid() });
  resetForm();
};

const resetForm = () => {
  patient.petName = '';
  patient.owner = '';
  patient.email = '';
  patient.symptoms = '';
  patient.releaseDate = '';
};
</script>

<template>
  <div class="container mx-auto mt-20">
    <Header></Header>
    <div class="mt-12 md:flex">
      <Form
        v-model:petName="patient.petName"
        v-model:owner="patient.owner"
        v-model:email="patient.email"
        v-model:releaseDate="patient.releaseDate"
        v-model:symptoms="patient.symptoms"
        @save-patient="savePatient"
      ></Form>
      <div class="md:w-1/2 md:h-screen overflow-y-scroll">
        <h3 class="font-black text-3xl text-center">Manage your patients</h3>

        <div v-if="patients.length > 0">
          <p class="text-lg mt-5 text-center mb-10">
            Patients
            <span class="text-indigo-600 font-bold">Information</span>
          </p>
          <Patient
            v-for="patient of patients"
            :key="patient.id"
            :id="patient.id"
            :petName="patient.petName"
            :owner="patient.owner"
            :email="patient.email"
            :releaseDate="patient.releaseDate"
            :symptoms="patient.symptoms"
          />
        </div>
        <p v-else class="text-lg mt-5 text-center mb-10">No patients</p>
      </div>
    </div>
  </div>
</template>
