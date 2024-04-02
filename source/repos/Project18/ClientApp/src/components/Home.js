import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Home extends Component {
  static displayName = Home.name;

    render() {
      /*
      return (
          <div>
              <h1 align='center'>Welcome to the game "Mu-torere"!</h1>
              <p>You can play a game for 2 players and a game with computer</p>
              <Link to="/choose-side">
                  <button>Play with bot</button>
              </Link>
              <Link to="/two-players">
                  <button>2 players</button>
              </Link>
              <Link to="/get-path">
                  <button>Play online</button>
              </Link>
          </div>
      )
      */
        return (
            <div>
                <h1 align='center'>Welcome to the game "Mu-torere"!</h1>
                <p>You can play a game for 2 players, a game with computer and online game.</p>
                <Link to="/choose-side">
                    <button>Play with computer</button>
                </Link>
                <Link to="/two-players">
                    <button>2 players</button>
                </Link>
                <Link to="/get-path">
                    <button>Play online</button>
                </Link>
            </div>
        )
  }
}
