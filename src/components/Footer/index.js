import React from "react";
import "./index.css";

const Footer = () => {
    return (
        <div className="container-footer">
            <p>
                Made with <i className="fab fa-react"></i> at{" "}
                <a
                    className="link-lereacteur"
                    href="https://www.lereacteur.io/"
                >
                    Le Reacteur
                </a>{" "}
                by{" "}
                <a
                    className="link-mygithub"
                    href="https://github.com/Redskinsjo?tab=repositories"
                >
                    Jonathan
                </a>
            </p>
        </div>
    );
};

export default Footer;
