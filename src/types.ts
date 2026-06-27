export interface CafeSoArticle {
  id: string;
  slug: string;
  title: string;
  analogy: string; // The real-life analogy used to make it easy to understand
  summary: string;
  content: string; // Markdown or rich HTML description
  category: string;
  tags: string[];
  readingTime: string;
}

export interface CaseStudyProposal {
  id: string;
  slug: string;
  title: string;
  industry: string;
  background: string;
  problems: string[];
  analysis: string;
  opportunities: string[];
  suggestedStructure: {
    title: string;
    description: string;
    sections: string[];
  };
  businessWorkflow: string; // Description or step-by-step
  customerJourney: string[]; // Steps of the journey
  digitalAssetStrategy: string;
  suggestedFeatures: string[];
  expectedResults: string[];
}

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  category: "business" | "landing" | "profile" | "portfolio";
  categoryLabel: string;
  description: string;
  features: string[];
  goals: string;
  industry: string;
  imageUrl: string;
  techStack: string[];
}

export interface IndustrySolution {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  problems: string[];
  benefits: string[];
  suggestedStructure: {
    name: string;
    pages: { name: string; purpose: string }[];
  };
  features: string[];
  customerJourney: string[];
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: "Website" | "SEO" | "Digital Assets" | "Business Strategy" | "Conversion" | "Content Marketing" | "Lead Generation";
  summary: string;
  content: string;
  tags: string[];
  date: string;
  readingTime: string;
  popular?: boolean;
}

export interface ResourceChecklist {
  id: string;
  slug: string;
  title: string;
  description: string;
  items: { text: string; category: string }[];
}
