import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Home extends Component {
  static displayName = Home.name;

    render() {
        return (
            <div>
                <div className="my-text-container">
                    <h1 align='center'>Welcome to the game "Mu-torere"!</h1>
                    <h4 align='center'>You can play a game for 2 players, a game with computer and online game.</h4>
                </div>
                <p align='center'>
                    <Link to="/choose-side">
                        <button className="my-button">Play with computer</button>
                    </Link>
                    <Link to="/two-players">
                        <button className="my-button">2 players</button>
                    </Link>
                    <Link to="/get-path">
                        <button className="my-button">Play online</button>
                    </Link>
                </p>
            </div>
        )
  }
}
