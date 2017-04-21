import 'babel-polyfill';
import React, { Component } from 'react';
import { render } from 'react-dom';


class TimeSlot extends Component {
  constructor(props) {
    super(props);

    this.state = { busy: false }
  }

  render() {
    return (
      <div
        onClick={() => this.setState({ busy: !this.state.busy })}
        style={{ backgroundColor: (this.state.busy ? 'red' : 'green')}}
      >
        YO
      </div>
    );
  }
}


render(
  <TimeSlot />,
  document.getElementById('root')
);
