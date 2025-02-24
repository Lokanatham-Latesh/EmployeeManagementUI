import axios from "axios";
import Swal from "sweetalert2";
import { API_URL } from "./Api";


const http = axios.create({
  baseURL: API_URL,
});


const showErrorAlert = (message) => {
  Swal.fire({
    icon: "error",
    title: "Error!",
    text: message,
    confirmButtonColor: "#d33",
  });
};


http.interceptors.response.use(
  (response) => response,
  (error) => {
    let message = "An unexpected error occurred. Please try again.";

    if (error.response) {
      const { status, detail, errors } = error.response.data || {};

      switch (status) {
        case 400:
          message = errors
            ? Object.values(errors).join("\n")
            : detail || "Bad Request. Please check your input.";
          break;
        case 401:
          message = "Unauthorized. Please log in again.";
          break;
        case 403:
          message = "Forbidden. You don’t have permission.";
          break;
        case 404:
          message = detail || "Requested resource not found.";
          break;
        case 409:
          message =
            detail || "Conflict error. The request could not be completed.";
          break;
        case 500:
          message = "Internal Server Error. Please try again later.";
          break;
        default:
          message = "Something went wrong. Please try again.";
      }
    }

    showErrorAlert(message);
    return Promise.reject(error);
  }
);

export default http;
