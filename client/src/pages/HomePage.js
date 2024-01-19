import React from "react";
import PostList from "../components/post/list";
import SavePost from "../components/post/save";

export default function HomePage() {
    return (
        <>
            <PostList/>
            <SavePost/>
        </>
    );
}
// import { Link } from "react-router-dom";
// import BannerImage from "../assets/background.png";
// import "../styles/HomePage.css";

// import PostList from "../components/PostList";

// export default function HomePage() {
//     return (
//         <PostList/>
//     );
// }



// function Home() {
//   return (
//     <div className="home" style={{ backgroundImage: `url(${BannerImage})` }}>
//       <div className="headerContainer">
//       <h1>Citations pour tous</h1>
//       <p>Les citations nous inspirent</p>
      

//       </div>
//     </div>
//   );
// }

// export default Home;