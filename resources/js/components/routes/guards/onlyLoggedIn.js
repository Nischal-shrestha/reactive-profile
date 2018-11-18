import React, { Component } from "react";
import Cookie from "universal-cookie";
import { withRouter } from "react-router-dom";
import Cookies from "universal-cookie";

/**
 * A High Level Component (HOC) that
 * redirectes a guests to /login if
 * they are already not authenticated
 *
 * ONLY TO USE IN PRIVATE ROUTE COMPONENTS
 */
export default GuardedComponent => {
    class onlyLoggedInComponent extends Component {
        constructor(props, context) {
            super(props, context);
        }

        isLoggedIn = () => {
            const cookies = new Cookies();
            const token = cookies.get("JWT");
            if (!this.props.auth.loggedIn) {
                if (typeof token === "undefined") {
                    this.props.history.push("/login");
                }
            }
        };

        componentWillMount = () => {
            this.isLoggedIn();
        };
        componentDidUpdate(prevProps, prevState) {
            this.isLoggedIn();
        }

        render() {
            return <GuardedComponent {...this.props} />;
        }
    }

    return withRouter(onlyLoggedInComponent);
};
