import "./App.css";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Outlet,
} from "react-router-dom";
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import Login from "./login/login";
import Contact from "./pages/Contact";
import Register from "./pages/Register";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import QuotesPage from "./pages/QuotesPage";
import EditPost from "./components/post/edit";
import Toast from "./components/toast";
import ManagementUser from "./components/admin/user";
import PrivateRoute from "./components/private-route";

function App() {
    return (
        <>
            <div className="App">
                <Router>
                    <Navbar />
                    <Routes>
                        <Route path="/" exact element={<HomePage />} />
                        <Route path="/auth/login" exact element={<Login />} />
                        <Route path="/quotes" exact element={<QuotesPage />} />
                        <Route path="/about" exact element={<About />} />
                        <Route path="/contact" exact element={<Contact />} />
                        <Route path="/register" exact element={<Register />} />
                        <Route
                            path="/admin/users"
                            exact
                            element={
                                <PrivateRoute>
                                    <ManagementUser />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/quotes/:id"
                            exact
                            element={<EditPost />}
                        />
                    </Routes>
                    <Footer />
                </Router>
                <Toast />
                <Outlet />
            </div>
        </>
    );
}

export default App;
