import React, { Component, Fragment } from 'react';
import './controls.css';

class Controls extends Component {
  render() {
    return (
      <Fragment>
        <div className="controls">
          <div className="controls-title">Instructions to Play</div>
          <ul>

            <li>
              <p className="instruction">
                Press
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="36">
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M8 12l6-6v12z" fill="rgba(255,255,255,1)" />
                </svg>
                to Move Left.
              </p>
            </li>

            <li>
              <p className="instruction">
                Press
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="36">
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M16 12l-6 6V6z" fill="rgba(255,255,255,1)" />
                </svg>
                to Move Right.
              </p>
            </li>

            <li>
              <p className="instruction">
                Press 
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="36">
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M12 8l6 6H6z" fill="rgba(255,255,255,1)" />
                </svg>
                to Move Up.
              </p>
            </li>

            <li>
              <p className="instruction">
                Press 
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="36">
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M12 16l-6-6h12z" fill="rgba(255,255,255,1)" />
                </svg>
                to Move Down.
              </p>
            </li>

          </ul>
        </div>
        <p className="note">Note:&nbsp;To win get all the candies <br/> in the minimum possible moves.</p>
      </Fragment>
    )
  }
}

export { Controls };
