import "./App.css";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./login/login";
import Register from "./pages/Register";
import QuotesPage from "./pages/QuotesPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";

function App() {
    return (
        <div className="App">
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" exact element={<HomePage />} />
                    <Route path="/quotes" exact element={<QuotesPage />} />
                    <Route path="/about" exact element={<About />} />
                    <Route path="/contact" exact element={<Contact />} />
                    <Route path="/auth/login" exact element={<Login />} />
                    <Route path="/register" exact element={<Register/>}/>
                </Routes>
                <Footer />
            </Router>
        </div>
    );
}

export default App;
