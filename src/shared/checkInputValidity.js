export const checkValidity = (value, rules) => {
  let valid = true;
  if (rules.required) {
    valid = value.trim() !== "" && valid;
  }

  if (rules.email) {
  }

  if (rules.minLength) {
    valid = value.trim().length >= rules.minLength && valid;
  }

  if (rules.maxLength) {
    valid = value.trim().length <= rules.maxLength && valid;
  }

  return valid;
};
