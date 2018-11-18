import React from "react";
import { Link } from "react-router-dom";
import onlyGuestComponent from "./routes/guards/onlyGuest";
import Hero from "./utilities/Hero";
import Card from "./utilities/Card";

const Welcome = () => {
    return (
        <div className="container">
            <Hero
                title="Welcome!"
                lead="Welcome to Reactive profile, a simple demonstration application
                which uses Laravel
                for the backend, React.js for the frontend."
                body="It also uses JWT (Json Web Tokens) for authentication and
                Axios for api calls. The application stores the Tokens in a
                cookie.
                Sign up below and test it out!"
            >
                <Link
                    className="btn btn-primary btn-lg"
                    to="/register"
                    role="button"
                >
                    Sign Up!
                </Link>
            </Hero>

            <Card
                header="Route Guards"
                title="Importance of guarding the routes"
                body="Guarding private routes which are only accessible after we
                    log in is a feature that is essential in modern web
                    applications. You can test out route guarding by pressing
                    the button below, which tries to access profile page but
                    since only logged in user can access them, the request gets
                    redirected to login page."
            >
                <Link to="/user/1/profile" className="btn btn-primary">
                    Profile
                </Link>
            </Card>
        </div>
    );
};

export default onlyGuestComponent(Welcome);
