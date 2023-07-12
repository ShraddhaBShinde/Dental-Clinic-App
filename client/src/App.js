import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css';
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { useSelector } from "react-redux/es/hooks/useSelector";
import SpinnerComponent from "./components/SpinnerComponent";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";



function App() {
  const { loading } = useSelector(state => state.alerts)
  return (
    <>
      <BrowserRouter>
        {loading ? (<SpinnerComponent />) :
          (
            <Routes>
              <Route path="/"
                element={<ProtectedRoute>
                  <Home />
                </ProtectedRoute>} />
              <Route path="/signup" element={
                <PublicRoute>
                  <SignUp />
                </PublicRoute>
              } />
              <Route path="/login" element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              } />

            </Routes>
          )
        }

      </BrowserRouter>
    </>
  );
}

export default App;
