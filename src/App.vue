<script setup>
import { ref, reactive } from 'vue';
import { uid } from 'uid';
import Header from './components/Header.vue';
import Form from './components/Form.vue';
import Patient from './components/Patient.vue';
import { defaultPatient } from './data/app/patient';

const patients = ref([]);
const patient = reactive({ ...defaultPatient });

const savePatient = () => {
  if (patient.id === null) {
    patients.value.push({ ...patient, id: uid() });
  } else {
    const { id } = patient;
    const patientToSave = patients.value.find((patient) => patient.id === id);
    Object.assign(patientToSave, patient);
  }

  resetForm();
};

const editPatient = (id) => {
  const patientToEdit = patients.value.find((patient) => patient.id === id);

  if (patientToEdit) {
    Object.assign(patient, patientToEdit);
  }
};

const resetForm = () => {
  Object.assign(patient, defaultPatient);
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
            :patient="patient"
            @edit="editPatient"
          />
        </div>
        <p v-else class="text-lg mt-5 text-center mb-10">No patients</p>
      </div>
    </div>
  </div>
</template>
