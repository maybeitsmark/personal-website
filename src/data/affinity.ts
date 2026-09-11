// Affinity Data
// https://github.com/maybeitsmark 
// 2026

import affinity from '@/assets/images/Affinity/affinity.png';
import logo from '@/assets/images/Affinity/logo.png';
import glove from '@/assets/images/Affinity/glove.png';
import heartrate_sensor from '@/assets/images/Affinity/heartrate_sensor.png';
import mockup from '@/assets/images/Affinity/mockup.png';
import mockup_2 from '@/assets/images/Affinity/mockup_2.png';
import room_layout from '@/assets/images/Affinity/room_layout.png';
import room_layout_2 from '@/assets/images/Affinity/room_layout_2.png';

export const AffinityData: any = {
  title: "Affinity",
  description: "Interactive installation exploring physical awareness through biometric visualization",
  theme: {
    background: {
      color1: "#c7c6c6",
      color2: "#9b9b9b",
      intensity: 0.55,
    },
  },
  tech: "Unity, C#, Arduino, Kinect v2",
  slug: "affinity",
  thumbnail: affinity,
  tags: ["Interactive Installation", "Micro Computing"],
  sections: [
    {
      id: "hero-image",
      type: "image",
      src: logo,
      alt: "Affinity installation",
    },
    {
      id: "tech",
      type: "text",
      content: "Key Technology: Unity, C#, JavaScript, Arduino, Kinect v2, ESP32, Kinect v2, TMP117 Temperature Sensor, MAX30101 Pulse Oximeter & Heart Rate Sensor, MAX32664 Bio Sensor Hub.",
    },
    {
      id: "team",
      type: "text",
      content: "Team: Katherine Gilchrist, Dover Horesh, Mark Lisanti, Melanie Sharif",
    },
    {
      id: "overview-heading",
      type: "heading",
      content: "Overview",
    },
    {
      id: "overview-text",
      type: "text",
      content: "By creating a visual representation of physicality using biometrics such as heart rate, body temperature, oxygen saturation, and body movement, Affinity brings awareness to our physical selves within a shared digital space.",
    },
    {
      id: "system-text",
      type: "text",
      content: "Using a Microsoft Kinect camera, we generated  3D renderings of each participant. Biometric data collected through Arduino powered wearable sensors influenced colors, and animation.",
    },
    {
      id: "video",
      type: "video",
      url: "https://www.youtube.com/watch?v=fXRbemHgRYE",
    },
    {
      id: "thanks-text",
      type: "text",
      content: "HUGE thanks to Ryan Policky for helping capture photos and videos of our project at EXPO",
    },
    {
      id: "journey-heading",
      type: "heading",
      content: "Design Steps",
    },
    {
      id: "journey-text",
      type: "text",
      content: "After defining our vision, we explored the technical stack, installation space, and sensing hardware. The project evolved iteratively.",
    },
    {
      id: "concept-slideshow",
      type: "slideshow",
      images: [
        mockup,
        mockup_2,
        room_layout,
        room_layout_2,
      ],
    },
    {
      id: "concept-caption",
      type: "text",
      content: "Early visual concepts included a divider separating participants. Through testing we found removing this barrier encouraged more natural movement and collaboration within the installation.",
    },
    {
      id: "testing-heading",
      type: "heading",
      content: "User Testing",
    },
    {
      id: "testing-text",
      type: "text",
      content: "Weekly user testing sessions were conducted with a group of dancers. Biometric driven animations were not yet integrated during this phase.",
    },
    {
      id: "hardware-heading",
      type: "heading",
      content: "Biometric Hardware",
    },
    {
      id: "hardware-text",
      type: "text",
      content: "Biometric data was collected using a pulse oximeter, heart rate sensor, temperature sensor, and an ESP32 equipped Arduino. Electronics were housed inside a  3D printed enclosure integrated into a glove, allowing sensor data to be transmitted wirelessly to Unity.",
    },
    {
      id: "hardware-slideshow",
      type: "slideshow",
      images: [
        heartrate_sensor,
        glove,
      ],
    },
    {
      id: "conclusion-text",
      type: "text",
      content:
        "Affinity explored how physiological data can strengthen our awareness of ourselves and others within digital environments. I am grateful for the things I learned while working on this project and for the collaboration with my team.",
    },
  ],
};