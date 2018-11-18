import React from "react";
import { Link } from "react-router-dom";
import GuestLinks from "./GuestLinks";
import UserLinks from "./UserLinks";

const Header = props => {
    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark navbar-laravel">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    Reactive Profile
                </Link>
                <button
                    className="navbar-toggler collapsed"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbar"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>
                <div id="navbar" className="navbar-collapse collapse">
                    {props.auth.loggedIn ? (
                        <UserLinks
                            logout={props.logout}
                            user_id={props.auth.user.id}
                        />
                    ) : (
                        <GuestLinks {...props} />
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Header;
