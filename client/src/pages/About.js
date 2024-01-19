import React from "react";
import Apropos from "../assets/AProposNavbar.png";
import "../styles/About.css";


function About() {
  return (
    <div className="about">
      <div
        className="aboutTop"
        style={{ backgroundImage: `url(${Apropos})` }}
      ></div>
      <div className="aboutBottom">
        <h2> A PROPOS DE NOUS</h2>
        <p>
            Bienvenue sur notre plateforme dédiée aux citations ! Nous sommes trois passionnées d'informatique étudiant à l'Université de Poitiers, spécialisées en Logiciel et Big Data : Nhu, Lyna et Malek.
        </p>
        <p>
            Sous l'accompagnement du Professeur Karim Benyahia, nous concevons une application web dédiée aux citations dans le cadre de l'UE Architecture Web Application.
        </p>
        <p>
            Rejoignez-nous dans cette aventure captivante pour explorer l'univers des citations à travers notre application. Connectez-vous, explorez, et partagez l'inspiration avec nous!
        </p>
      </div>
    </div>
  );
}

export default About;