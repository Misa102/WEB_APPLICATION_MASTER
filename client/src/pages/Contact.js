import React from "react";
import ImageLeft from "../assets/Apropos.png";
import "../styles/Contact.css";

function Contact() {
  return (
    <div className="contact">
      <div
        className="leftSide"
        style={{ backgroundImage: `url(${ImageLeft})` }}
      ></div>
      <div className="rightSide">
        <h1> Contactez-nous</h1>

        <form id="contact-form" method="POST">
          <label htmlFor="name">Nom et Prénom</label>
          <input name="name" placeholder="Entrer votre nom..." type="text" />
          <label htmlFor="email">Email</label>
          <input name="email" placeholder="Entrer votre email..." type="email" />
          <label htmlFor="message">Message</label>
          <textarea
            rows="6"
            placeholder="Enter message..."
            name="message"
            required
          ></textarea>
          <button type="submit"> Envoyer Message</button>
        </form>
      </div>
    </div>
  );
}

export default Contact;