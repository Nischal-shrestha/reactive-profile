import React, { Component } from "react";
import Cookies from "universal-cookie";
import Hero from "./utilities/Hero";
import UserLists from "./UserLists";
import onlyLoggedInComponent from "./routes/guards/onlyLoggedIn";
import axios from "axios";
import { user_data_id_url } from "./config";

class Profile extends Component {
    state = {
        profile: {
            user: {
                id: "",
                name: "",
                email: ""
            },
            own: false
        }
    };

    isCancelled = false;

    constructor(props) {
        super(props);
    }

    getUserById = () => {
        const cookies = new Cookies();
        const token = cookies.get("JWT");
        if (token && !this.isCancelled) {
            axios
                .post(user_data_id_url + this.props.match.params.userId, null, {
                    headers: { Authorization: token }
                })
                .then(response => {
                    const own =
                        this.props.match.params.userId ==
                        this.props.auth.user.id;
                    this.setState({
                        profile: {
                            ...this.state.profile,
                            user: response.data.user,
                            own
                        }
                    });
                })
                .catch(error => {
                    if (error.error == "ACCESS_DENIED") {
                        this.props.history.push("/login");
                    } else {
                        this.props.history.push("/404");
                    }
                });
        }
    };

    componentDidMount() {
        this.getUserById();
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.profile.user.id != "") {
            if (
                prevProps.match.params.userId != this.props.match.params.userId
            ) {
                this.getUserById();
            }
        }
    }

    componentWillUnmount() {
        this.isCancelled = true;
    }
    /**
     * TODO : DISPLAY USER DETALIS
     */
    render() {
        return (
            <div className="container">
                <h1 className="text-center mt-5">
                    <b>Profile</b>
                </h1>
                <Hero
                    title={this.state.profile.user.name}
                    lead={
                        this.state.profile.own
                            ? "This is your profile"
                            : "This is not your profile"
                    }
                    body={"Email : " + this.state.profile.user.email}
                />
                <div className="row">
                    <div className="col-md-4">
                        <UserLists />
                    </div>
                </div>
            </div>
        );
    }
}

export default onlyLoggedInComponent(Profile);
