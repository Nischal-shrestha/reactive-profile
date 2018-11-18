import React from "react";
import { Link } from "react-router-dom";

const UserLinks = props => {
    const profile_url = "/user/" + props.user_id + "/profile";
    return (
        <ul className="navbar-nav ml-auto">
            <li className="nav-item mr-4">
                <Link
                    className="nav-link font-weight-bold"
                    role="button"
                    to={profile_url}
                >
                    Profile
                </Link>
            </li>
            <li className="nav-item">
                <a
                    className="nav-link font-weight-bold cur-pointer"
                    role="button"
                    onClick={props.logout}
                >
                    Logout
                </a>
            </li>
        </ul>
    );
};

export default UserLinks;
