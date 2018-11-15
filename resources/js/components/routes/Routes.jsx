import React, { Component } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import Login from "../Login";
import Register from "../Register";
import Profile from "../Profile";

/**
 * ALl the routes are listed
 * in the component file
 */
class Routes extends Component {
    constructor(props) {
        super(props);
        console.log("routes", props);
    }

    render() {
        return (
            <Switch>
                <Route
                    exact
                    path="/login"
                    render={() => <Login {...this.props} />}
                />
                <Route
                    exact
                    path="/register"
                    render={() => <Register {...this.props} />}
                />
                <Route
                    exact
                    path="/profile"
                    render={() => (
                        <Profile
                            auth={this.props.auth}
                            logout={this.props.logout}
                        />
                    )}
                />
            </Switch>
        );
    }
}

export default withRouter(Routes);
