import React from "react";
import { Link } from 'react-router-dom';

const ChooseSide = () => {
    return (
        <div align='center'>
            <div className="my-text-container">
                <h3>Choose your side:</h3>
            </div>
            <Link to="/one-player/1">
                <button className="my-button">Red</button>
            </Link>
            <Link to="/one-player/2">
                <button className="my-button">Black</button>
            </Link>
        </div>
    )
}

export default ChooseSide;