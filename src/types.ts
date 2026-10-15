export interface JobExperience {
  title: string;
  company: string;
  period: string;
  featured?: boolean;
  bullets: string[];
}

export interface ProjectItem {
  tag: string;
  title: string;
  description: string;
  metrics?: string;
  skills: string[];
}

export interface ServiceItem {
  title: string;
  description: string;
  iconName: string;
  tags: string[];
}

export interface ContactFormData {
  name: string;
  email: string;
  company: string;
  service: string;
  worktype: string;
  timezone: string;
  message: string;
}
