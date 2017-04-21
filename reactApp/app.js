import 'babel-polyfill';
import React, { Component } from 'react';
import { render } from 'react-dom';
import { Dispatcher } from 'flux';
import { EventEmitter } from 'events';
import Modal from 'react-modal';


const times = ['9', '10', '11', '12', '1', '2', '3', '4'];


var AppDispatcher = new Dispatcher();

var busyStore =  Object.assign({}, EventEmitter.prototype, {
  busy: Array(times.length).fill(false)
});

AppDispatcher.register( function( payload ) {
    switch( payload.actionName ) {
        case 'toggle':
            busyStore.busy[payload.slotnum] = !busyStore.busy[payload.slotnum];
            busyStore.emit('change')
    }
});


class TimeSlot extends Component {
  constructor(props) {
    super(props);

    this.state = { busy: false, modalOpen: false }
    this.localUpdate = this.localUpdate.bind(this);
  }

  localUpdate() {
    this.setState({ busy: busyStore.busy[this.props.slotnum] })
  }

  componentDidMount() {
    busyStore.on('change', this.localUpdate);
  }

  componentWillUnmount() {
    buysStore.removeListener('change', this.localUpdate);
  }

  submitModal() {
    AppDispatcher.dispatch({
        actionName: 'toggle',
        slotnum: this.props.slotnum
    });
    this.setState({ modalOpen: false });
  }

  clickSlot() {
    this.setState({ modalOpen: true });
  }

  render() {
    return (
      <div>
        <Modal
          isOpen={this.state.modalOpen}
          onRequestClose={() => this.setState({modalOpen: false})}
          contentLabel="Modal"
        >
          <button onClick={() => this.submitModal()}>Save</button>
          <button onClick={() => this.setState({modalOpen: false})}>Cancel</button>
        </Modal>
        <div
          onClick={() => this.clickSlot()}
          style={{ backgroundColor: (this.state.busy ? 'red' : 'green')}}
        >
          YO
        </div>
      </div>
    );
  }
}


class Day extends Component {
  render() {
    return (
      <div>
        {times.map((time, index) => (
          <div key={time}>
            <div>{time}</div>
            <TimeSlot slotnum={index}/>
          </div>
        ))}
      </div>
    );
  }
}

render(
  <Day />,
  document.getElementById('root')
);
