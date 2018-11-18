import React, { Component } from "react";
import { withRouter } from "react-router-dom";

/**
 * A High Level Component (HOC) that
 * redirectes a user to /profile if
 * they are already logged in
 *
 * ONLY TO USE IN EXCLUSIVE GUEST COMPONENT
 */
export default GuardedComponent => {
    class onlyGuestComponent extends Component {
        constructor(props, context) {
            super(props, context);
        }

        isLoggedIn = () => {
            if (this.props.auth.loggedIn) {
                this.props.history.push(
                    "/user/" + this.props.auth.user.id + "/profile"
                );
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

    return withRouter(onlyGuestComponent);
};
