// Nihilism Data
// https://github.com/maybeitsmark 
// 2026

import nihilism from '@/assets/images/Nihilism/nihilism.png';
import nihilism_hero from '@/assets/images/Nihilism/nihilism_hero.png';
import beat1 from '@/assets/images/Nihilism/beat1.jpg';
import expo from '@/assets/images/Nihilism/expo.jpg';
import maker_made1 from '@/assets/images/Nihilism/maker_made1.jpg';
import maker_made2 from '@/assets/images/Nihilism/maker_made2.jpg';

export const NihilismData: any = {
  title: "Nihilism",
  description: "Interactive sound and visual - reflective art installation.",
  theme: {
    fontFamily: '"Mainframe", sans-serif',
    background: {
      color1: "#4a6dad",
      color2: "#97180d",
      intensity: 0.75,
    },
  },
  tech: "TouchDesigner, KinectV2, GLSL",
  slug: "nihilism",
  thumbnail: nihilism,
  tags: ["Interactive Installation", "Art", "Touch Designer"],
  sections: [
    {
      id: "hero-image",
      type: "image",
      src: nihilism_hero,
      alt: "Nihilism installation preview",
    },
    {
      id: "tech",
      type: "text",
      content: "Key Technology: TouchDesigner, KinectV2, GLSL",
    },
    {
      id: "intro-1",
      type: "text",
      content: "The themes and effects of this experience are inspired by Huntington's Disease, an inherited disorder that causes nerve cells in parts of the brain to gradually break down and die.",
    },
    {
      id: "intro-2",
      type: "text",
      content: "Existential dread can take many forms and may be unique to each individual. For many, it is easy to spiral into hopelessness. Through interaction with a rendered version of yourself, Nihilism is a journey into these feelings, albeit uncomfortable, I hope it can be a moment of reflection.",
    },
    {
      id: "video",
      type: "video",
      url: "https://youtu.be/IGaKpsVkoLo",
    },
    {
      id: "system-heading",
      type: "heading",
      content: "How the system works",
    },
    {
      id: "system-text",
      type: "text",
      content: "During the experience, the user has either 30 or 60 seconds before their image turns to static, indicating they have 'died' or disappeared. Noise from Conway's Game of Life removes pixels over time, making the user's form become more static. The chance to live for 60 seconds is 50%, like the chance of inheriting Huntington's disease from a sick parent. The image always faces the user, and turning away causes it to slowly rotate back. Smiling causes glitches and depressing quotes appear.",
    },
    {
      id: "slideshow",
      type: "slideshow",
      images: [beat1, expo, maker_made1, maker_made2],
    },
    {
      id: "credits",
      type: "text",
      content: "Developed using TouchDesigner and a Microsoft Kinect v2. A huge thanks to the Colorado University's ATLAS community for the encouragement and Justin Gitlin for advising on this project.",
    },
  ],
};