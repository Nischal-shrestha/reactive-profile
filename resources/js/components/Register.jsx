import React, { Component } from "react";
import onlyGuestComponent from "./routes/guards/onlyGuest";

class Register extends Component {
    state = {
        name: "",
        email: "", //user email
        password: "", //user password
        rePassword: "", //user re-password
        errors: [] //validation errors
    };

    constructor(props) {
        super(props);
        console.log("register", this.props);
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

        if (errors.length !== 0) {
            this.setState({
                errors
            });
        } else {
            //Ajax call to get register the user, get token and redirect them
            let auth = {
                user: {
                    email: this.state.email,
                    name: this.state.name,
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
                            >
                                Sign Up!
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default onlyGuestComponent(Register);
