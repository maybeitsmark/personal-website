// Fuck You Sign Data
// https://github.com/maybeitsmark 
// 2026

import banner from '@/assets/images/FuckYouSign/banner.jpg';
import fuck_you_sign from '@/assets/images/FuckYouSign/fuck_you_sign.png';
import face_detection from '@/assets/images/FuckYouSign/face_detection.jpg';
import laser_cut from '@/assets/images/FuckYouSign/laser_cut.jpg';
import glue_up from '@/assets/images/FuckYouSign/glue_up.jpg';
import circuit_test from '@/assets/images/FuckYouSign/circuit_test.jpg';
import light_test from '@/assets/images/FuckYouSign/light_test.JPG';
import assembly from '@/assets/images/FuckYouSign/assembly.jpg';
import complete from '@/assets/images/FuckYouSign/complete.jpg';

export const FuckYouSignData: any = {
  title: "Fuck You Sign",
  description: "Fun sign that may or may not give you the finger",
  theme: {
    background: {
      color1: "#ac09d4",
      color2: "#9b62db",
      intensity: 0.85,
    },
  },
  tech: "Python, OpenCV",
  hardware: "Raspberry Pi, NeoPixel LEDs",
  slug: "fuck-you-sign",
  thumbnail: complete,
  tags: ["Interactive Installation", "Fabrication", "Micro Computing", "Art"],
  sections: [
    {
      id: "hero-image",
      type: "image",
      src: banner,
      alt: "Fuck You Sign Banner",
    },
    {
      id: "intro-1",
      type: "text",
      content: "An animated edge lit sign that lets you know how I really feel, just kidding. Inspired by classic animated LED signage, the piece cycles through multiple lighting states to create a playful and intentionally over the top interaction.",
    },
    {
      id: "tech",
      type: "text",
      content: "Key Technology: Python, OpenCV, Raspberry Pi, NeoPixel LEDs",
    },
    {
      id: "intro-2",
      type: "text",
      content: "Semiotic devices are powerful tools for communication, though this one certainly isn't necessary. Sometimes 'flipping the bird' can simply be a harmless joke. Using a Raspberry Pi, camera, and OpenCV, the sign watches for nearby faces and changes its animation whenever someone looks in its direction.",
    },
    {
      id: "video",
      type: "video",
      url: "https://www.youtube.com/watch?v=T_4N4yJ2iH0",
    },
    {
      id: "video",
      type: "video",
      url: "https://www.youtube.com/watch?v=6_zEE5xMQhM",
    },
    {
      id: "build-heading",
      type: "heading",
      content: "The Build",
    },
    {
      id: "build-text",
      type: "text",
      content: "The artwork and fabrication plans were created in Adobe Illustrator before being laser cut from 1/8-inch plywood. After test fitting the components, the enclosure was assembled using a combination of wood glue, soldering, and a healthy amount of careful eyeballing. The NeoPixel lighting and control electronics were then installed inside the enclosure to complete the display.",
    },
    {
      id: "slideshow",
      type: "slideshow",
      images: [
        face_detection,
        laser_cut,
        glue_up,
        assembly,
        light_test,
        circuit_test,
        fuck_you_sign,
      ],
    },
    {
      id: "credits",
      type: "text",
      content: "Special thanks to Zach Weaver at CU Boulder for providing a space where I could build such a ridiculous little project and for giving the finished sign a home.",
    },
  ],
};