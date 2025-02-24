React-Based Employee Management UI
Description
The React-Based Employee Management UI is a front-end application designed to manage employees efficiently. It interacts with a backend API to perform CRUD operations such as adding, updating, deleting, and fetching employee data. The application ensures a smooth user experience with authentication, form validation, pagination, sorting, error handling using interceptors, and visually appealing alerts using SweetAlert.

This project follows modern front-end development best practices and seamlessly integrates with a backend service for dynamic data management.

Features
Authentication
Simple login page with username/password validation (dummy credentials: admin/password).
Redirects to the dashboard upon successful login.
Displays an error message for incorrect credentials.
Dashboard
Displays a list of employees in a tabular format.
Fetches employee data from the backend API.
Provides sorting and pagination for better data handling.
Includes Edit and Delete buttons for managing employee records.
Uses React Icons for better UI aesthetics.
Employee Management
Allows adding new employees via a form with validation.
Supports editing employee details.
Validates required fields before submission.
Department Management
Fetches and displays a list of departments.
Allows department selection while adding or editing an employee.
API Integration
Uses Axios for API calls to fetch and update employee/department data.
Implements error handling using interceptors for improved user experience.
Fully connected with a Spring Boot backend for dynamic data management.
Alerts & UI Enhancements
Uses SweetAlert for confirmation dialogs and notifications.
Uses React Icons for better UI representation.
Responsive design using Bootstrap & Material UI.
Testing
Unit tests for components using Jest and React Testing Library.
Mock services for testing API calls with Vitest.
Tech Stack
Frontend
React (with Hooks)
React Router (for navigation)
Axios (for API calls)
Bootstrap & Material UI (for UI design)
SweetAlert (for alerts and confirmation dialogs)
React Icons (for enhanced UI visuals)
Jest & React Testing Library (for unit testing)
Vitest (for API mock testing)
Backend
Spring Boot (REST API development)
Spring Data JPA (database interaction)
Hibernate (ORM framework)
Database
MySQL
Frameworks & Libraries
Spring Boot (Backend framework)
Hibernate (ORM for database handling)
React (Frontend framework)
Axios (HTTP client for API requests)
Bootstrap & Material UI (for styling)
SweetAlert (for alerts and confirmation dialogs)
React Icons (for UI enhancements)
Jest, React Testing Library, and Vitest (for unit testing)
