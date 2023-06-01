import React, { Component } from 'react'

export default class Settings extends Component {
  componentDidMount() {
    this.props.parentCallback({ "header": "Settings", "sidebar": "setting" });
  }
  render() {
    return (
      <div>Settings</div>
    )
  }
}
