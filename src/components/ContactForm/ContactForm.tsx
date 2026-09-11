// Renders an interactive email form using EmailJS for backendless message sending
// Personal website and portfolio 
// Mark Lisanti - 2026

import  { useState, useRef, SubmitEvent  } from 'react';
import emailjs from '@emailjs/browser';
// components
import SocialIcons from '../SocialIcons/SocialIcons';
// css
import './contact_form.css';

const ContactForm = () => {
  const form = useRef<HTMLFormElement | null>(null);
  const [buttonText, setButtonText] = useState('Send Message');
  const [buttonStyle, setButtonStyle] = useState({});

  const sendEmail = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.current) return;
    emailjs.sendForm('service_xtktt7b', 'template_jwu0pys', form.current, 'paGw-b_4m1vD028Ql').then((result) => {
        setButtonText('Message Sent \u2714');
        setButtonStyle({ color: 'green' });
      }, (error) => {
        setButtonText('Try again \u2718');
        setButtonStyle({ color: 'red' });
      })
  };

  return (
    <form className="form-container" onSubmit={sendEmail} ref={form}>
        <input className="input" type="text" name="from_name" placeholder="Name" />
        <input className="input" type="text" name="from_info" placeholder="Contact Info" />
        <textarea className="text-area" rows={5} cols={30} name="message" placeholder="Message"></textarea>
        <div className="input-container">
          <button className="button" style={buttonStyle} type="submit">{buttonText}</button>
          <SocialIcons />
        </div>
    </form>
  )
};

export default ContactForm;