import React, { Component } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
/**
 * Components
 */
import Welcome from "../Welcome";
import Login from "../Login";
import Register from "../Register";
import Profile from "../Profile";
import NotFound from "../NotFound";

/**
 * ALl the routes are listed
 * in the component file
 */
class Routes extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Switch>
                <Route
                    exact
                    path="/"
                    render={() => <Welcome {...this.props} />}
                />
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
                    path="/user/:userId/profile"
                    render={() => <Profile {...this.props} />}
                />

                {/* 
                    This Route MUST be at the END
                    Wildcard route catches all other
                    routes that are not declared and
                    displays a 404 page.
                 */}
                <Route path="*" component={NotFound} />
            </Switch>
        );
    }
}

export default withRouter(Routes);
