const patientsID = 'patients';

export const patientsService = {
  savePatients: (patients) => {
    localStorage.setItem(patientsID, JSON.stringify(patients));
  },

  getPatients: () => {
    const patientsJSON = localStorage.getItem(patientsID);

    return patientsJSON ? JSON.parse(patientsJSON) : [];
  },
};
