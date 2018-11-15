import React from "react";
import { Link } from "react-router-dom";

const GuestLinks = props => {
    return (
        <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link
                        className="nav-link font-weight-bold"
                        role="button"
                        to="/login"
                    >
                        Login
                    </Link>
                </li>
                <li className="nav-item ml-2">
                    <Link
                        className="nav-link font-weight-bold"
                        role="button"
                        to="/register"
                    >
                        Register
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default GuestLinks;
