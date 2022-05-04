export const BACKEND_API_URL =
  process.env.REACT_APP_ENVIRONMENT === "development"
    ? "http://localhost:8888/api/v1"
    : "/";
