import { NavLink, Outlet } from "react-router-dom";

function AdminLayout() {
  const linkClass = ({ isActive }) =>
    `block px-3 py-2 rounded-md text-sm font-medium ${
      isActive ? "bg-navy text-white" : "text-ink/70 hover:bg-ink/5"
    }`;

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <span className="font-mono text-xs text-teal">06 · admin</span>
      <h1 className="font-display text-3xl font-semibold text-ink mt-2 mb-8">Admin panel</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <nav className="md:col-span-1 space-y-1">
          <NavLink to="/admin/users" className={linkClass}>Users</NavLink>
          <NavLink to="/admin/courses" className={linkClass}>Courses</NavLink>
          <NavLink to="/admin/payments" className={linkClass}>Payments</NavLink>
          <NavLink to="/admin/jobs" className={linkClass}>Jobs</NavLink>
          <NavLink to="/admin/alumni" className={linkClass}>Alumni</NavLink>
        </nav>
        <div className="md:col-span-3">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;