import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { AuthProvider } from "./core/contexts/AuthContext";
import { Suspense } from "react";
import LoadingSpinner from "./shared/components/common/LoadingSpinner";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <Suspense fallback={<LoadingSpinner />}>
        <RouterProvider router={router} />
      </Suspense>
    </AuthProvider>
  );
}

export default App;
