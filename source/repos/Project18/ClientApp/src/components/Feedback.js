import React, { Component, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';


const Feedback = () => {
    let { id } = useParams();

    if (id == 1) {
        return (
            <div>
                <p>1-st player won</p>
                <Link to="/">
                    <button>Go to main page</button>
                </Link>
            </div>
        )
    }
    if (id == 2) {
        return (
            <div>
                <p>2-nd player won</p>
                <Link to="/">
                    <button>Go to main page</button>
                </Link>
            </div>
        )
    }
    if (id == 3) {
        return (
            <div>
                <p>You won</p>
                <Link to="/">
                    <button>Go to main page</button>
                </Link>
            </div>
        )
    }
    if (id == 4) {
        return (
            <div>
                <p>You lost</p>
                <Link to="/">
                    <button>Go to main page</button>
                </Link>
            </div>
        )
    }
    return (
        <p>Ошибка</p>
    )
}

export default Feedback;