import React from "react";

const Hero = props => {
    return (
        <div className="jumbotron mt-5">
            <h1 className="display-4">{props.title}</h1>
            <p className="lead">{props.lead}</p>
            <hr className="my-4" />
            <p>{props.body}</p>
            {props.children}
        </div>
    );
};

export default Hero;
