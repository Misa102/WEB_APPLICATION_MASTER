import React from "react";
import { Link } from "react-router-dom";
import BannerImage from "../assets/background.png";
import "../styles/HomePage.css";

//import PostList from "../components/PostList";

// export default function HomePage() {
//     return (
//         <PostList/>
//     );
// }



function Home() {
  return (
    <div className="home" style={{ backgroundImage: `url(${BannerImage})` }}>
      <div className="headerContainer">
      <h1>Citations pour tous</h1>
      <p>Les citations nous inspirent</p>
      

      </div>
    </div>
  );
}

export default Home;