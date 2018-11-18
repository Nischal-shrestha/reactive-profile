import React, { Component } from "react";
import axios from "axios";
import { all_user_url } from "./config";
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";

class UserLists extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        userList: []
    };

    componentDidMount() {
        const cookies = new Cookies();
        axios
            .post(all_user_url, null, {
                headers: { Authorization: cookies.get("JWT") }
            })
            .then(response => {
                let users = response.data.users;
                let userList = [];
                users.forEach(user => {
                    userList.push(user);
                });
                this.setState({
                    userList
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    listUsers = () => {
        const userList = this.state.userList;
        return (
            <div className="list-group">
                {userList.map(user => (
                    <Link
                        to={"/user/" + user.id + "/profile"}
                        className="list-group-item list-group-item-action"
                        key={user.id}
                    >
                        {user.name}
                    </Link>
                ))}
            </div>
        );
    };

    render() {
        return (
            <div>
                <h1>All Users</h1>
                {this.listUsers()}
            </div>
        );
    }
}

export default UserLists;
