import React, { Component } from "react";
import Cookies from "universal-cookie";
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
        console.log("profile", props);
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
                    this.setState({
                        profile: {
                            user: response.data.user
                        },
                        own:
                            response.data.user.id === this.props.auth.user.id
                                ? true
                                : false
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
        if (prevProps.match.params.userId !== this.props.match.params.userId) {
            this.getUserById();
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.match.params.userId !== prevState.profile.user.id) {
            return {
                ...prevState,
                profile: {
                    user: {
                        ...prevState.profile.user,
                        id: nextProps.match.params.userId
                    }
                }
            };
        } else {
            return null;
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
                <h2>Welcome {this.state.profile.user.name}</h2>
            </div>
        );
    }
}

export default onlyLoggedInComponent(Profile);
