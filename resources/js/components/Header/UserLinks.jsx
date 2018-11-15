import React from "react";
import { Link } from "react-router-dom";

const UserLinks = props => (
    <div class="navbar-collapse collapse w-100 order-3 dual-collapse2">
        <ul class="navbar-nav ml-auto">
            <li class="nav-item">
                <Link
                    className="nav-link font-weight-bold btn"
                    role="button"
                    to="/profile"
                >
                    Profile
                </Link>
            </li>
            <li class="nav-item ml-2">
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
