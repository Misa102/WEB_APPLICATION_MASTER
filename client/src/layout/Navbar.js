import { Link } from "react-router-dom";
import authUtils from "../utils/auth.util";
import SearchPost from "../components/search";

function AdminPage() {
    const isAdmin = authUtils.isAdmin();
    if (isAdmin) {
        return (
            <>
                <Link className="nav-item nav-link" to="/admin/users">
                    Gestion d'utilisateurs
                </Link>
            </>
        );
    }
}

function StateLogin() {
    const isLogin = authUtils.isLogin();
    const user = authUtils.getUser();

    function onSignOut(e) {
        e.preventDefault();
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        window.location.reload();
    }

    if (isLogin) {
        return (
            <>
                <div className="navbar-nav ms-lg-4">
                    <span className="nav-item nav-link">
                        Bienvenue, {user.username}
                    </span>
                </div>
                <div
                    className="navbar-nav ms-lg-4"
                    role="button"
                    onClick={onSignOut}
                >
                    <span className="nav-item nav-link">Déconnexion</span>
                </div>
            </>
        );
    }
    return (
        <>
            <div className="navbar-nav ms-lg-4">
                <Link className="nav-item nav-link" to="/auth/login">
                    Connexion
                </Link>
            </div>
            <div className="d-flex align-items-lg-center mt-3 mt-lg-0">
                <Link
                    className="btn btn-sm btn-primary w-full w-lg-auto"
                    to="/auth/register"
                >
                    S'inscrire
                </Link>
            </div>
        </>
    );
}

function Navbar() {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-0 py-3">
                <div className="container-xl">
                    <Link className="navbar-brand" to="/">
                        <img
                            src="https://preview.webpixels.io/web/img/logos/clever-light.svg"
                            className="h-8"
                            alt="..."
                        />
                    </Link>
                    <SearchPost/>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarCollapse"
                        aria-controls="navbarCollapse"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div
                        className="collapse navbar-collapse"
                        id="navbarCollapse"
                    >
                        <div className="navbar-nav mx-lg-auto">
                            <Link
                                className="nav-item nav-link active"
                                aria-current="page"
                                to="/"
                            >
                                Accueil
                            </Link>

                            <Link className="nav-item nav-link" to="/quotes">
                                Citations
                            </Link>

                            <Link className="nav-item nav-link" to="/about">
                                A Propos
                            </Link>

                            <Link className="nav-item nav-link" to="/contact">
                                Contact
                            </Link>
                            <AdminPage />
                        </div>

                        <StateLogin />
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;
