import React from "react";
import { Link } from "react-router-dom";

const UserLinks = props => (
    <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
        <ul className="navbar-nav ml-auto">
            <li className="nav-item">
                <Link
                    className="nav-link font-weight-bold btn"
                    role="button"
                    to="/profile"
                >
                    Profile
                </Link>
            </li>
            <li className="nav-item ml-2">
                <a
                    className="nav-link font-weight-bold btn"
                    role="button"
                    onClick={props.logout}
                >
                    Logout
                </a>
            </li>
        </ul>
    </div>
);

export default UserLinks;
