import { SkillCategory, Project, Experience } from './types';

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: 'Frontend',
    icon: '◈',
    skills: [
      { name: 'React / Next.js', level: 92 },
      { name: 'TypeScript', level: 85 },
      { name: 'Redux', level: 80 },
      { name: 'HTML / CSS', level: 90 },
    ],
  },
  {
    category: 'Backend',
    icon: '◉',
    skills: [
      { name: 'Node.js / Express', level: 88 },
      { name: 'FastAPI (Python)', level: 85 },
      { name: 'PHP', level: 75 },
      { name: 'RESTful APIs', level: 92 },
    ],
  },
  {
    category: 'Databases',
    icon: '◎',
    skills: [
      { name: 'MongoDB', level: 88 },
      { name: 'PostgreSQL', level: 82 },
      { name: 'MySQL', level: 80 },
      { name: 'MinIO', level: 70 },
    ],
  },
  {
    category: 'Security & Algorithms',
    icon: '◌',
    skills: [
      { name: 'AES-256 / Zero-Knowledge', level: 85 },
      { name: 'TOTP / 2FA', level: 82 },
      { name: 'Linear Programming', level: 78 },
      { name: 'OOP / MVC / ETL', level: 88 },
    ],
  },
];

export const PROJECTS: Project[] = [
  {
    title: 'Secure Password Vault',
    description:
      'Full-stack password manager with Zero-Knowledge Architecture — plaintext passwords never leave the browser. AES-GCM 256-bit encryption via Web Crypto API, PBKDF2 key derivation with 200K iterations, TOTP-based 2FA with QR codes, and JWT authentication.',
    tech: ['Next.js', 'React', 'TypeScript', 'Node.js', 'MongoDB', 'Web Crypto API'],
    metrics: 'AES-256 · Zero-Knowledge · 2FA',
    year: '2024',
  },
  {
    title: 'Form Management System',
    description:
      'Web-based enterprise form platform built for DRDO. JSON-driven dynamic schema rendering supports complex multi-section, multi-page, and nested form structures for HR, admin, and IT workflows with robust data integrity.',
    tech: ['PHP', 'MySQL', 'JavaScript', 'HTML/CSS', 'JSON Schema'],
    metrics: 'DRDO · Defense-grade · Production',
    year: '2024',
  },
  {
    title: 'Defense Metadata Pipeline',
    description:
      'Reusable FastAPI backend modules for the Indian Navy (WESEE) extracting and ingesting metadata from 10+ file types (PDF, images, text) across a polyglot storage stack, cutting data processing time by 60%.',
    tech: ['FastAPI', 'Python', 'PostgreSQL', 'MongoDB', 'MinIO'],
    metrics: '60% faster processing · 10+ file types',
    year: '2024',
  },
  {
    title: 'TSP Solver Engine',
    description:
      'Algorithmic solver for the Travelling Salesman Problem using Linear Programming at the Indian Navy, handling 50+ nodes with multi-constraint optimization across cost, time, and distance parameters.',
    tech: ['Python', 'Linear Programming', 'Optimization', 'FastAPI'],
    metrics: '50+ nodes · Multi-constraint',
    year: '2024',
  },
];

export const EXPERIENCES: Experience[] = [
  {
    company: 'DRDO – CFEES',
    role: 'Computer Science Intern',
    period: 'Aug 2025 – Feb 2026',
    bullets: [
      'Developed a web-based Form Management System streamlining digital data collection across departments',
      'Designed JSON-driven dynamic form schemas supporting multi-page, tabular, and nested structures',
      'Built API-driven PHP + MySQL backend for form creation, validation, and secure data storage',
      'Automated organizational workflows for HR, administrative, and IT use cases',
    ],
    tech: ['PHP', 'MySQL', 'JavaScript', 'HTML/CSS', 'JSON Schema', 'REST APIs'],
  },
  {
    company: 'WESEE – Indian Navy',
    role: 'Application Developer Intern',
    period: 'Jul 2024 – Oct 2024',
    bullets: [
      'Built secure, modular defense-grade applications on a polyglot stack (PostgreSQL + MongoDB + MinIO)',
      'Engineered FastAPI modules for metadata extraction from 10+ file types, cutting processing time by 60%',
      'Developed a TSP solver using Linear Programming across 50+ nodes with cost/time/distance constraints',
    ],
    tech: ['FastAPI', 'Python', 'PostgreSQL', 'MongoDB', 'MinIO', 'Linear Programming'],
  },
];

export const SUGGESTED_QUESTIONS = [
  "What internships has Aastha done?",
  "Tell me about the Secure Password Vault project.",
  "What are Aastha's strongest technical skills?",
  "What's her CGPA and education background?",
  "How can I contact Aastha?",
];