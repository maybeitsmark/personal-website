// Displays social media link icons in an accessible list

// assets
import linkedin from "@/assets/icons/linkedin.png";
import github from "@/assets/icons/github.svg";
import codepen from "@/assets/icons/codepen.svg";
import instagram from "@/assets/icons/instagram.png";
import medium from "@/assets/icons/medium.png";
import spotify from "@/assets/icons/spotify.png";
// styles
import "./social_icons.css";

const socialIconsData = [
  { name: 'LinkedIn', link: 'https://www.linkedin.com/in/mark-lisanti/', icon: linkedin },
  { name: 'GitHub', link: 'https://github.com/maybeitsmark', icon: github },
  { name: 'CodePen', link: 'https://codepen.io/whoismark', icon: codepen },
  { name: 'Instagram', link: 'https://www.instagram.com/staysleepy/', icon: instagram },
  { name: 'Medium', link: 'https://medium.com/@whoismark', icon: medium },
  { name: 'Spotify', link: 'https://open.spotify.com/user/ml4469', icon: spotify },
];

const SocialIcons = () => {
  return (
    <div className="icon-container">
      {socialIconsData.map(({ name, link, icon }) => (
        <a key={name} href={link} rel="noopener noreferrer" target="_blank">
          <img className="icon" src={icon} alt={name} />
        </a>
      ))}
    </div>
  );
};

export default SocialIcons;