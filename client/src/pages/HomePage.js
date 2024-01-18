import React from "react";
import {Link} from "react-router-dom";
import BannerImage from '../assets/background.png';
import '../styles/HomePage.css';

function HomePage(){
    return ( 
     <div className="homePage" >
        <div className="headerContainer" style={{ backgroundImage:`url{${BannerImage}}` }}>
            
            <h1>Citation du jour</h1>
            <p>LES CITATIONS POUR NOUS INSPIRER</p>
            
            <Link to="/citations">
              <button>VISITER</button>
            </Link>
        </div>
     </div>
    
    
    
    );
}

export default HomePage;