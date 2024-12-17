export function validateData(data) {
  const allowedFields = [
    "packageId",
    "name",
    "email",
    "phone",
    "count",
    "extra",
  ];
  const errors = [];

  // Check for unexpected fields
  const extraFields = Object.keys(data).filter(
    (key) => !allowedFields.includes(key)
  );
  if (extraFields.length > 0) {
    errors.push(`Unexpected fields: ${extraFields.join(", ")}`);
  }

  // Proceed with the rest of the validation (as in the earlier example)
  if (!data.name || typeof data.name !== "string" || data.name.length < 2) {
    errors.push("Invalid name. It must be at least 2 characters long.");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email)) {
    errors.push("Invalid email format.");
  }

  const phoneRegex = /^\d+$/;
  if (!data.phone || !phoneRegex.test(data.phone)) {
    errors.push("Invalid phone. It must contain only numbers.");
  }

  if (!data.count || isNaN(Number(data.count)) || Number(data.count) < 1) {
    errors.push("Invalid count. It must be a number greater than 0.");
  }

  if (!data.packageId) {
    errors.push("Invalid count. It must be a number greater than 0.");
  }

  if (data.extra && typeof data.extra !== "string") {
    errors.push("Invalid extra. It must be a string.");
  }

  console.log(errors);

  return errors.length > 0 ? { isValid: false, errors } : { isValid: true };
}

export function validatePackageData(trip) {
  const allowedFields = [
    "title",
    "description",
    "price",
    "image",
    "availableDates",
  ];

  const errors = [];

  // Check for unexpected fields
  const extraFields = Object.keys(trip).filter(
    (key) => !allowedFields.includes(key)
  );
  if (extraFields.length > 0) {
    errors.push(`Unexpected fields: ${extraFields.join(", ")}`);
  }

  // 2. Validate `title` (optional but must be a string if provided)
  if (trip.title && typeof trip.title !== "string") {
    errors.push("title must be a string.");
  }

  // 3. Validate `description` (optional but must be a string if provided)
  if (trip.description && typeof trip.description !== "string") {
    errors.push("description must be a string.");
  }

  // 4. Validate `price` (optional but must be a string and starts with "$")
  if (trip.price) {
    const priceValue = parseFloat(trip.price);
    if (isNaN(priceValue) || priceValue <= 0) {
      errors.push("price must be a number greater than 0.");
    }
  }
  // 5. Validate `availableDates` (optional but must be an array of valid dates)
  if (trip.availableDates) {
    if (!Array.isArray(trip.availableDates)) {
      errors.push("availableDates must be an array.");
    } else {
      // Validate each date inside the array
      const invalidDates = trip.availableDates.filter((date) =>
        isNaN(new Date(date).getTime())
      );
      if (invalidDates.length > 0) {
        errors.push("availableDates must contain valid date strings.");
      }
    }
  }

  // 6. Validate `image` (optional but must be a valid URL string)
  if (trip.image && typeof trip.image !== "string") {
    errors.push("image must be a string URL.");
  } else if (trip.image && !isValidUrl(trip.image)) {
    errors.push("image must be a valid URL.");
  }

  console.log(trip, errors);

  return errors.length > 0 ? { isValid: false, errors } : { isValid: true };
}

// Helper function to check if a string is a valid URL
function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
}
