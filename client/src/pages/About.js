import React from 'react'
import AI from "../assets/aboutImg.png";
import "../styles/About.css";

function About() {
  return (
    <div className='about'>
        <div className='aboutTop' 
             style={{ backgroundImage: `url(${AI})` }}>

             </div>
        <div className='aboutBottom'>
            <h1>A PROPOS DE NOUS</h1>
            <p>
            Bienvenue sur notre plateforme dédiée aux citations ! Nous sommes trois passionnées d'informatique étudiant à l'Université de Poitiers, spécialisées en Logiciel et Big Data : Nhu, Lyna et Malek.
            Sous l'accompagnement du Professeur Karim Benyahia, nous concevons une application web dédiée aux citations dans le cadre de l'UE Architecture Web Application.
            </p>
            <p>
            Rejoignez-nous dans cette aventure captivante pour explorer l'univers des citations à travers notre application. Connectez-vous, explorez, et partagez l'inspiration avec notre communauté !
            </p>
        </div>
        
      
    </div>
  );
}

export default About;