import React, { Component } from "react";
import onlyGuestComponent from "./routes/guards/onlyGuest";

class Login extends Component {
    state = {
        email: "", //user email
        password: "", //user password
        errors: [] //validation errors
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

        if (errors.length !== 0) {
            this.setState({
                errors
            });
        } else {
            //Ajax call to get token and redirect them
            let auth = {
                user: {
                    email: this.state.email,
                    name: "Testing test",
                    loggedIn: true
                },
                token: "asffasdlasdnadj@NQJKNE!IOEJ@O!I"
            };
            this.props.setAuthState(auth);
            this.props.history.push("/profile");
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
            this.state.email.split("").filter(x => x === "@").length !== 1 &&
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
                            >
                                Login
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default onlyGuestComponent(Login);
