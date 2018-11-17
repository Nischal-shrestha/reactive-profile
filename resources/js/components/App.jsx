import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Cookie from "universal-cookie";
import axios from "axios";
import Header from "./Header";
import Routes from "./routes/Routes";
import { logout_url } from "./config";

class App extends Component {
    state = {
        auth: {
            user: {
                email: "test@test.com",
                name: "Testing Test",
                loggedIn: false
            }
        }
    };

    /**
     * Recieves a auth state object and sets
     * the current state to that object
     */
    setAuthState = auth => {
        this.setState({
            auth
        });
    };

    /**
     * logout from current session
     * TODO: DELETE COOKIE
     */
    logout = () => {
        const cookies = new Cookie();
        //logout
        axios
            .post(logout_url, null, {
                headers: { Authorization: cookies.get("JWT") }
            })
            .then(response => {
                console.log(response);
                if (response.data.status === "SUCCESS") {
                    cookies.remove("JWT");
                    this.setState({
                        auth: {
                            user: {
                                email: "",
                                name: "",
                                loggedIn: false
                            }
                        }
                    });
                } else {
                    alert("Failed to logout.");
                }
            })
            .catch(error => {
                console.log("LOGOUT", error);
            });
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
                    />
                </div>
            </BrowserRouter>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("app"));
