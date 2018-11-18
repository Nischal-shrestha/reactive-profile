import React from "react";
import onlyGuestComponent from "./routes/guards/onlyGuest";

const Welcome = () => {
    return (
        <div className="container">
            <h2>Welcome to Homepage</h2>
        </div>
    );
};

export default onlyGuestComponent(Welcome);
