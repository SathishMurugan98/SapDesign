import React, { Component } from 'react'

export default class Help extends Component {
  componentDidMount() {
    this.props.parentCallback({ "header": "Help", "sidebar": "help" });
  }
  render() {
    return (
      <div>Help</div>
    )
  }
}
