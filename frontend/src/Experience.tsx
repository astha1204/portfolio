import React, { useEffect, useRef, useState } from 'react';
import { EXPERIENCES } from './data';
import './Experience.css';

const Experience: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="experience section" id="experience" ref={sectionRef}>
      <div className="container">
        <div className={`section-header ${visible ? 'section-header--visible' : ''}`}>
          <span className="section-tag">Work History</span>
          <h2 className="section-title">Experience</h2>
          <p className="section-subtitle">
            Building real systems for defense and government organizations — from form automation to polyglot data pipelines.
          </p>
        </div>

        <div className="exp__timeline">
          {EXPERIENCES.map((exp, i) => (
            <div
              key={exp.company}
              className={`exp__item ${visible ? 'exp__item--visible' : ''}`}
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              <div className="exp__connector">
                <div className="exp__dot" />
                {i < EXPERIENCES.length - 1 && <div className="exp__line" />}
              </div>

              <div className="exp__card">
                <div className="exp__header">
                  <div>
                    <h3 className="exp__role">{exp.role}</h3>
                    <div className="exp__company-row">
                      <span className="exp__company">{exp.company}</span>
                      <span className="exp__separator">·</span>
                      <span className="exp__period">{exp.period}</span>
                    </div>
                  </div>
                </div>

                <ul className="exp__bullets">
                  {exp.bullets.map((bullet, bi) => (
                    <li key={bi} className="exp__bullet">
                      <span className="exp__bullet-dot">→</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                <div className="exp__tech">
                  {exp.tech.map((t) => (
                    <span key={t} className="exp__tech-tag">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* Education */}
          <div className={`exp__item ${visible ? 'exp__item--visible' : ''}`} style={{ animationDelay: '0.3s' }}>
            <div className="exp__connector">
              <div className="exp__dot exp__dot--edu" />
            </div>
            <div className="exp__card exp__card--edu">
              <div className="exp__edu-icon">🎓</div>
              <div>
                <h3 className="exp__role">B.Tech Computer Science & Engineering</h3>
                <div className="exp__company-row">
                  <span className="exp__company">GGSIPU, New Delhi</span>
                  <span className="exp__separator">·</span>
                  <span className="exp__period">2022 – 2026</span>
                  <span className="exp__separator">·</span>
                  <span className="exp__gpa">9.5 CGPA · Dean's List</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;