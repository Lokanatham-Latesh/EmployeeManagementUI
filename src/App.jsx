import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { lazy, Suspense } from "react";
import Login from "./components/auth/Login";
import { LinearProgress } from "@mui/material";
import NotFoundPage from "./components/common/NotFoundPage";

const Dashboard = lazy(() => import("./components/common/Dashboard"));
const EmployeeList = lazy(() =>
  import("./pages/Dashboard/employee/EmployeeList")
);
const DepartmentList = lazy(() =>
  import("./pages/Dashboard/department/DepartmentList")
);

function App() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/dashboard/*"
          element={
            user ? (
              <Suspense fallback={<LinearProgress />}>
                <Dashboard />
              </Suspense>
            ) : (
              <Navigate to="/" />
            )
          }
        >
          <Route
            index
            element={
              <Suspense fallback={<LinearProgress />}>
                <EmployeeList />
              </Suspense>
            }
          />
          <Route
            path="employees"
            element={
              <Suspense fallback={<LinearProgress />}>
                <EmployeeList />
              </Suspense>
            }
          />
          <Route
            path="departments"
            element={
              <Suspense fallback={<LinearProgress />}>
                <DepartmentList />
              </Suspense>
            }
          />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
