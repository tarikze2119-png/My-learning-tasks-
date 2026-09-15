export const DELIVERY_AREAS = [
  "Bole",
  "Kazanchis",
  "Megenagna",
  "Piassa",
  "Sarbet",
  "CMC",
  "Old Airport"
];

export function validate(form) {
  const errors = {};

  if (!form.name || !form.name.trim()) {
    errors.name = "Please enter your full name for delivery";
  } else if (form.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters long";
  }

  const cleanPhone = form.phone ? form.phone.trim().replace(/\s+/g, "") : "";
  const telebirrPattern = /^(?:\+251|0)9\d{8}$/;
  if (!cleanPhone) {
    errors.phone = "TeleBirr phone number is required";
  } else if (!telebirrPattern.test(cleanPhone)) {
    errors.phone = "Use valid format: 0911223344 or +251911223344";
  }

  if (!form.area || !DELIVERY_AREAS.includes(form.area)) {
    errors.area = "Please choose a valid Addis Ababa delivery neighborhood";
  }

  if (form.notes && form.notes.length > 200) {
    errors.notes = "Special instructions must be 200 characters or fewer";
  }

  return errors;
}

export default validate;
