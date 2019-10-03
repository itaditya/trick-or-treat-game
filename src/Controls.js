import React, { Component } from 'react';
import './controls.css';

class Controls extends Component {
  render() {
    return (
      <React.Fragment>
      <div className="controls">
        <div className="controls-title">Instructions to Play</div>
        <ol>
          <li>1. Press <i class="fas fa-caret-left fa-2x"></i> to Move Left.</li>
          <li>2. Press <i class="fas fa-caret-right fa-2x"></i> to Move Right.</li>
          <li>3. Press <i class="fas fa-caret-up fa-2x"></i> to Move Up.</li>
          <li>4. Press <i class="fas fa-caret-down fa-2x"></i> to Move Down.</li>
        </ol>
      </div>
      <p>Note:&nbsp;To win get all the candies <br/> in the minimum possible moves.</p>
      </React.Fragment>
    )
  }
}

export default Controls;
