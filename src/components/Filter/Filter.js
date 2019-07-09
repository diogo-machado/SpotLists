import React, { Component } from 'react';

export default class Filter extends Component {
  render() {
    return (
      <div>
        <img src="" alt="" />
        <input type="text" onChange={e => this.props.onTextChange(e.target.value)} />
      </div>
    );
  }
}
