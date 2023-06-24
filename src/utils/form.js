export class Form {
  values = {};
  errors = {};
  touched = {};
  validators = {};
  isValid = false;
  observer = () => {};

  constructor({ initialValues, validators = {} }) {
    this.values = { ...initialValues };
    this.validators = { ...validators };
  }

  subscribe = (observer = () => {}) => {
    this.observer = observer;

    return () => (this.observer = () => {});
  };

  change = (element) => {
    const id = element.target.id;
    const value = element.target.value;

    this.values[id] = value;
    this.touched[id] = true;
    this.errors[id] = this._validate(id);
    this.isValid = this._isValid();
    this._notify();
  };

  submit = () => {
    for (const id of Object.keys(this.values)) {
      this.touched[id] = true;
      this.errors[id] = this._validate(id);
    }

    this.isValid = this._isValid();
    this._notify();
  };

  blur = (element) => {
    const id = element.target.id;
    this.touched[id] = true;
    this._notify();
  };

  reinitialize = ({ initialValues, validators }) => {
    this.validators = validators ? { ...validators } : this.validators;
    this.values = { ...initialValues };
    this.errors = {};
    this.touched = {};
    this.isValid = false;
    this._notify();
  };

  reset = () => {
    for (const key of Object.keys(this.values)) {
      this.values[key] = undefined;
    }

    this.errors = {};
    this.touched = {};
    this.isValid = false;
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

  _validate(id) {
    if (this.validators[id]) {
      return this.validators[id](this.values[id]);
    }
  }

  _isValid() {
    const errors = Object.values(this.errors);
    return !errors.some((error) => error);
  }
}
