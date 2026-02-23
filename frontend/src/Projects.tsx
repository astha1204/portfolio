import React, { useEffect, useRef, useState } from 'react';
import { PROJECTS } from './data';
import './Projects.css';

const Projects: React.FC = () => {
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
    <section className="projects section" id="projects" ref={sectionRef}>
      <div className="container">
        <div className={`section-header ${visible ? 'section-header--visible' : ''}`}>
          <span className="section-tag">Portfolio</span>
          <h2 className="section-title">Selected Projects</h2>
          <p className="section-subtitle">
            Things I've built — solo, with teams, and for fun.
          </p>
        </div>

        <div className="projects__grid">
          {PROJECTS.map((project, i) => (
            <div
              key={project.title}
              className={`project-card ${i === 0 ? 'project-card--featured' : ''} ${visible ? 'project-card--visible' : ''}`}
              style={{ animationDelay: `${i * 0.12}s` }}
            >
              <div className="project-card__top">
                <div className="project-card__meta">
                  <span className="project-card__year">{project.year}</span>
                  {project.metrics && (
                    <span className="project-card__metric">{project.metrics}</span>
                  )}
                </div>
                <div className="project-card__links">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noreferrer" className="project-card__link" aria-label="GitHub">
                      <GitHubIcon />
                    </a>
                  )}
                  {project.live && (
                    <a href={project.live} target="_blank" rel="noreferrer" className="project-card__link" aria-label="Live site">
                      <ExternalIcon />
                    </a>
                  )}
                </div>
              </div>

              <h3 className="project-card__title">{project.title}</h3>
              <p className="project-card__description">{project.description}</p>

              <div className="project-card__tech">
                {project.tech.map((t) => (
                  <span key={t} className="project-card__tech-tag">{t}</span>
                ))}
              </div>

              {i === 0 && <div className="project-card__featured-badge">Featured</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const GitHubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
  </svg>
);

const ExternalIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M6 2H2v12h12v-4M10 2h4v4M14 2L8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default Projects;
