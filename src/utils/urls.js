export const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:1337"
    : "https://postly-dk.herokuapp.com";
