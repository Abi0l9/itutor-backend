const handleEmptyField = (body) => {
  let result;

  const fields = Object.keys(body);
  fields.forEach((field) => {
    const value = body[field];
    if (value === "") {
      result = { error: `'${field}' can't have an empty value` };
    }
  });

  return result;
};

const handleRequiredFields = (body, requiredFields) => {
  const missingFields = requiredFields.filter(
    (f) => !Object.keys(body).includes(f)
  );

  const message =
    missingFields.length > 1 ? "are required fields" : "is a required field";

  return (
    missingFields.length > 0 &&
    missingFields.length !== requiredFields.length && {
      error: `${missingFields.join(", ")} ${message}`,
    }
  );
};

const generateCode = () => Math.round(Math.random() * 100000) + 100000;

// const sendCode = () => {}

const handlers = {
  handleEmptyField,
  handleRequiredFields,
  generateCode,
};

module.exports = handlers;
