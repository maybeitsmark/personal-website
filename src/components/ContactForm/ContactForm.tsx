// Personal website and portfolio  //
// 2026                            //
// Built by Mark Lisanti           //
// https://github.com/maybeitsmark //

import  { useState, useRef, SubmitEvent  } from 'react'
import emailjs from '@emailjs/browser';

import './ContactForm.css';

const ContactForm = () => {
  const form = useRef<HTMLFormElement | null>(null);
  const [buttonText, setButtonText] = useState('Send Message');
  const [buttonStyle, setButtonStyle] = useState({});

  const sendEmail = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.current) return;
    emailjs.sendForm('service_xtktt7b', 'template_jwu0pys', form.current, 'paGw-b_4m1vD028Ql')
      .then((result) => {
        console.log(result.text);
        setButtonText('Message Sent \u2714');
        setButtonStyle({ color: 'green' });
      }, (error) => {
        console.log(error.text);
        setButtonText('Try again \u2718');
        setButtonStyle({ color: 'red' });
      })
  };

  return (
    <form className="form-container" onSubmit={sendEmail} ref={form}>
        <p className="title">𝙇𝑒𝒕𝘴 𝑡𝘢𝒍𝐤 𝒂𝙗𝒐𝒖𝑡 𝙛𝒆𝘦𝑙𝘪𝒏𝐠𝒔...</p>
        <input className="input"
          type="text"
          name="from_name"
          placeholder="Name"
        />
        <input className="input"
          type="text"
          name="from_info"
          placeholder="Email / Social Media"
        />
        <textarea className="text-area"
          rows={5}
          cols={30}
          name="message"
          placeholder="Message"
        ></textarea>
        <div className="input-container">
          <button className="button" style={buttonStyle} type="submit">{buttonText}</button>
        </div>
    </form>
  )
};

export default ContactForm;