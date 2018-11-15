import React, { Component } from "react";
import onlyLoggedInComponent from "./routes/guards/onlyLoggedIn";

class Profile extends Component {
    constructor(props) {
        super(props);
        console.log("profile", props);
    }

    /**
     * TODO : DISPLAY USER DETALIS
     */
    render() {
        return (
            <div className="container">
                <h2>Welcome {this.props.auth.user.name}</h2>
            </div>
        );
    }
}

export default onlyLoggedInComponent(Profile);
