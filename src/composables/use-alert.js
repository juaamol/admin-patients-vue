import { ref } from 'vue';

export const useAlert = () => {
  const alert = ref(null);

  const showError = () => {
    alert.value = 'error';
  };

  const showSuccess = () => {
    alert.value = 'success';
  };

  const hideAlert = () => {
    alert.value = null;
  };

  return { alert, showError, showSuccess, hideAlert };
};
