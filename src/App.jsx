import { useEffect, useRef, useState } from 'react';

export default function App() {
  const cursorRef = useRef(null);
  const scrollerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const totalSections = 6;

  // Custom cursor
  useEffect(() => {
    const cursor = cursorRef.current;
    const handleMove = (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    };
    document.addEventListener('mousemove', handleMove);

    const triggers = document.querySelectorAll('.hover-trigger, a');
    const enter = () => cursor.classList.add('hovered');
    const leave = () => cursor.classList.remove('hovered');
    triggers.forEach((t) => {
      t.addEventListener('mouseenter', enter);
      t.addEventListener('mouseleave', leave);
    });

    return () => {
      document.removeEventListener('mousemove', handleMove);
      triggers.forEach((t) => {
        t.removeEventListener('mouseenter', enter);
        t.removeEventListener('mouseleave', leave);
      });
    };
  }, []);

  // Intersection Observer for pagination
  useEffect(() => {
    const scroller = scrollerRef.current;
    const sections = scroller.querySelectorAll('section');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Array.from(sections).indexOf(entry.target);
            setActiveIndex(idx);

            const content = entry.target.querySelector('.content-wrap');
            if (content) {
              content.style.opacity = '0';
              content.style.transform = 'translateY(16px)';
              content.style.transition = 'none';
              requestAnimationFrame(() => {
                content.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                content.style.opacity = '1';
                content.style.transform = 'translateY(0)';
              });
            }
          }
        });
      },
      { root: scroller, threshold: 0.5 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Light source */}
      <div className="light-source-container">
        <div className="shadow-edge" />
        <div className="light-leak" />
      </div>

      {/* Custom cursor */}
      <div className="cursor" ref={cursorRef} />

      {/* Fixed UI layer */}
      <div className="ui-layer">
        <header>
          <div className="brand">
            CARSON MOORE <span>/ ENGINEER</span>
          </div>
          <nav>
            <ul>
              <li><a href="#intro" className="nav-link">Index</a></li>
              <li><a href="#work" className="nav-link">Projects</a></li>
              <li><a href="#resume" className="nav-link">Resume</a></li>
              <li><a href="#about" className="nav-link">Philosophy</a></li>
              <li><a href="#contact" className="nav-link">Contact</a></li>
            </ul>
          </nav>
        </header>

        {/* Pagination */}
        <div className="pagination-container">
          <div className="dots">
            {Array.from({ length: totalSections }).map((_, i) => (
              <div key={i} className={`dot${i === activeIndex ? ' active' : ''}`} style={{ width: i === activeIndex ? '24px' : '4px' }} />
            ))}
          </div>
          <div className="counter-badge">
            {String(activeIndex + 1).padStart(2, '0')}
          </div>
        </div>

        <div className="est-label">EST. 2024</div>
      </div>

      {/* Scrollable content */}
      <main className="scroll-container" ref={scrollerRef}>

        {/* ── Intro ── */}
        <section id="intro">
          <div className="content-wrap">
            <span className="label">01 — INTRODUCTION</span>
            <h1 className="hero-name">Precision-built,<br />from launchpad<br />to code.</h1>
            <h2 className="hero-tagline">Engineer & Developer</h2>
            <p>
              Mechanical engineering student at UT Austin with hands-on experience at SpaceX.
              I design, analyze, and build — from rocket sub-assemblies to full-stack web applications.
            </p>
            <a href="#work" className="cta-btn hover-trigger">Explore Projects</a>
            <div className="scroll-hint">
              <div className="scroll-hint__mouse">
                <div className="scroll-hint__wheel" />
              </div>
              <span>Scroll</span>
            </div>
          </div>
          <div className="visual-anchor">
            <div style={{ width: '100%', height: '100%', background: 'radial-gradient(circle at 70% 30%, #333 0%, #000 70%)' }} />
          </div>
        </section>

        {/* ── Projects ── */}
        <section id="work" className="section-work">
          <div className="content-wrap">
            <span className="label">02 — PROJECTS</span>
            <h1>Civic Odds<br />Tracker</h1>
            <p>
              A real-time prediction market interface for tracking federal, state, and local policy outcomes.
              Features live odds, category filters, trend charts, and a clean civic-inspired design.
              Built with JavaScript and a Node.js backend.
            </p>
            <a href="https://github.com/carsonmoore13/PolicyMarket" target="_blank" rel="noreferrer" className="cta-btn hover-trigger">View on GitHub</a>
          </div>
          <div className="visual-anchor">
            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2560&auto=format&fit=crop"
              alt="Data visualization"
            />
          </div>
        </section>

        {/* ── Geothermal Site Analyzer ── */}
        <section id="work2" className="section-work">
          <div className="content-wrap">
            <span className="label">03 — PROJECTS</span>
            <h1>Geothermal Site<br />Analyzer</h1>
            <p>
              An interactive 3D globe that ranks and visualizes global geothermal energy hotspots.
              Scores sites by heat flow, crustal accessibility, and borehole temperature data —
              built with React, Three.js, and a Python data pipeline.
            </p>
            <a href="https://github.com/carsonmoore13" target="_blank" rel="noreferrer" className="cta-btn hover-trigger">View on GitHub</a>
          </div>
          <div className="visual-anchor">
            <img
              src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2560&auto=format&fit=crop"
              alt="Earth globe visualization"
            />
          </div>
        </section>

        {/* ── Resume ── */}
        <section id="resume" className="section-resume">
          <div className="content-wrap">
            <span className="label">04 — RESUME</span>
            <h1 style={{ fontSize: '2.6rem', marginBottom: '1.4rem' }}>Carson Moore</h1>
            <p style={{ marginBottom: '1.5rem', fontSize: '0.95rem' }}>
              B.S. Mechanical Engineering · Minor: Elements of Computing · GPA 3.75<br />
              The University of Texas at Austin — May 2027
            </p>

            <div className="resume-grid">
              <div className="resume-column">
                <h3>Experience</h3>

                <div className="resume-item">
                  <h4>SpaceX — Build Engineering Intern</h4>
                  <div className="resume-sub">Starbase, TX · Jan 2025 – Aug 2025</div>
                  <p>Supported 5,000+ hrs of technician labor. Owned 2 sub-assembly cells during production ramp. Designed flight parts in NX for V2 Starship.</p>
                </div>

                <div className="resume-item">
                  <h4>Longhorn Racing FSAE — Dynamics Engineer</h4>
                  <div className="resume-sub">Austin, TX · Aug 2023 – Present</div>
                  <p>1,000+ hrs of SolidWorks CAD. Designed hub assembly validated with Ansys FEA. Carbon fiber pushrod saved 5 lbs in suspension.</p>
                </div>

                <div className="resume-item">
                  <h4>SiDi Lab, UT Austin — Robotics Researcher</h4>
                  <div className="resume-sub">Austin, TX · Jan – Apr 2024</div>
                  <p>Integrated IR camera system with robot arm using Python & NatNet SDK. Presented to UT research faculty.</p>
                </div>
              </div>

              <div className="resume-column">
                <h3>Projects</h3>

                <div className="resume-item">
                  <h4>Civic Odds Tracker</h4>
                  <p>Policy prediction market interface with live odds, filters, and trend charts.</p>
                </div>

                <div className="resume-item">
                  <h4>Geothermal Site Analyzer</h4>
                  <p>Interactive 3D globe ranking geothermal hotspots by heat flow, accessibility, and borehole data.</p>
                </div>

                <h3 style={{ marginTop: '18px' }}>Skills</h3>
                <div className="skill-tags">
                  {['SolidWorks', 'NX', 'Python', 'MATLAB', 'React', 'JavaScript', 'Ansys FEA', 'Fusion 360', 'Machine Shop', '3D Printing'].map(s => (
                    <span key={s} className="skill-tag">{s}</span>
                  ))}
                </div>

                <h3 style={{ marginTop: '18px' }}>Honors</h3>
                <div className="resume-item">
                  <p>Gilkey Endowed Scholarship · Tau Beta Pi · Eagle Scout w/ Bronze Palms</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Philosophy ── */}
        <section id="about">
          <div className="content-wrap">
            <span className="label">05 — PHILOSOPHY</span>
            <h1>Precision is a<br />principle.</h1>
            <p>
              From rocketry to code, I approach every problem with the same discipline:
              understand the constraints, strip away the unnecessary, and engineer a solution
              that's robust, elegant, and built to last.
            </p>
            <a href="https://github.com/carsonmoore13" target="_blank" rel="noreferrer" className="cta-btn hover-trigger">View GitHub</a>
          </div>
          <div className="visual-anchor" style={{ background: 'transparent', border: '1px solid #333' }}>
            <div style={{ width: '100%', height: '100%', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
              <div style={{ borderRight: '1px solid #222' }} />
              <div style={{ borderRight: '1px solid #222' }} />
              <div style={{ borderRight: '1px solid #222' }} />
            </div>
          </div>
        </section>

        {/* ── Contact ── */}
        <section id="contact" className="section-contact">
          <div className="content-wrap">
            <span className="label">06 — CONTACT</span>
            <h1>Let's connect.</h1>
            <p>
              Currently pursuing my B.S. in Mechanical Engineering at UT Austin with a
              graduation date of May 2027. Open to internship and collaboration opportunities
              in engineering and software.
            </p>
            <div className="contact-links">
              <a href="mailto:carsonmoore715@gmail.com" className="cta-btn hover-trigger">carsonmoore715@gmail.com</a>
              <a href="https://linkedin.com/in/carsonm13" target="_blank" rel="noreferrer" className="cta-btn hover-trigger">LinkedIn</a>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
