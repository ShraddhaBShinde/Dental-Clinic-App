import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css';
import Home from './pages/User/Home'
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { useSelector } from "react-redux/es/hooks/useSelector";
import SpinnerComponent from "./components/SpinnerComponent";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import UserNav from "./components/Navbar/UserNav";
import Profile from "./pages/User/Profile";
import AdminHome from "./pages/Admin/AdminHome";
import Appointments from "./pages/Appointments";
import ManageDoctors from "./pages/Admin/ManageDoctors";
import AddDoctor from "./pages/Admin/AddDoctor";
import UserLayout from "./components/layouts/UserLayout";
import AdminLayout from "./components/layouts/AdminLayout";
import BookAppointment from "./pages/User/BookAppointment";
import ViewAppointments from "./pages/User/ViewAppointments";



function App() {
  const { loading } = useSelector(state => state.alerts)
  return (
    <>
      <BrowserRouter>
        {loading ? (<SpinnerComponent />) :
          (
            <Routes>
              <Route path="/" element={<UserLayout><Home /></UserLayout>} />
              <Route path="/signup" element={<PublicRoute><SignUp /></PublicRoute>} />
              <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/admin" element={<ProtectedRoute><AdminLayout><AdminHome /></AdminLayout></ProtectedRoute>} />
              <Route path="/admin/appointments" element={<ProtectedRoute><AdminLayout><Appointments /></AdminLayout></ProtectedRoute>} />
              <Route path="/admin/doctors" element={<ProtectedRoute><AdminLayout><ManageDoctors /></AdminLayout></ProtectedRoute>} />
              <Route path="/admin/doctor-add" element={<ProtectedRoute><AdminLayout><AddDoctor /></AdminLayout></ProtectedRoute>} />
              <Route path="/book-appointment" element={<ProtectedRoute><UserLayout><BookAppointment /></UserLayout></ProtectedRoute>} />
              <Route path="/view-appointments" element={<ProtectedRoute><UserLayout><ViewAppointments /></UserLayout></ProtectedRoute>} />
            </Routes>
          )
        }

      </BrowserRouter>
    </>
  );
}

export default App;