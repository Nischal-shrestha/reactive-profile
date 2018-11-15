import React, { Component } from "react";
import { withRouter } from "react-router-dom";

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
            console.log("onlyLoggedIn", props);
        }

        isLoggedIn = () => {
            if (this.props.auth.user.loggedIn !== true) {
                this.props.history.push("/login");
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
