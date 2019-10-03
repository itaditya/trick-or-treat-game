import React, { Component, Fragment } from 'react';
import './controls.css';

class Controls extends Component {
  render() {
    return (
      <Fragment>
      <div className="controls">
        <div className="controls-title">Instructions to Play</div>
        <ol>

          <li>1. Press <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="36">
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="M8 12l6-6v12z" fill="rgba(255,255,255,1)" />
          </svg> to Move Left.</li>

          <li>2. Press <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="36">
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="M16 12l-6 6V6z" fill="rgba(255,255,255,1)" />
          </svg> to Move Right.</li>

          <li>3. Press <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="36">
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="M12 8l6 6H6z" fill="rgba(255,255,255,1)" />
          </svg> to Move Up.</li>

          <li>4. Press <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="36">
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="M12 16l-6-6h12z" fill="rgba(255,255,255,1)" />
          </svg> to Move Down.</li>

        </ol>
      </div>
      <p className="note">Note:&nbsp;To win get all the candies <br/> in the minimum possible moves.</p>
      </Fragment>
    )
  }
}

export { Controls };
