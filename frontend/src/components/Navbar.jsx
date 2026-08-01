import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/authSlice";

function Navbar() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/");
  };

  return (
    <nav className="bg-paper/90 backdrop-blur border-b border-ink/10 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-amber" />
          <span className="font-display font-semibold text-lg tracking-tight text-ink">
            Sipalaya<span className="text-navy">/itms</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-ink/70">
          <Link to="/" className="hover:text-ink transition-colors">
            Home
          </Link>
          <Link to="/courses" className="hover:text-ink transition-colors">
            Courses
          </Link>
          <Link to="/about" className="hover:text-ink transition-colors">
            About
          </Link>
          <Link to="/placement" className="hover:text-ink transition-colors">
            Placement
          </Link>
          <Link to="/blog" className="hover:text-ink transition-colors">
            Blog
          </Link>
          <Link to="/contact" className="hover:text-ink transition-colors">
            Contact
          </Link>
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              {user.role === "admin" && (
                <Link
                  to="/admin/users"
                  className="text-sm font-medium text-ink/70 hover:text-ink transition-colors"
                >
                  Admin
                </Link>
              )}
              {user.role === "instructor" && (
                <Link
                  to="/instructor"
                  className="text-sm font-medium text-ink/70 hover:text-ink transition-colors"
                >
                  Instructor
                </Link>
              )}
              {user.role === "student" && (
                <Link
                  to="/dashboard"
                  className="text-sm font-medium text-ink/70 hover:text-ink transition-colors"
                >
                  Dashboard
                </Link>
              )}
              <span className="text-sm text-ink/60 font-mono">
                hi, {user.name.split(" ")[0]}
              </span>
              <button
                onClick={handleLogout}
                className="text-sm font-medium text-ink/70 hover:text-ink transition-colors"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm font-medium text-ink/70 hover:text-ink transition-colors"
              >
                Log in
              </Link>
              <Link
                to="/register"
                className="text-sm font-medium bg-navy text-white px-4 py-2 rounded-md hover:bg-navy/90 transition-colors"
              >
                Enroll now
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
