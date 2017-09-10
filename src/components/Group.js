import React from 'react';

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      group: this.props.data,
    }
  }

  render() {
    const group = this.props.data;

    return <div>group.name</div>
  }
}