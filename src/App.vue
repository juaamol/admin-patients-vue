<script setup>
import Header from './components/Header.vue';
import Form from './components/Form.vue';
import { ref, reactive } from 'vue';

const patients = ref([]);

const patient = reactive({
  petName: '',
  owner: '',
  email: '',
  symptoms: '',
  releaseDate: '',
});

const savePatient = () => {
  patients.value.push(patient);
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
      <div class="md:1/2 md:h-screen overflow-y-scroll">
        <h3 class="font-black text-3xl text-center">Manage your patients</h3>

        <div v-if="patients.length > 0"></div>
        <p v-else class="text-lg mt-5 text-center mb-10">No patients</p>
      </div>
    </div>
  </div>
</template>
