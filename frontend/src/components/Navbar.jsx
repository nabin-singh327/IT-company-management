import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/authSlice";

function Navbar() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    setMenuOpen(false);
    navigate("/");
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="bg-paper/90 backdrop-blur border-b border-ink/10 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2" onClick={closeMenu}>
          <span className="w-2.5 h-2.5 rounded-full bg-amber" />
          <span className="font-display font-semibold text-lg tracking-tight text-ink">
            Sipalaya<span className="text-navy">/itms</span>
          </span>
        </Link>

        {/* Desktop nav links — unchanged */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-ink/70">
          <Link to="/" className="hover:text-ink transition-colors">Home</Link>
          <Link to="/courses" className="hover:text-ink transition-colors">Courses</Link>
          <Link to="/about" className="hover:text-ink transition-colors">About</Link>
          <Link to="/placement" className="hover:text-ink transition-colors">Placement</Link>
          <Link to="/blog" className="hover:text-ink transition-colors">Blog</Link>
          <Link to="/contact" className="hover:text-ink transition-colors">Contact</Link>
        </div>

        {/* Desktop auth buttons — unchanged */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              {user.role === "admin" && (
                <Link to="/admin/users" className="text-sm font-medium text-ink/70 hover:text-ink transition-colors">
                  Admin
                </Link>
              )}
              {user.role === "instructor" && (
                <Link to="/instructor" className="text-sm font-medium text-ink/70 hover:text-ink transition-colors">
                  Instructor
                </Link>
              )}
              {user.role === "student" && (
                <Link to="/dashboard" className="text-sm font-medium text-ink/70 hover:text-ink transition-colors">
                  Dashboard
                </Link>
              )}
              <span className="text-sm text-ink/60 font-mono">hi, {user.name.split(" ")[0]}</span>
              <button onClick={handleLogout} className="text-sm font-medium text-ink/70 hover:text-ink transition-colors">
                Log out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm font-medium text-ink/70 hover:text-ink transition-colors">
                Log in
              </Link>
              <Link to="/register" className="text-sm font-medium bg-navy text-white px-4 py-2 rounded-md hover:bg-navy/90 transition-colors">
                Enroll now
              </Link>
            </>
          )}
        </div>

        {/* Mobile hamburger button — only visible below md */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden w-9 h-9 flex items-center justify-center text-ink"
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6l-12 12" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile dropdown menu — only renders when open, only visible below md */}
      {menuOpen && (
        <div className="md:hidden border-t border-ink/10 bg-paper px-6 py-4 space-y-3">
          <Link to="/" onClick={closeMenu} className="block text-sm font-medium text-ink/70 hover:text-ink">Home</Link>
          <Link to="/courses" onClick={closeMenu} className="block text-sm font-medium text-ink/70 hover:text-ink">Courses</Link>
          <Link to="/about" onClick={closeMenu} className="block text-sm font-medium text-ink/70 hover:text-ink">About</Link>
          <Link to="/placement" onClick={closeMenu} className="block text-sm font-medium text-ink/70 hover:text-ink">Placement</Link>
          <Link to="/blog" onClick={closeMenu} className="block text-sm font-medium text-ink/70 hover:text-ink">Blog</Link>
          <Link to="/contact" onClick={closeMenu} className="block text-sm font-medium text-ink/70 hover:text-ink">Contact</Link>

          <div className="pt-3 border-t border-ink/10 space-y-3">
            {user ? (
              <>
                {user.role === "admin" && (
                  <Link to="/admin/users" onClick={closeMenu} className="block text-sm font-medium text-ink/70 hover:text-ink">
                    Admin
                  </Link>
                )}
                {user.role === "instructor" && (
                  <Link to="/instructor" onClick={closeMenu} className="block text-sm font-medium text-ink/70 hover:text-ink">
                    Instructor
                  </Link>
                )}
                {user.role === "student" && (
                  <Link to="/dashboard" onClick={closeMenu} className="block text-sm font-medium text-ink/70 hover:text-ink">
                    Dashboard
                  </Link>
                )}
                <p className="text-sm text-ink/50 font-mono">hi, {user.name.split(" ")[0]}</p>
                <button onClick={handleLogout} className="block text-sm font-medium text-ink/70 hover:text-ink">
                  Log out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={closeMenu} className="block text-sm font-medium text-ink/70 hover:text-ink">
                  Log in
                </Link>
                <Link
                  to="/register"
                  onClick={closeMenu}
                  className="inline-block text-sm font-medium bg-navy text-white px-4 py-2 rounded-md"
                >
                  Enroll now
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;