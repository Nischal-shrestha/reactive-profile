import React from "react";
import { Link } from "react-router-dom";
import GuestLinks from "./GuestLinks";
import UserLinks from "./UserLinks";

const Header = props => {
    console.log("Header", props);
    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark navbar-laravel">
            <div className="container">
                <div className="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
                    <Link className="navbar-brand" to="/">
                        Reactive Profile
                    </Link>

                    {props.auth.loggedIn === false && <GuestLinks {...props} />}
                    {props.auth.loggedIn === true && (
                        <UserLinks
                            logout={props.logout}
                            user_id={props.auth.user.id}
                        />
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Header;
