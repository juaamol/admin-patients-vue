<script setup>
import { ref, watch, onMounted } from 'vue';
import { uid } from 'uid';
import Header from './components/Header.vue';
import Dialog from './components/Dialog.vue';
import Form from './components/Form.vue';
import Patient from './components/Patient.vue';
import { patientsService } from './data/app/patients-service';
import { useAlert } from './composables/use-alert';
import { usePatientForm } from './composables/use-patient-form';

const isDialogOpen = ref(false);
const idPatientDelete = ref(null);
const patients = ref([]);
const { alert, showError, showSuccess, hideAlert } = useAlert();
const { patient, errors, touched, form } = usePatientForm();

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

const setPatientToDelete = (id) => {
  isDialogOpen.value = true;
  idPatientDelete.value = id;
};

const cancelDelete = () => {
  isDialogOpen.value = false;
  idPatientDelete.value = null;
};

const acceptDelete = () => {
  isDialogOpen.value = false;
  deletePatient(idPatientDelete.value);
};

watch(patients, patientsService.savePatients, { deep: true });

watch(alert, (type, _, cleanup) => {
  if (type) {
    const timeout = setTimeout(() => hideAlert(), 4000);
    cleanup(() => clearTimeout(timeout));
  }
});

onMounted(() => (patients.value = patientsService.getPatients()));
</script>

<template>
  <div class="container mx-auto mt-20">
    <Dialog
      :isOpen="isDialogOpen"
      @cancel="cancelDelete"
      @accept="acceptDelete"
    ></Dialog>
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
            @delete="setPatientToDelete"
          />
        </div>
        <p v-else class="text-lg mt-5 text-center mb-10">No patients</p>
      </div>
    </div>
  </div>
</template>
