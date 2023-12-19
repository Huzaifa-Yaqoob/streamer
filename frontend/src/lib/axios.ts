import axios, { AxiosInstance } from "axios";

interface Headers {
  "Content-Type": "application/json" | "multipart/form-data";
  [authorization: string]: string | undefined;
}

export const headerForJSON: Headers = {
  "Content-Type": "application/json",
};
export const headerForFormData: Headers = {
  "Content-Type": "multipart/form-data",
};

export function createUserInstance(headers = headerForJSON): AxiosInstance {
  return axios.create({
    baseURL: "http://localhost:3300/user",
    headers,
  });
}
