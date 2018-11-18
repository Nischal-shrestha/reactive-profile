import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Cookies from "universal-cookie";
import axios from "axios";
import Header from "./Header";
import Routes from "./routes";
import Footer from "./Footer";
import { user_data_url, refresh_token_url, logout_url } from "./config";

class App extends Component {
    state = {
        auth: {
            user: {
                id: "",
                email: "",
                name: ""
            },
            loggedIn: false
        }
    };
    isCancelled = false;

    getUserFromToken = () => {
        const cookies = new Cookies();
        const token = cookies.get("JWT");
        if (token && !this.isCancelled) {
            axios
                .post(user_data_url, null, {
                    headers: { Authorization: token }
                })
                .then(response => {
                    //change state of the application to logged in
                    const auth = {
                        user: {
                            id: response.data.user.id,
                            email: response.data.user.email,
                            name: response.data.user.name
                        },
                        loggedIn: true
                    };
                    this.setAuthState(auth);
                })
                .catch(error => {
                    console.log("REFRESH", error);
                    cookies.remove("JWT", { path: "/" });
                });
        }
    };
    /**
     * Check if the user can login
     */
    componentDidMount() {
        const cookies = new Cookies();
        if (!this.state.auth.loggedIn) {
            if (cookies.get("JWT")) {
                this.getUserFromToken();
            }
        }
    }

    componentWillUnmount() {
        this.isCancelled = true;
    }

    /**
     * Recieves a auth state object and sets
     * the current state to that object
     */
    setAuthState = auth => {
        if (!this.isCancelled) {
            this.setState({
                auth
            });
        }
    };

    /**
     * logout from current session
     * TODO: DELETE COOKIE
     */
    logout = () => {
        const cookies = new Cookies();
        /**
         * Send a request to the server to
         * invalidate the token associated
         * with the current user
         */
        const token = cookies.get("JWT");
        if (typeof token !== "undefined") {
            axios
                .post(logout_url, null, {
                    headers: { Authorization: token }
                })
                .then(response => {
                    if (response.data.status === "SUCCESS") {
                        cookies.remove("JWT", { path: "/" });
                        this.setState({
                            auth: {
                                user: {
                                    id: "",
                                    email: "",
                                    name: ""
                                },
                                loggedIn: false
                            }
                        });
                    }
                })
                .catch(error => {
                    console.log("LOGOUT", error);
                });
        }
    };

    render() {
        const { auth } = this.state;
        return (
            <BrowserRouter>
                <div>
                    <Header auth={auth} logout={this.logout} />
                    <Routes
                        auth={auth}
                        setAuthState={this.setAuthState}
                        logout={this.logout}
                        getUserFromToken={this.getUserFromToken}
                    />
                    {/* <Footer /> */}
                </div>
            </BrowserRouter>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("app"));
