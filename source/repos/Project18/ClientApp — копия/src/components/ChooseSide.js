import React from "react";
import { Link } from 'react-router-dom';

const ChooseSide = () => {
    return (
        <div>
            <p>Choose your side:</p>
            <Link to="/one-player/1">
                <button>Red</button>
            </Link>
            <Link to="/one-player/2">
                <button>Black</button>
            </Link>
        </div>
    )
}

export default ChooseSide;