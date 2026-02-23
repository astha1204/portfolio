import React, { useEffect, useRef } from 'react';
import './Hero.css';

const Hero: React.FC = () => {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!gridRef.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      gridRef.current.style.transform = `translate(${x}px, ${y}px)`;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="hero" id="about">
      <div className="hero__grid" ref={gridRef} aria-hidden="true">
        {Array.from({ length: 100 }).map((_, i) => (
          <div key={i} className="hero__grid-cell" />
        ))}
      </div>
      <div className="hero__orb hero__orb--1" aria-hidden="true" />
      <div className="hero__orb hero__orb--2" aria-hidden="true" />

      <div className="container hero__content">
        <div className="hero__badge animate-fadeUp" style={{ animationDelay: '0.1s' }}>
          <span className="hero__badge-dot" />
          <span>Open to internships & full-time roles · Graduating May 2026</span>
        </div>

        <h1 className="hero__title animate-fadeUp" style={{ animationDelay: '0.2s' }}>
          <span className="hero__title-name">Aastha Arora</span>
          <br />
          <span className="hero__title-role">
            Full-Stack Developer
            <span className="hero__title-accent"></span>
          </span>
        </h1>

        <p className="hero__description animate-fadeUp" style={{ animationDelay: '0.35s' }}>
          Final-year CS student at GGSIPU (9.5 CGPA) who has built production systems for
          DRDO and the Indian Navy. Passionate about secure architectures, clean APIs, and
          software that actually matters.
        </p>

        <div className="hero__stats animate-fadeUp" style={{ animationDelay: '0.45s' }}>
          {[
            { value: '9.5', label: 'CGPA / 10' },
            { value: '2', label: 'Gov. Internships' },
            
            { value: '95.8%', label: 'Class XII Score' },
          ].map(({ value, label }) => (
            <div className="hero__stat" key={label}>
              <span className="hero__stat-value">{value}</span>
              <span className="hero__stat-label">{label}</span>
            </div>
          ))}
        </div>

        <div className="hero__ctas animate-fadeUp" style={{ animationDelay: '0.55s' }}>
          <button
            className="hero__btn hero__btn--primary"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <span>Get in touch</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            className="hero__btn hero__btn--secondary"
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
          >
            View my work
          </button>
        </div>

        <div className="hero__socials animate-fadeUp" style={{ animationDelay: '0.65s' }}>
          {[
            { label: 'GitHub', href: 'https://github.com/aastha-arora' },
            { label: 'LinkedIn', href: 'https://linkedin.com/in/aastha-arora' },
            { label: 'Email', href: 'mailto:asthaarora1204@gmail.com' },
          ].map(({ label, href }) => (
            <a key={label} href={href} className="hero__social" target="_blank" rel="noreferrer">
              {label}
            </a>
          ))}
        </div>
      </div>

      <div className="hero__scroll animate-fadeIn" style={{ animationDelay: '1.2s' }}>
        <span>scroll</span>
        <div className="hero__scroll-line" />
      </div>
    </section>
  );
};

export default Hero;