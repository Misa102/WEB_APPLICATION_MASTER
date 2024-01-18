import "./App.css";
import HomePage from "./pages/HomePage";
import Login from "./login/login";
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
                    <Route path="/auth/login" exact element={<Login />} />
                    {/* <Route path="/" exact component={QuotesPage} /> */}
                </Routes>
                <Footer />
            </Router>
        </div>
    );
}

export default App;
