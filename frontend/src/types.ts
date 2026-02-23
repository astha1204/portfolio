export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface ChatResponse {
  response: string;
  session_id: string;
}

export interface Skill {
  name: string;
  level: number; // 0-100
}

export interface SkillCategory {
  category: string;
  icon: string;
  skills: Skill[];
}

export interface Project {
  title: string;
  description: string;
  tech: string[];
  metrics?: string;
  github?: string;
  live?: string;
  year: string;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  bullets: string[];
  tech: string[];
}
