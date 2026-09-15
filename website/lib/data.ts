import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const INFO_DIR = path.join(process.cwd(), '..', 'information');

function load<T>(filename: string): T {
  const raw = fs.readFileSync(path.join(INFO_DIR, filename), 'utf8');
  return yaml.load(raw) as T;
}

// ── Types ────────────────────────────────────────────────────────────────────

export interface Contact {
  name: string;
  nick: string;
  email: string;
  github: string;
  linkedin: string;
  telegram: string;
  blog: string;
  website?: string;
  phone: string;
  title: string;
  repo: string;
}

export interface ResearchStatement {
  profiles: string[];
  text: string;
}

export interface ResearchKeyword {
  profiles: string[];
  text: string;
}

export interface Research {
  statements: ResearchStatement[];
  keywords: ResearchKeyword[];
}

export interface WorkItem {
  job: string;
  place: string;
  resp: string;
  start: string;
  end: string;
  profiles: string[];
}

export interface ProjectItem {
  name: string;
  tools: string;
  desc: string;
  link: string;
  start: string | number;
  end: string;
  profiles: string[];
}

export interface EducationItem {
  title: string;
  start: number;
  end: number;
  place: string;
  result: string;
  profiles: string[];
}

export interface EventItem {
  name: string;
  date: string;
  description: string;
  profiles: string[];
}

export interface PublicationItem {
  title: string;
  type: string;
  status: string;
  year: number;
  authors: string[];
  venue?: string;
  abstract: string;
  link?: string;
  profiles: string[];
}

export interface ReportItem {
  title: string;
  type: string;
  status: string;
  year: number;
  authors: string[];
  supervisor?: string;
  institution?: string;
  abstract: string;
  link?: string;
  profiles: string[];
}

export interface ThesisItem {
  title: string;
  degree: string;
  university: string;
  year: number;
  supervisor: string;
  company?: string;
  abstract: string;
  link?: string;
  profiles: string[];
}

export interface Publications {
  items: PublicationItem[];
  reports: ReportItem[];
  theses: ThesisItem[];
}

export interface TeachingItem {
  role: string;
  place: string;
  start: string;
  end: string;
  description: string;
  profiles: string[];
}

export interface SkillItem {
  name: string;
  years: number;
  profiles: string[];
}

export interface LanguageItem {
  name: string;
  level: string;
  profiles: string[];
}

export interface CertificationItem {
  name: string;
  result: string;
  desc: string;
  profiles: string[];
}

// ── Loaders ──────────────────────────────────────────────────────────────────

export function getContact(): Contact {
  return (load<{ contact: Contact }>('contact.yml')).contact;
}

export function getResearch(): Research {
  return (load<{ research: Research }>('research.yml')).research;
}

export function getWork(): WorkItem[] {
  return (load<{ work: { items: WorkItem[] } }>('work.yml')).work.items;
}

export function getProjects(): ProjectItem[] {
  return (load<{ projects: { items: ProjectItem[] } }>('projects.yml')).projects.items;
}

export function getEducation(): EducationItem[] {
  return (load<{ education: { items: EducationItem[] } }>('education.yml')).education.items;
}

export function getEvents(): EventItem[] {
  return (load<{ events: { items: EventItem[] } }>('events.yml')).events.items;
}

export function getPublications(): Publications {
  return (load<{ publications: Publications }>('publications.yml')).publications;
}

export function getTeaching(): TeachingItem[] {
  return (load<{ teaching: { items: TeachingItem[] } }>('teaching.yml')).teaching.items;
}

export function getSkills(): SkillItem[] {
  return (load<{ skills: { items: SkillItem[] } }>('skills.yml')).skills.items;
}

export function getLanguages(): LanguageItem[] {
  return (load<{ languages: { items: LanguageItem[] } }>('languages.yml')).languages.items;
}

export function getCertifications(): CertificationItem[] {
  return (load<{ certifications: { items: CertificationItem[] } }>('certifications.yml')).certifications.items;
}
