import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./routes/ProtectedRoute";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }/>
        <Route path="/history" element={<History />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;