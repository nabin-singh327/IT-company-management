import { useEffect, useState } from "react";

const FULL_TEXT = "student.enroll(";
const COURSE_TEXT = '"web-development"';

function Banner() {
  const [typed, setTyped] = useState("");
  const [showCourse, setShowCourse] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let i = 0;
    const typing = setInterval(() => {
      setTyped(FULL_TEXT.slice(0, i + 1));
      i++;
      if (i === FULL_TEXT.length) {
        clearInterval(typing);
        setTimeout(() => setShowCourse(true), 300);
      }
    }, 60);
    return () => clearInterval(typing);
  }, []);

  useEffect(() => {
    const blink = setInterval(() => setShowCursor((c) => !c), 500);
    return () => clearInterval(blink);
  }, []);

  return (
    <section className="bg-ink">
      <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
        {/* Left: headline + copy */}
        <div>
          <span className="font-mono text-xs text-teal tracking-wide">
            // now enrolling — 2026 batches
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-semibold text-white mt-4 leading-tight">
            Learn to build.
            <br />
            Get placed.
          </h1>
          <p className="text-white/60 mt-5 text-base leading-relaxed max-w-md">
            Hands-on IT training in programming, web development, data
            science and design — taught by working engineers, backed by
            real placement support.
          </p>
          <div className="flex gap-3 mt-8">
            <button className="bg-amber text-ink font-semibold px-5 py-3 rounded-md hover:bg-amber/90 transition-colors">
              View courses
            </button>
            <button className="border border-white/20 text-white font-medium px-5 py-3 rounded-md hover:border-white/40 transition-colors">
              Schedule a demo
            </button>
          </div>
        </div>

        {/* Right: signature editor window */}
        <div className="rounded-xl overflow-hidden border border-white/10 shadow-2xl shadow-black/40">
          {/* tab bar */}
          <div className="bg-[#1a1f28] flex items-center gap-2 px-4 py-3 border-b border-white/10">
            <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
            <span className="ml-4 font-mono text-xs text-white/40">
              enroll.js
            </span>
          </div>

          {/* code body */}
          <div className="bg-[#12161c] px-6 py-8 font-mono text-sm leading-8">
            <div className="flex">
              <span className="text-white/25 w-6 select-none">1</span>
              <span className="text-teal">const</span>
              <span className="text-white/80">&nbsp;student = getUser();</span>
            </div>
            <div className="flex">
              <span className="text-white/25 w-6 select-none">2</span>
              <span className="text-white/30">&nbsp;</span>
            </div>
            <div className="flex">
              <span className="text-white/25 w-6 select-none">3</span>
              <span className="text-white/80">
                {typed}
                {showCourse && (
                  <span className="text-amber">{COURSE_TEXT}</span>
                )}
                {showCourse && <span className="text-white/80">);</span>}
                {!showCourse && showCursor && (
                  <span className="text-white/60">▌</span>
                )}
              </span>
            </div>
            <div className="flex">
              <span className="text-white/25 w-6 select-none">4</span>
            </div>
            {showCourse && (
              <div className="flex">
                <span className="text-white/25 w-6 select-none">5</span>
                <span className="text-white/40">// → enrolled. welcome aboard 🎉</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Banner;