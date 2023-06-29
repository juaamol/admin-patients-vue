export class Form {
  values = {};
  errors = {};
  touched = {};
  validators = {};
  observer = () => {};

  constructor({ initialValues, validators = {} }) {
    this.values = { ...initialValues };
    this.validators = { ...validators };
    this.errors = this._validateAll();
  }

  get isValid() {
    const errors = Object.values(this.errors);
    return !errors.some((error) => error);
  }

  subscribe = (observer = () => {}) => {
    this.observer = observer;

    return () => {
      this.observer = () => {};
    };
  };

  change = (element) => {
    const field = element.target.id;
    const value = element.target.value;

    this.values[field] = value;
    this.touched[field] = true;
    this.errors[field] = this._validate(field);
    this._notify();
  };

  submit = () => {
    for (const field of Object.keys(this.values)) {
      this.touched[field] = true;
      this.errors[field] = this._validate(field);
    }
    this._notify();
  };

  blur = (element) => {
    const field = element.target.id;
    this.touched[field] = true;
    this._notify();
  };

  reinitialize = ({ initialValues, validators }) => {
    this.validators = validators ? { ...validators } : this.validators;
    this.values = { ...initialValues };
    this.errors = this._validateAll();
    this.touched = {};
    this._notify();
  };

  clean = () => {
    for (const key of Object.keys(this.values)) {
      this.values[key] = undefined;
      this.errors[key] = undefined;
    }

    this.touched = {};
    this._notify();
  };

  _notify() {
    this.observer({
      values: { ...this.values },
      errors: { ...this.errors },
      touched: { ...this.touched },
      isValid: this.isValid,
    });
  }

  _validateAll() {
    const errors = {};

    for (const field of Object.keys(this.values)) {
      errors[field] = this._validate(field);
    }

    return errors;
  }

  _validate(field) {
    if (this.validators[field]) {
      return this.validators[field](this.values[field]);
    }
  }
}
