/**
 * Centralised access to build-time environment variables.
 * Never read `import.meta.env` anywhere else in the app.
 */
export const env = {
  apiBaseUrl: import.meta.env.VITE_API_URL ?? "http://127.0.0.1:8000",
};
