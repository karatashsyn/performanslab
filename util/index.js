export const cropText = (text, length = 50) => {
  if (!text) return "";
  if (text.length > length) {
    return text.slice(0, length) + "...";
  }
  return text;
};

export const getFormattedDate = (date) => {
  const options = {
    year: "numeric", // Full numeric year (e.g., "2024")
    month: "long", // Full month name (e.g., "May")
    day: "numeric", // Numeric day (e.g., "2")
  };
  return new Date(date).toLocaleDateString("tr-TR", options);
};

export const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};
