// Displays social media link icons in an accessible list
// https://github.com/maybeitsmark 
// 2026

// assets
import linkedin from "@/assets/icons/linkedin.svg";
import github from "@/assets/icons/github.svg";
import codepen from "@/assets/icons/codepen.svg";
// styles
import "./social_icons.css";

const socialIconsData = [
  { name: 'LinkedIn', link: 'https://www.linkedin.com/in/mark-lisanti/', icon: linkedin },
  { name: 'GitHub', link: 'https://github.com/maybeitsmark', icon: github },
  { name: 'CodePen', link: 'https://codepen.io/whoismark', icon: codepen },
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