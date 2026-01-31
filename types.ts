export interface ContactInfo {
  phone: string;
  email: string;
  location?: string;
}

export interface Education {
  school: string;
  degree: string;
  duration: string;
  details: string[];
  certifications?: Array<{
    name: string;
    link: string;
  }>;
}

export interface Experience {
  title: string;
  role: string;
  duration: string;
  description: string[];
  link?: {
    label: string;
    url: string;
  };
  tags?: string[];
}

export interface SkillSet {
  category: string;
  items: string[];
}
