export const BACKEND_API_URL =
  process.env.REACT_APP_ENVIRONMENT === "development"
    ? "http://192.168.0.103:8888/api/v1"
    : "/";
