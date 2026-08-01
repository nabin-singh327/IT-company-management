import { Link } from "react-router-dom";
import { FaFacebook, FaLinkedin, FaInstagram } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-ink text-white/60 mt-20">
      <div className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-amber" />
            <span className="font-display font-semibold text-lg text-white">
              Sipalaya<span className="text-teal">/itms</span>
            </span>
          </div>
          <p className="text-sm leading-relaxed">
            Practical IT training and placement support, taught by working engineers.
          </p>
        </div>

        {/* Quick links */}
        <div>
          <h3 className="font-mono text-xs uppercase text-white/40 mb-4">Explore</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/courses" className="hover:text-white transition-colors">Courses</Link></li>
            <li><Link to="/about" className="hover:text-white transition-colors">About us</Link></li>
            <li><Link to="/placement" className="hover:text-white transition-colors">Placement</Link></li>
            <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-mono text-xs uppercase text-white/40 mb-4">Contact</h3>
          <ul className="space-y-2 text-sm">
            <li>Narephat 32, Koteshwor, Kathmandu</li>
            <li>9851344071 · 9806393939</li>
            <li>infotech@sipalaya.com</li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="font-mono text-xs uppercase text-white/40 mb-4">Follow us</h3>
          <div className="flex gap-3">
            <a
              href="#"
              aria-label="Facebook"
              className="w-9 h-9 flex items-center justify-center rounded-full border border-white/15 hover:bg-amber hover:text-ink hover:border-amber transition-colors"
            >
              <FaFacebook size={15} />
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="w-9 h-9 flex items-center justify-center rounded-full border border-white/15 hover:bg-amber hover:text-ink hover:border-amber transition-colors"
            >
              <FaLinkedin size={15} />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="w-9 h-9 flex items-center justify-center rounded-full border border-white/15 hover:bg-amber hover:text-ink hover:border-amber transition-colors"
            >
              <FaInstagram size={15} />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="font-mono text-xs text-white/40">
            © {new Date().getFullYear()} Sipalaya Info Tech Pvt. Ltd. All rights reserved.
          </p>
          <p className="font-mono text-xs text-white/40">PAN: 610189542</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;