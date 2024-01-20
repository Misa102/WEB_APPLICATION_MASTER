import "./App.css";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import QuotesPage from "./pages/QuotesPage";
import {BrowserRouter as Router, Route, Routes, Outlet} from 'react-router-dom';
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import Login from "./login/login";

function App() {
  //return <QuotesPage/>;
  //return <HomePage/>;
  return(

    <div className="App">
        <Router>
          <Navbar/>
          <Routes>
            <Route path="/" exact element={<HomePage/>}/>
            <Route path="/auth/login" exact element={<Login/>}/>
            <Route path="/quoutes" exact component={QuotesPage}/>
            <Route path="/about" exact component={About}/>

          </Routes>
          <Footer />

        </Router>
        <Outlet/>
        </div>
    );
}

export default App;
