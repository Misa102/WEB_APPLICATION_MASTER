/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

function Footer() {
    return (
        <footer className="text-center text-lg-start bg-body-tertiary text-muted">
            <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
                <div>
                    <a href="" className="me-4 text-reset">
                        <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="" className="me-4 text-reset">
                        <i className="fab fa-twitter"></i>
                    </a>
                    <a href="" className="me-4 text-reset">
                        <i className="fab fa-google"></i>
                    </a>
                    <a href="" className="me-4 text-reset">
                        <i className="fab fa-instagram"></i>
                    </a>
                    <a href="" className="me-4 text-reset">
                        <i className="fab fa-linkedin"></i>
                    </a>
                    <a href="" className="me-4 text-reset">
                        <i className="fab fa-github"></i>
                    </a>
                </div>
            </section>
            <section className="">
                <div className="container text-center text-md-start mt-5">
                    <div className="row mt-3">
                        <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                            <h6 className="text-uppercase fw-bold mb-4">
                                <i className="fas fa-gem me-3"></i> MNL Groupe
                            </h6>
                            <p>
                                Bienvenue à la page des citations de notre groupe. Merci de partager un bon moment avec nous!
                            </p>
                        </div>
                        <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                            <h6 className="text-uppercase fw-bold mb-4">
                                Technologies
                            </h6>
                            <p>
                                <a href="#!" className="text-reset">
                                    React
                                </a>
                            </p>
                            <p>
                                <a href="#!" className="text-reset">
                                    NodeJs
                                </a>
                            </p>
                            <p>
                                <a href="#!" className="text-reset">
                                    Css
                                </a>
                            </p>
                            <p>
                                <a href="#!" className="text-reset">
                                    JavaScript
                                </a>
                            </p>
                            <p>
                                <a href="#!" className="text-reset">
                                    Postman
                                </a>
                            </p>
                            <p>
                                <a href="#!" className="text-reset">
                                    MongoDB
                                </a>
                            </p>
                        </div>
                        <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                            <h6 className="text-uppercase fw-bold mb-4">
                                Notre adresse mail 
                            </h6>
                            <p>
                                <a href="#!" className="text-reset">
                                    nguyen.quynh.nhu.ho@etu.univ-poitiers.fr
                                </a>
                            </p>
                            <p>
                                <a href="#!" className="text-reset">
                                    lyna.kessouri@etu.univ-poitiers.fr
                                </a>
                            </p>
                            <p>
                                <a href="#!" className="text-reset">
                                     malek.sahli@etu.univ-poitiers.fr
                                </a>
                            </p>
                            <p>
                                <a href="#!" className="text-reset">
                                    
                                </a>
                            </p>
                        </div>
                        
                    </div>
                </div>
            </section>
            <div
                className="text-center p-4"
                style={{backgroundColor: 'rgba(0, 0, 0, 0.05)'}}
            >
                © 2024 Copyright : 
                <a className="text-reset fw-bold" href=" ">
                    citationdujour.com
                </a>
            </div>
        </footer>
    );
}

export default Footer;
