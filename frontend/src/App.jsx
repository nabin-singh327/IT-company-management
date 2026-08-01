import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { fetchCurrentUser } from "./redux/authSlice";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import Register from "./pages/Register";
import Login from "./pages/Login";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentFailure from "./pages/PaymentFailure";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Certificate from "./pages/Certificate";
import InstructorDashboard from "./pages/InstructorDashboard";
import CourseForm from "./pages/CourseForm";
import InstructorStudents from "./pages/InstructorStudents";
import InstructorAssignments from "./pages/InstructorAssignments";
import InstructorSubmissions from "./pages/InstructorSubmissions";
import StudentAssignments from "./pages/StudentAssignments";
import AdminLayout from "./pages/AdminLayout";
import AdminUsers from "./pages/AdminUsers";
import AdminCourses from "./pages/AdminCourses";
import AdminPayments from "./pages/AdminPayments";
import Placement from "./pages/Placement";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import Contact from "./pages/Contact";
import About from "./pages/About";
import BlogForm from "./pages/BlogForm";
import AdminJobs from "./pages/AdminJobs";
import AdminAlumni from "./pages/AdminAlumni";
import Footer from "./components/Footer";

function App() {
  const dispatch = useDispatch();
  const { checkedAuth } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  if (!checkedAuth) return null;

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:slug" element={<CourseDetail />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/payment/success" element={<PaymentSuccess />} />
        <Route path="/payment/failure" element={<PaymentFailure />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/certificate/:id"
          element={
            <ProtectedRoute>
              <Certificate />
            </ProtectedRoute>
          }
        />
        <Route
          path="/instructor"
          element={
            <ProtectedRoute allowedRoles={["instructor", "admin"]}>
              <InstructorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/instructor/courses/new"
          element={
            <ProtectedRoute allowedRoles={["instructor", "admin"]}>
              <CourseForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/instructor/courses/:id/edit"
          element={
            <ProtectedRoute allowedRoles={["instructor", "admin"]}>
              <CourseForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/instructor/courses/:courseId/students"
          element={
            <ProtectedRoute allowedRoles={["instructor", "admin"]}>
              <InstructorStudents />
            </ProtectedRoute>
          }
        />
        <Route
          path="/instructor/courses/:courseId/assignments"
          element={
            <ProtectedRoute allowedRoles={["instructor", "admin"]}>
              <InstructorAssignments />
            </ProtectedRoute>
          }
        />
        <Route
          path="/instructor/assignments/:assignmentId/submissions"
          element={
            <ProtectedRoute allowedRoles={["instructor", "admin"]}>
              <InstructorSubmissions />
            </ProtectedRoute>
          }
        />
        <Route
          path="/courses/:courseId/assignments"
          element={
            <ProtectedRoute>
              <StudentAssignments />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="users" element={<AdminUsers />} />
          <Route path="courses" element={<AdminCourses />} />
          <Route path="payments" element={<AdminPayments />} />
          <Route path="jobs" element={<AdminJobs />} />
          <Route path="alumni" element={<AdminAlumni />} />
        </Route>
        <Route path="/placement" element={<Placement />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogDetail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/blog/new"
          element={
            <ProtectedRoute allowedRoles={["instructor", "admin"]}>
              <BlogForm />
            </ProtectedRoute>
          }
        />
      </Routes>
        <Footer />
    </BrowserRouter>
  );
}

export default App;
