import axios, { AxiosInstance } from "axios";

export type Headers = {
  "Content-Type": "application/json" | "multipart/form-data";
  authorization?: string;
};

export const headerForJSON: Headers = {
  "Content-Type": "application/json",
};
export const headerForFormData: Headers = {
  "Content-Type": "multipart/form-data",
};

export function createUserInstance(
  headers: Headers = headerForJSON
): AxiosInstance {
  return axios.create({
    baseURL: "http://localhost:3300/user",
    headers,
  });
}

export function createUserMoviesInstance(
  headers: Headers = headerForFormData
): AxiosInstance {
  return axios.create({
    baseURL: "http://localhost:3300/user-movies",
    headers,
  });
}
