import React from "react";
import { Link } from "react-router-dom";

const GuestLinks = props => {
    return (
        <ul className="navbar-nav ml-auto">
            <li className="nav-item mr-4">
                <Link
                    className="nav-link font-weight-bold"
                    role="button"
                    to="/"
                >
                    Home
                </Link>
            </li>
            <li className="nav-item mr-4">
                <Link
                    className="nav-link font-weight-bold"
                    role="button"
                    to="/login"
                >
                    Login
                </Link>
            </li>
            <li className="nav-item">
                <Link
                    className="nav-link font-weight-bold"
                    role="button"
                    to="/register"
                >
                    Register
                </Link>
            </li>
        </ul>
    );
};

export default GuestLinks;
