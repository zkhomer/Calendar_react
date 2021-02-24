export function formatInputToDate(stringDate) {
  return new Date(
    parseInt(stringDate.slice(6, 10), 10),
    parseInt(stringDate.slice(3, 5), 10) - 1,
    parseInt(stringDate.slice(0, 2), 10)
  );
}
