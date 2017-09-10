import React from 'react';

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: this.props.data,
    }
  }

  render() {
    const user = this.props.data;

    return <div>{user.fullname}</div>
  }
}