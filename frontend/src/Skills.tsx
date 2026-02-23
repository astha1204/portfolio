import React, { useEffect, useRef, useState } from 'react';
import { SKILL_CATEGORIES } from './data';
import './Skills.css';

const Skills: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="skills section" id="skills" ref={sectionRef}>
      <div className="container">
        <div className={`section-header ${visible ? 'section-header--visible' : ''}`}>
          <span className="section-tag">Expertise</span>
          <h2 className="section-title">Technical Skills</h2>
          <p className="section-subtitle">
            Technologies I work with daily, from database internals to pixel-perfect UIs.
          </p>
        </div>

        <div className="skills__grid">
          {SKILL_CATEGORIES.map((cat, ci) => (
            <div
              key={cat.category}
              className={`skills__card ${visible ? 'skills__card--visible' : ''}`}
              style={{ animationDelay: `${ci * 0.1}s` }}
            >
              <div className="skills__card-header">
                <span className="skills__icon">{cat.icon}</span>
                <h3 className="skills__category">{cat.category}</h3>
              </div>

              <div className="skills__list">
                {cat.skills.map((skill, si) => (
                  <div key={skill.name} className="skill-item">
                    <div className="skill-item__label">
                      <span className="skill-item__name">{skill.name}</span>
                      <span className="skill-item__pct">{skill.level}%</span>
                    </div>
                    <div className="skill-item__bar">
                      <div
                        className="skill-item__fill"
                        style={{
                          width: visible ? `${skill.level}%` : '0%',
                          transitionDelay: `${ci * 0.1 + si * 0.08}s`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Tech cloud */}
        <div className={`skills__tags ${visible ? 'skills__tags--visible' : ''}`}>
          {[
            'Python', 'TypeScript', 'React', 'FastAPI', 'PostgreSQL', 'Redis',
            'Docker', 'Kubernetes', 'AWS', 'LangChain', 'OpenAI', 'Kafka',
            'Terraform', 'GraphQL', 'Next.js', 'Celery', 'SQLAlchemy', 'Pydantic'
          ].map((tag) => (
            <span key={tag} className="skills__tag">{tag}</span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
