// Job Zen Data
// https://github.com/maybeitsmark 
// 2026

import jobzen_thumbnail from '@/assets/images/Jobzen/jobzen_thumbnail.png';
import hero_image from '@/assets/images/Jobzen/hero_image.jpg';
import flow_company from '@/assets/images/Jobzen/flow_company.png';
import flow_user from '@/assets/images/Jobzen/flow_user.png';
import mid_fidelity from '@/assets/images/Jobzen/mid_fidelity.png';
import high_fidelity from '@/assets/images/Jobzen/high_fidelity.png';
import user_notes from '@/assets/images/Jobzen/user_notes.png';

export const JobZenData: any = {
  title: "Job Zen",
  description: "A UX research driven concept to improve online job application experience",
  theme: {
    background: {
      color1: "#616161",
      color2: "#c9c8ca",
      intensity: 0.95,
    },
  },
  tech: "Figma",
  slug: "job-zen",
  thumbnail: hero_image,
  tags: ["UX Research", "Figma", "Visual Design"],
  sections: [
    {
      id: "hero-image",
      type: "image",
      src: jobzen_thumbnail,
      alt: "Job Zen application concept",
    },
    {
      id: "tech",
      type: "text",
      content: "Key Technology: Figma",
    },
    {
      id: "intro",
      type: "text",
      content: "Job Zen is a mobile job search application concept designed to provide job seekers with a centralized experience, clearer information, and greater confidence throughout the application process.",
    },
    {
      id: "background-heading",
      type: "heading",
      content: "Background and Goals",
    },
    {
      id: "background-text",
      type: "text",
      content: "As remote work opportunities expanded during the COVID 19 pandemic, job searching became increasingly digital. At the same time, the number of online application portals grew rapidly, creating challenges around organization, transparency, and usability particularly on mobile devices.",
    },
    {
      id: "goals-text",
      type: "text",
      content: "The project aimed to understand how people search and apply for jobs online, identify common frustrations in the process, and use those findings to inform the design of a more effective mobile experience.",
    },
    {
      id: "research-heading",
      type: "heading",
      content: "User Research & Key Takeaways",
    },
    {
      id: "research-text",
      type: "text",
      content: "Research was conducted through one on one interviews with six participants between the ages of 16 and 30.",
    },
    {
      id: "research-image",
      type: "image",
      src: user_notes,
      alt: "Job Zen research findings",
    },
    {
      id: "research-findings",
      type: "text",
      content: "Participants reported frustration with vague job descriptions, redundant application forms, and a lack of transparency after applying. Many preferred using laptops for applications, relied on multiple job boards, and described the overall process as disorganized and discouraging.",
    },
    {
      id: "flows-heading",
      type: "heading",
      content: "User Flows",
    },
    {
      id: "flows-text",
      type: "text",
      content: "The primary user flow focused on helping users log in, discover relevant opportunities, and complete applications efficiently. Additional flows explored how employers might create and manage job listings.",
    },
    {
      id: "flows-image",
      type: "image",
      src: flow_user,
      alt: "Job Zen user flow diagram",
    },
    {
      id: "employer-image",
      type: "image",
      src: flow_company,
      alt: "Employer posting workflow",
    },
    {
      id: "prototype-heading",
      type: "heading",
      content: "Mid Fidelity Prototyping",
    },
    {
      id: "prototype-text",
      type: "text",
      content: "Iteration and testing led to several design improvements, including reorganizing list cards, adding filters, refining navigation, supporting multiple resumes, and making stylistic adjustments to improve clarity and usability.",
    },
    {
      id: "mid-fidelity-image",
      type: "image",
      src: mid_fidelity,
      alt: "Mid fidelity prototype",
    },
    {
      id: "high-fidelity-image",
      type: "image",
      src: high_fidelity,
      alt: "High fidelity prototype",
    },
    {
      id: "questions-heading",
      type: "heading",
      content: "Design Questions",
    },
    {
      id: "questions-text",
      type: "text",
      content: "The project was guided by several core questions: How might we inspire confidence in online applications? How might we present concise but informative job descriptions? How might we help users stay organized during their search? How might we establish better standards for job posting information? And how might we support users from a variety of professional backgrounds?",
    },
  ],
};