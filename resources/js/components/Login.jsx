import React, { Component } from "react";
import axios from "axios";
import Cookie from "universal-cookie";
import onlyGuestComponent from "./routes/guards/onlyGuest";
import { login_url, logout_url, login_headers } from "./config";
import Cookies from "universal-cookie";

class Login extends Component {
    state = {
        email: "", //user email
        password: "", //user password
        errors: [], //validation errors
        loading: false
    };

    constructor(props) {
        super(props);
        console.log("Login", props);
    }

    /**
     * Saves form text input field value
     * onto the component state onChange
     */
    handleInput = e => {
        this.setState({
            [e.target.id]: e.target.value
        });
    };

    /**
     * Tries to login, if successful redirects
     * to user profile else shows error messages
     * TODO : ADD THE JWT TOKEN TO THE COOKIE
     */
    tryLogin = e => {
        e.preventDefault();

        const errors = this.validateFields();
        const cookies = new Cookies();

        if (errors.length !== 0) {
            this.setState({
                errors
            });
        } else {
            this.setState({
                loading: true
            });
            /**
             * Make a async call to login and get token plus user details
             */
            axios
                .post(login_url, this.state, { headers: login_headers })
                .then(response => {
                    this.setState({
                        loading: false
                    });
                    if (response.data.status === "SUCCESS") {
                        //set cookie
                        cookies.set(
                            "JWT",
                            response.data.token_type +
                                response.data.access_token,
                            { path: "/" }
                        );

                        //change state of the application to logged in
                        let auth = {
                            user: {
                                email: response.data.user.email,
                                name: response.data.user.name,
                                loggedIn: true
                            }
                        };
                        this.props.setAuthState(auth);
                    } else {
                        const errors = [];
                        errors.push(response.data.error.message);
                        this.setState({
                            errors
                        });
                    }
                })
                .catch(error => {
                    this.setState({
                        loading: false
                    });
                    console.log("LOGIN", error);
                });
        }
    };

    /**
     * Validates the fields in the form
     * populates and returs the error
     * array if any errors occours
     */
    validateFields = () => {
        let errors = [];
        if (this.state.email.length === 0) {
            errors.push("Please enter your email.");
        } else if (
            this.state.email.split("").filter(x => x === "@").length === 1 &&
            this.state.email.indexOf(".") === -1
        ) {
            errors.push("Invalid email format.");
        }

        if (this.state.password.length === 0) {
            errors.push("Please enter your password.");
        }

        return errors;
    };

    /**
     * Maps through the errors array in the
     * state and displays them in alert boxes
     */
    displayErrors = () => {
        const { errors } = this.state;
        return errors.map(error => {
            return (
                <div className="alert alert-danger form-alert " key={error}>
                    {error}
                </div>
            );
        });
    };

    /**
     * Component Render
     */
    render() {
        let loading = this.state.loading;
        return (
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-4 offset-md-4 border-bottom border-dark text-off-black">
                        <h3 className="text-uppercase font-weight-bold pb-2 ">
                            Login
                        </h3>
                    </div>
                    <div className="col-md-4 offset-md-4 mt-3">
                        {this.state.errors.length != 0 && this.displayErrors()}

                        <form>
                            <div className="form-group">
                                <label htmlFor="email">Email address</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    placeholder="Enter email"
                                    onChange={this.handleInput}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    placeholder="Password"
                                    onChange={this.handleInput}
                                />
                            </div>

                            <button
                                onClick={this.tryLogin}
                                type="submit"
                                className="btn btn-primary"
                                disabled={loading}
                            >
                                {loading ? "Loading..." : "Login"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default onlyGuestComponent(Login);
