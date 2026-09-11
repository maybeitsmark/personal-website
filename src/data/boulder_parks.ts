// Boulder Parks Data
// https://github.com/maybeitsmark 
// 2026     
          
import boulder_parks from '@/assets/images/BoulderParks/boulder_parks.jpg';
import initial_laser_cut from '@/assets/images/BoulderParks/initial_laser_cut.jpg';
import initial_laser_cut_2 from '@/assets/images/BoulderParks/initial_laser_cut_2.jpg';
import etch from '@/assets/images/BoulderParks/etch.jpg';
import test_fit from '@/assets/images/BoulderParks/test_fit.jpg';
import paint from '@/assets/images/BoulderParks/paint.jpg';
import paint_2 from '@/assets/images/BoulderParks/paint_2.jpg';
import paint_3 from '@/assets/images/BoulderParks/paint_3.jpg';
import led_test from '@/assets/images/BoulderParks/led_test.jpg';
import assembly from '@/assets/images/BoulderParks/assembly.jpg';
import assembly_2 from '@/assets/images/BoulderParks/assembly_2.jpg';
import assembly_3 from '@/assets/images/BoulderParks/assembly_3.jpg';
import final from '@/assets/images/BoulderParks/final.jpg';
import map_screenshot from '@/assets/images/BoulderParks/map_screenshot.png';

export const BoulderParksData: any = {
  title: "Boulder Parks",
  description: "Interactive map outlining the importance of going outside",
  theme: {
    background: {
      color1: "#2b6337",
      color2: "#078522",
      intensity: 0.85,
    },
  },
  tech: "Firebase, Python, Arduino, React, Le Potato (Micro Computer), Arduino Uno",
  slug: "boulder-parks",
  thumbnail: boulder_parks,
  tags: ["Fabrication", "Web Development", "Interactive Installation", "Micro Computing"],
  sections: [
    {
      id: "hero-image",
      type: "image",
      src: map_screenshot,
      alt: "Interactive Boulder Parks map",
    },
    {
      id: "tech",
      type: "text",
      content: "Key Technology: Firebase, Python, Arduino, React, Le Potato (Micro Computer), Arduino Uno",
    },
    {
      id: "intro-1",
      type: "text",
      content: "Interactive map created to raise awareness about the significance of green spaces and the availability of parks throughout Boulder. Constructed from scrap wood, the installation can be accessed from any device with location services enabled.",
    },
    {
      id: "intro-2",
      type: "text",
      content: "Boulder is home to a wealth of parks and open spaces that provide significant benefits to residents and visitors alike. This project was designed to promote accessibility and encourage exploration by connecting a physical map with a digital experience that highlights individual parks and open spaces.",
    },
    {
      id: "video",
      type: "video",
      url: "https://youtu.be/6n3zG3Fx4qk",
    },
    {
      id: "led-heading",
      type: "heading",
      content: "Controlling the LEDs",
    },
    {
      id: "led-text",
      type: "text",
      content: "Interacting with the map does not require an app or Bluetooth connection. Any device with location services can access the website, illuminate LEDs on the physical map, and learn more about individual parks. This is accomplished through a real time database hosted on Firebase. Hardware connected to the LEDs listens for changes in the database and updates the lighting state accordingly.",
    },
    {
      id: "build-heading",
      type: "heading",
      content: "The Build",
    },
    {
      id: "build-text",
      type: "text",
      content: "The project began in Adobe Illustrator, where the map artwork and fabrication plans were created. Using reclaimed 1/8-inch plywood scraps, the components were laser cut, etched, painted, wired, and assembled by hand. A combination of experimentation, fabrication techniques, and a bit of careful eyeballing helped shape the final installation.",
    },
    {
      id: "slideshow",
      type: "slideshow",
      images: [
        initial_laser_cut,
        initial_laser_cut_2,
        etch,
        test_fit,
        paint,
        paint_2,
        paint_3,
        led_test,
        assembly,
        assembly_2,
        assembly_3,
        final,
        boulder_parks,
      ],
    },
    {
      id: "credits",
      type: "text",
      content: "Special thanks to Annie Margaret at CU Boulder for assistance with research methods and for providing the opportunity to develop and exhibit this project. You can find this project living in the BTU lab at the University of Colorado Boulder.",
    },
  ],
};