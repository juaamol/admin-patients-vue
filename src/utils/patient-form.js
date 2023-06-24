import { Form } from './form';
import { isEmpty, isEmail } from '../validators/form/validators';
import { petFormErrors as formErrors } from '../validators/form/error-messages';
import { defaultPatient } from '../data/app/patient';

export class PatientForm extends Form {
  constructor() {
    super({
      initialValues: defaultPatient,
      validators: {
        petName: (value) => (isEmpty(value) ? formErrors.petName : null),
        owner: (value) => (isEmpty(value) ? formErrors.owner : null),
        email: (value) => (isEmail(value) ? null : formErrors.email),
        releaseDate: (value) =>
          isEmpty(value) ? formErrors.releaseDate : null,
      },
    });
  }
}
