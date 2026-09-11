// Represents the About section of the website
// Includes a brief introduction and contact information
// Personal website and portfolio 
// Mark Lisanti - 2026   

const About = () => {
  const about = `I'm a creative developer and artist who loves building interactive experiences that combine code, design, and a bit of experimentation.
  I enjoy working on projects that connect the digital and physical worlds from web experiences and creative tools to installations and fabricated objects. 
  I'm always excited to learn something new, tackle unusual challenges, and bring ideas from sketchbook concepts to finished products.`;

  const call = `Interested in working together or just want to say hello? Feel free to reach out.`

  return (
    <div>
      <h1>Who is Mark?</h1>
      <h4>ˢᴼᶠᵀᵂᴬᴿᴱ - ᴬᴿᵀ - ᶠᴬᴮᴿᴵᶜᴬᵀᴵᴼᴺ</h4>
      <p>{about}</p>
      <p>{call}</p>
    </div>
  );
};

export default About; 
