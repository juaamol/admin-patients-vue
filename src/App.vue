<script setup>
import { ref, reactive, onBeforeUnmount, watch, onMounted } from 'vue';
import { uid } from 'uid';
import Header from './components/Header.vue';
import Form from './components/Form.vue';
import Patient from './components/Patient.vue';
import { defaultPatient } from './data/app/patient';
import { patientsService } from './data/app/patients-service';
import { PatientForm } from './utils/patient-form';
import { useAlert } from './composables/use-alert';

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

const { alert, showError, showSuccess, hideAlert } = useAlert();
const form = new PatientForm();
const unsubscribeForm = form.subscribe((update) => {
  for (const key of Object.keys(update.values)) {
    patient[key] = update.values[key];
    errors[key] = update.errors[key];
    touched[key] = update.touched[key];
  }
  isValid.value = update.isValid;
});

const findPatient = (id) => patients.value.find((patient) => patient.id === id);

const savePatient = () => {
  form.submit();

  if (form.isValid) {
    if (!patient.id) {
      patients.value.push({ ...patient, id: uid() });
    } else {
      const { id } = patient;
      const patientToSave = findPatient(id) || {};
      Object.assign(patientToSave, patient);
    }

    form.clean();
    showSuccess();
  } else {
    showError();
  }
};

const editPatient = (id) => {
  const patientToEdit = findPatient(id);

  if (patientToEdit) {
    form.reinitialize({ initialValues: patientToEdit });
  }
};

const deletePatient = (id) => {
  patients.value = patients.value.filter((patient) => patient.id !== id);

  if (patient.id === id) {
    form.clean();
  }
};

watch(patients, patientsService.savePatients, { deep: true });

watch(alert, (alertType, _, cleanup) => {
  if (!!alertType) {
    const timeout = setTimeout(() => {
      hideAlert();
    }, 4000);

    cleanup(() => clearTimeout(timeout));
  }
});

onMounted(() => {
  patients.value = patientsService.getPatients();
});

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
        :alert="alert"
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
            @delete="deletePatient"
          />
        </div>
        <p v-else class="text-lg mt-5 text-center mb-10">No patients</p>
      </div>
    </div>
  </div>
</template>
