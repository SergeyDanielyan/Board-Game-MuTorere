import React, { Component, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';


const Feedback = () => {
    let { id } = useParams();

    if (id == 1) {
        return (
            <div align='center'>
                <div className="my-text-container">
                    <h3>1-st player won</h3>
                </div>
                <Link to="/">
                    <button className="my-button">Go to main page</button>
                </Link>
            </div>
        )
    }
    if (id == 2) {
        return (
            <div align='center'>
                <div className="my-text-container">
                    <h3>2-nd player won</h3>
                </div>
                <Link to="/">
                    <button className="my-button">Go to main page</button>
                </Link>
            </div>
        )
    }
    if (id == 3) {
        return (
            <div align='center'>
                <div className="my-text-container">
                    <h3>You won</h3>
                </div>
                <Link to="/">
                    <button className="my-button">Go to main page</button>
                </Link>
            </div>
        )
    }
    if (id == 4) {
        return (
            <div align='center'>
                <div className="my-text-container">
                    <h3>You lost</h3>
                </div>
                <Link to="/">
                    <button className="my-button">Go to main page</button>
                </Link>
            </div>
        )
    }
    return (
        <p>Ошибка</p>
    )
}

export default Feedback;