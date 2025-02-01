export const API_URLS = {
  NEST: import.meta.env.VITE_NEST_API_URL || "http://localhost:3000",
  EXPRESS: import.meta.env.VITE_EXPRESS_API_URL || "http://localhost:5000",
};

export function getApiUrl(): string {
  const backend = localStorage.getItem("backend") || "NEST";
  return API_URLS[backend as "NEST" | "EXPRESS"];
}
