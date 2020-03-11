import React from "react";
import { Link } from "react-router-dom"

function Navigation(){
    return (
        <div className="navDiv">
            <Link to="/">Home</Link>
        </div>
    );
}

export default Navigation;