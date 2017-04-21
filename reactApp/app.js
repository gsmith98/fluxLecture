import 'babel-polyfill';
import React, { Component } from 'react';
import { render } from 'react-dom';
import { Dispatcher } from 'flux';
import { EventEmitter } from 'events';
import Modal from 'react-modal';


const times = ['9', '10', '11', '12', '1', '2', '3', '4'];


var AppDispatcher = new Dispatcher();

var SlotsStore =  Object.assign({}, EventEmitter.prototype, {
  busy: Array(times.length).fill(false),
  name: Array(times.length).fill(null),
  number: Array(times.length).fill(null)
});

AppDispatcher.register( function( payload ) {
    switch( payload.actionName ) {
        case 'reserve':
            SlotsStore.busy[payload.slotnum] = true;
            SlotsStore.name[payload.slotnum] = payload.name;
            SlotsStore.number[payload.slotnum] = payload.number;
            SlotsStore.emit('change')
    }
});


class TimeSlot extends Component {
  constructor(props) {
    super(props);

    this.state = { busy: false, name: null, number: null, modalOpen: false }
    this.localUpdate = this.localUpdate.bind(this);
  }

  localUpdate() {
    this.setState({
      busy: SlotsStore.busy[this.props.slotnum],
      name: SlotsStore.name[this.props.slotnum],
      number: SlotsStore.number[this.props.slotnum]
    })
  }

  componentDidMount() {
    SlotsStore.on('change', this.localUpdate);
  }

  componentWillUnmount() {
    buysStore.removeListener('change', this.localUpdate);
  }

  submitModal() {
    var name = this.nameField.value.trim();
    var number = this.numField.value.trim();

    AppDispatcher.dispatch({
        actionName: 'reserve',
        slotnum: this.props.slotnum,
        name,
        number
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
          <input type="text" ref={(node) => { this.nameField = node; }} placeholder="Name" defaultValue={this.state.name}/>
          <input type="text" ref={(node) => { this.numField = node; }} placeholder="Phone #" defaultValue={this.state.number}/>
          <button onClick={() => this.submitModal()}>Save</button>
          <button onClick={() => this.setState({modalOpen: false})}>Cancel</button>
        </Modal>
        <div
          onClick={() => this.clickSlot()}
          style={{ backgroundColor: (this.state.busy ? 'red' : 'green')}}
        >
          {this.state.busy ? `${this.state.name}  --  ${this.state.number}` : 'Open'}
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
