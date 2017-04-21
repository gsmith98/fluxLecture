import 'babel-polyfill';
import React, { Component } from 'react';
import { render } from 'react-dom';
import { Dispatcher } from 'flux';
import { EventEmitter } from 'events';


var AppDispatcher = new Dispatcher();

var busyStore =  Object.assign({}, EventEmitter.prototype, { busy: false });

AppDispatcher.register( function( payload ) {
    switch( payload.actionName ) {
        case 'toggle':
            busyStore.busy = !busyStore.busy;
            busyStore.emit('change')
    }
});


class TimeSlot extends Component {
  constructor(props) {
    super(props);

    this.state = { busy: false }
    this.localUpdate = this.localUpdate.bind(this);
  }

  localUpdate() {
    this.setState({ busy: busyStore.busy })
  }

  componentDidMount() {
    busyStore.on('change', this.localUpdate);
  }

  componentWillUnmount() {
    buysStore.removeListener('change', this.localUpdate);
  }

  clickSlot() {
    AppDispatcher.dispatch({
        actionName: 'toggle'
    });
  }

  render() {
    return (
      <div
        onClick={this.clickSlot}
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
