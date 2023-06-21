export function isEmpty(value) {
  return !value && value !== 0;
}

export function isEmail(value) {
  const re = /\S+@\S+\.\S+/;
  return re.test(value);
}
