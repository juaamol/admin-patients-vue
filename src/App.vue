<script setup>
import { ref, reactive, onBeforeUnmount } from 'vue';
import { uid } from 'uid';
import Header from './components/Header.vue';
import Form from './components/Form.vue';
import Patient from './components/Patient.vue';
import { defaultPatient } from './data/app/patient';
import { PatientForm } from './utils/patient-form';

const isValid = ref(false);
const patients = ref([]);
const patient = reactive({ ...defaultPatient });
const touched = reactive({
  petName: false,
  owner: false,
  email: false,
  releaseDate: false,
});
const errors = reactive({
  petName: '',
  owner: '',
  email: '',
  releaseDate: '',
});

const form = new PatientForm();
const unsubscribeForm = form.subscribe((update) => {
  for (const key of Object.keys(update.values)) {
    patient[key] = update.values[key];
    errors[key] = update.errors[key];
    touched[key] = update.touched[key];
  }
  isValid.value = update.isValid;
});

const savePatient = () => {
  form.submit();

  if (form.isValid) {
    if (!patient.id) {
      patients.value.push({ ...patient, id: uid() });
    } else {
      const { id } = patient;
      const patientToSave = patients.value.find((patient) => patient.id === id);
      Object.assign(patientToSave, patient);
    }

    form.reset();
  }
};

const editPatient = (id) => {
  const patientToEdit = patients.value.find((patient) => patient.id === id);

  if (patientToEdit) {
    form.reinitialize({ initialValues: patientToEdit });
  }
};

onBeforeUnmount(() => {
  unsubscribeForm();
});
</script>

<template>
  <div class="container mx-auto mt-20">
    <Header></Header>
    <div class="mt-12 md:flex">
      <Form
        :errors="errors"
        :touched="touched"
        :patient="patient"
        :isValid="isValid"
        @submit="savePatient"
        @petName="form.change"
        @owner="form.change"
        @email="form.change"
        @releaseDate="form.change"
        @symptoms="form.change"
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
