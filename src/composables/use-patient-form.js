import { reactive, onBeforeUnmount } from 'vue';
import { defaultPatient } from '../data/app/patient';
import { PatientForm } from '../utils/patient-form';

export const usePatientForm = () => {
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
  });

  onBeforeUnmount(() => unsubscribeForm());

  return { patient, touched, errors, form };
};
