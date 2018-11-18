import React, { Component } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import onlyGuestComponent from "./routes/guards/onlyGuest";
import { register_url, register_headers } from "./config";

class Register extends Component {
    state = {
        name: "",
        email: "", //user email
        password: "", //user password
        rePassword: "", //user re-password
        errors: [], //validation errors
        loading: false
    };

    constructor(props) {
        super(props);
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
     * Tries to Register, if successful redirects
     * to user profile else shows error messages
     */
    tryRegister = e => {
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

            axios
                .post(register_url, this.state, { headers: register_headers })
                .then(response => {
                    this.setState({
                        loading: false
                    });
                    //check if the user has been created
                    if (response.data.status === "CREATED") {
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
                                id: response.data.user.id,
                                email: response.data.user.email,
                                name: response.data.user.name
                            },
                            loggedIn: true
                        };
                        this.props.setAuthState(auth);
                    } else {
                        const errors = [];
                        const responseError = response.data.errors;
                        for (var key in responseError) {
                            errors.push(responseError[key].toString());
                        }
                        this.setState({
                            errors
                        });
                    }
                })
                .catch(error => {
                    this.setState({
                        loading: false
                    });
                    console.log("REGISTER", error);
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
        if (this.state.name.length === 0) {
            errors.push("Please enter your full name.");
        }
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
        } else if (this.state.rePassword.length === 0) {
            errors.push("Please retype your password.");
        } else if (this.state.password !== this.state.rePassword) {
            errors.push("Your passwords do not match");
        }
        if (this.state.password.length > 0 && this.state.password.length < 6) {
            errors.push("Your password must be atleast 6 characters long");
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
                            Register
                        </h3>
                    </div>
                    <div className="col-md-4 offset-md-4 mt-3">
                        {this.state.errors.length != 0 && this.displayErrors()}

                        <form>
                            <div className="form-group">
                                <label htmlFor="email">Full Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    placeholder="Your full name"
                                    onChange={this.handleInput}
                                />
                            </div>
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
                            <div className="form-group">
                                <label htmlFor="rePassword">
                                    Re-type Password
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="rePassword"
                                    placeholder="Retype Password"
                                    onChange={this.handleInput}
                                />
                            </div>
                            <button
                                onClick={this.tryRegister}
                                type="submit"
                                className="btn btn-primary"
                                disabled={loading}
                            >
                                {loading ? "Signing you up...." : "Sign Up!"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default onlyGuestComponent(Register);
