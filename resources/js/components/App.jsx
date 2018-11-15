import React, { Component } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Header from "./Header";
import Routes from "./routes/Routes";

class App extends Component {
    state = {
        auth: {
            user: {
                email: "test@test.com",
                name: "Testing Test",
                loggedIn: false
            },
            token: ""
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
        this.setState({
            auth: {
                user: {
                    email: "",
                    name: "",
                    loggedIn: false
                },
                token: ""
            }
        });
        console.log("Logout");
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
