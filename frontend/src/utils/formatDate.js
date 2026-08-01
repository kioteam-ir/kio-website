export function formatDate(dateStr) {
  if (!dateStr) return "-";
  try {
    return new Date(dateStr).toLocaleString("fa-IR");
  } catch {
    return dateStr;
  }
}
